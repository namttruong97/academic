import backgroundImage from 'assets/sanford.png';
import BookSearch from 'layouts/BookSearch';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Layout } from 'components/Layout';

export default function Homepage() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title="Academic Online" isLoading={isLoading}>
      <div className="h-10 bg-[#3d5980]"></div>
      <div className="lg:grid lg:grid-cols-5">
        <div className="flex flex-col justify-between mb-8 lg:mb-0">
          <div className="flex-1 bg-[#D8D8D8]">
            <Image className="col-span-1 w-full" src={backgroundImage} alt="Sidebar image" />
            <div className="px-8 text-base">
              <p>
                Stanford University (officially Leland Stanford Junior University) is a private
                research university in Stanford, California. The campus occupies 8,180 acres (3,310
                hectares), among the largest in the United States, and enrolls over 17,000 students.
              </p>
              <br />
              <p>
                Stanford has been considered to be one of the most prestigious universities in the
                world.Stanford University was founded in 1885 by Leland Stanford—a railroad magnate
                who served as the eighth governor of and then-incumbent senator from California—and
                his wife, Jane, in memory of their only child, Leland Stanford Jr., who had died of
                typhoid fever aged 15 the previous year.
              </p>
              <br />
              <p>
                The university admitted its first students on October 1, 1891, as a coeducational
                and non-denominational institution. Stanford University struggled financially after
                Leland's death in 1893 and again after much of the campus was damaged by the 1906
                San Francisco earthquake
              </p>
            </div>
          </div>

          {/* <span className="hidden mt-8 text-base italic text-secondary animate-pulse lg:block">
            Designed by Nam Truong
          </span> */}
        </div>
        <BookSearch className="px-4 min-w-[350px] md:px-24 md:min-w-[650px] lg:col-span-4 lg:p-4 lg:block" />
      </div>
    </Layout>
  );
}
