import { FC, HTMLAttributes, useCallback, useState } from 'react';

import { Card, Select, Slider, Spin } from 'antd';
import { debounce } from 'lodash';
import { useQuery } from 'react-query';
import { searchKeyWord } from 'services/book';
import { classMapping } from 'utils/helper';
import { KeywordQueryParams } from 'utils/types';

import { KeywordResponse } from 'model/book.model';

import { Author } from './components/Author';

export const DEFAULT_PAGESIZE = 20;
export const DEFAULT_DEPARTMENT_ID = '0fd09a4de59dc4b88f5254200adc330779b284af67a4306f4cdc462a';

type IBookSearchProps = HTMLAttributes<HTMLDivElement>;

const getRootConcept = (labels: string[], arr: KeywordResponse[] = []) => {
  return arr.filter((item) => labels.includes(item.value)).map((item) => item.id);
};

const BookSearch: FC<IBookSearchProps> = ({ className }) => {
  const [selectedKey1, setSelectedKey1] = useState<string[]>([]);
  const [selectedKey2, setSelectedKey2] = useState<string[]>([]);
  const [selectedKey3, setSelectedKey3] = useState<string[]>([]);

  const [paramQueryModel, setParamQueryModel] = useState<KeywordQueryParams>({
    departmentId: DEFAULT_DEPARTMENT_ID,
    fromYear: 1970,
    toYear: 2023,
    granularityLevel: 1,
  });

  const { data: listKeyWork1, isLoading: isLoadingKey1 } = useQuery<KeywordResponse[] | any, Error>(
    ['listKeyWork1', paramQueryModel],
    () => searchKeyWord({ ...paramQueryModel }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.keywords.map((item: KeywordResponse) => ({
          ...item,
          value: item.value,
          label: item.value,
        }));
      },
    }
  );

  const { data: listKeyWork2, isLoading: isLoadingKey2 } = useQuery<KeywordResponse[] | any, Error>(
    ['listKeyWork2', selectedKey1],
    () => {
      return searchKeyWord({
        ...paramQueryModel,
        granularityLevel: 2,
        rootConcept: selectedKey1,
      });
    },
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.keywords.map((item: KeywordResponse) => ({
          ...item,
          value: item.value,
          label: item.value,
        }));
      },
    }
  );

  const { data: listKeyWork3, isLoading: isLoadingKey3 } = useQuery<KeywordResponse[] | any, Error>(
    ['listKeyWork3', selectedKey2],
    () => {
      return searchKeyWord({
        ...paramQueryModel,
        granularityLevel: 3,
        rootConcept: selectedKey2,
      });
    },
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.keywords.map((item: KeywordResponse) => ({
          ...item,
          value: item.value,
          label: item.value,
        }));
      },
    }
  );

  const request = debounce((val: number[]) => {
    setParamQueryModel({ ...paramQueryModel, fromYear: val[0], toYear: val[1] });
  }, 200);
  const debouceRequest = useCallback((value) => request(value), []);

  return (
    <div className={classMapping('com__bookSearch ', className)}>
      <Spin className="h-full" spinning={isLoadingKey1}>
        <Card className="p-2 px-4 rounded  border mb-4">
          <div className="flex items-center mb-4">
            <span className="mr-2 w-20 text-base">Majors:</span>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select major"
              onChange={(e: any[]) => {
                const result = getRootConcept(e, listKeyWork1);
                setSelectedKey1(result);
                setSelectedKey2([]);
              }}
              options={listKeyWork1}
            />
          </div>

          <div className="flex items-center mb-4">
            <span className="mr-2 w-20 text-base">Subjects:</span>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select subjects"
              disabled={!selectedKey1?.length}
              loading={isLoadingKey2}
              onChange={(e: any[]) => {
                const result = getRootConcept(e, listKeyWork2);
                setSelectedKey2(result);
                setSelectedKey3([]);
              }}
              value={listKeyWork2?.filter((item: any) => selectedKey2.includes(item.id))}
              options={listKeyWork2}
            />
          </div>

          <div className="flex items-center mb-8">
            <span className="mr-2 w-20 text-base">Topics:</span>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select topics"
              disabled={!selectedKey2?.length}
              loading={isLoadingKey3}
              onChange={(e: any[]) => {
                const result = getRootConcept(e, listKeyWork3);
                setSelectedKey3(result);
              }}
              value={listKeyWork3?.filter((item: any) => selectedKey3.includes(item.id))}
              options={listKeyWork3}
            />
          </div>
          <div className="px-3 mb-16">
            <Slider
              range={{ draggableTrack: true }}
              trackStyle={
                {
                  backgroundColor: '#3d5980',
                } as any
              }
              handleStyle={
                {
                  backgroundColor: '#8C1515',
                  border: '#8C1515',
                } as any
              }
              marks={{
                1970: {
                  style: {
                    color: '#3d5980',
                  },
                  label: <strong>1970</strong>,
                },
                1980: {
                  style: {
                    color: '#3d5980',
                  },
                  label: <strong>1980</strong>,
                },
                1990: {
                  style: {
                    color: '#3d5980',
                  },
                  label: <strong>1990</strong>,
                },
                2000: {
                  style: {
                    color: '#3d5980',
                  },
                  label: <strong>2000</strong>,
                },
                2010: {
                  style: {
                    color: '#3d5980',
                  },
                  label: <strong>2010</strong>,
                },
                2023: {
                  style: {
                    color: '#3d5980',
                  },
                  label: <strong>2023</strong>,
                },
              }}
              min={1970}
              max={2023}
              step={1}
              defaultValue={[1970, 2023]}
              onChange={debouceRequest}
            />
          </div>
          <Author fromYear={paramQueryModel.fromYear} toYear={paramQueryModel.toYear} />
        </Card>
      </Spin>
    </div>
  );
};

export default BookSearch;
