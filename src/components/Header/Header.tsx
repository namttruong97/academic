import backgroundImage from 'assets/header.png';

import { FC, HTMLAttributes } from 'react';

import Image from 'next/image';

type THeaderProps = HTMLAttributes<HTMLDivElement>;

export const Header: FC<THeaderProps> = () => {
  return (
    <div className="relative max-h-[130px] w-full">
      <Image alt="header" className="object-cover" layout="cover" src={backgroundImage} />
    </div>
  );
};

export default Header;
