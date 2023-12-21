import { CommentOutlined } from '@ant-design/icons';

import { FC, useEffect, useState } from 'react';

import { Avatar, Button, Checkbox, Empty, Skeleton, Table, Tag, Tooltip, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { useQuery } from 'react-query';
import { searchAuthor } from 'services/book';
import { AuthorQueryParams } from 'utils/types';

import { AuthorResponse, KeywordResponse } from 'model/book.model';

import { DEFAULT_DEPARTMENT_ID } from '..';

interface IAuthorProps {
  fromYear: number;
  toYear: number;
}
export const Author: FC<IAuthorProps> = ({ fromYear, toYear }) => {
  const [paramAuthorModel, setAuthorModel] = useState<AuthorQueryParams>({
    departmentId: DEFAULT_DEPARTMENT_ID,
    fromYear,
    toYear,
    page: 0,
    rowsPerPage: 10,
    verified: 0,
  });

  useEffect(() => {
    setAuthorModel({
      ...paramAuthorModel,
      fromYear,
      toYear,
    });
  }, [fromYear, paramAuthorModel, toYear]);

  const { data: listAuthor, isLoading: isLoadingAuthor } = useQuery<AuthorResponse[] | any, Error>(
    ['listAuthor', paramAuthorModel],
    () => {
      return searchAuthor({ ...paramAuthorModel });
    },
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.authors.map((item: KeywordResponse) => ({
          ...item,
          value: item.value,
          label: item.value,
        }));
      },
    }
  );

  const columns: ColumnsType<AuthorResponse> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 280,
      render: (_, item) => {
        return (
          <div>
            <Avatar size={45} src={item.photo} />
            <span className="ml-3 text-base">{item.name}</span>
          </div>
        );
      },
    },
    {
      title: 'Field Of Research',
      dataIndex: 'keywords',
      key: 'keywords',
      render: (_, item) => {
        return (
          <div>
            {item?.keywords.map((item, index) => (
              <Tag color="default" key={index} style={{ marginBottom: 4 }}>
                {item.value}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Citation Count',
      dataIndex: 'citation_count',
      key: 'citation_count',
      width: 130,
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      align: 'center',
      render: (_, item) => <Checkbox checked={item?.verified} />,
    },
    {
      title: 'Feedback',
      align: 'center',
      render: () => (
        <Tooltip placement="top" title="Feedback this data">
          <Button
            icon={
              <CommentOutlined
                style={{ color: '#8C1515', fontSize: 18 }}
                onClick={() => message.success('Feedback this data is successfully')}
              />
            }
          />
        </Tooltip>
      ),
    },
  ];
  const handleTableChange = async (pagination: TablePaginationConfig) => {
    setAuthorModel({
      ...paramAuthorModel,
      page: pagination.current ? pagination.current - 1 : 1,
      rowsPerPage: pagination.pageSize || 20,
    });
  };

  return (
    <Table
      dataSource={listAuthor}
      columns={columns}
      rowKey="id"
      onChange={handleTableChange}
      scroll={{ x: 'max-content' }}
      pagination={{
        showSizeChanger: true,
        current: paramAuthorModel.page + 1,
        pageSize: paramAuthorModel.rowsPerPage,
        total: 200,
        responsive: true,
      }}
      locale={{
        emptyText: isLoadingAuthor ? (
          <Skeleton
            title={false}
            active={true}
            paragraph={{
              width: '100%',
              rows: 10,
            }}
          />
        ) : (
          <Empty />
        ),
      }}
    />
  );
};
