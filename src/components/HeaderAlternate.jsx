import { Link } from 'gatsby';
import React from 'react';
import Badge from '../assets/images/Badge.svg';
import CategoryNav from './CategoryNav';

const HeaderAlternate = () => {
  return (
    <header className="container flex flex-row flex-nowrap justify-between items-center py-8 px-7 mb-24">
      <Link to="/">
        <Badge className="w-36" />
      </Link>

      <CategoryNav />
    </header>
  );
};

export default HeaderAlternate;
