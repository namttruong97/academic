import { FC, HTMLAttributes } from 'react';

import Head from 'next/head';
import { classMapping } from 'utils/helper';

import { BlockLoading } from 'components/BlockLoading';
import Header from 'components/Header/Header';

export interface ILayoutProps extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

export const Layout: FC<ILayoutProps> = ({ children, className, title, isLoading }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <title>{title}</title>
      </Head>
      <Header />
      <div className={classMapping('flex flex-col overflow-hidden w-full relative', className)}>
        <BlockLoading isOpen={isLoading} />
        <div>{children}</div>
      </div>
    </>
  );
};
