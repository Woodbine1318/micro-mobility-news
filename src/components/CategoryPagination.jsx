import { Link } from 'gatsby';
import React from 'react';
import { navigate } from 'gatsby';

const CategoryPagination = ({ categorySlug, currentPageIndex, totalPages }) => {
  const nextPage = currentPageIndex + 1 < totalPages ? `/t/${categorySlug}/${currentPageIndex + 1}` : null;
  const previousPage = currentPageIndex === 0 ? null : `/t/${categorySlug}/${currentPageIndex - 1}`;

  const onChange = ({ target }) => {
    const { value } = target;

    navigate(Number(value) === 1 ? `/t/${categorySlug}` : `/t/${categorySlug}/${value}`);
  };

  return (
    <nav className="flex flex-nowrap border-4 border-black rounded-xl w-max text-center mx-auto">
      <Link
        to={nextPage}
        className={`font-bold px-8 py-2 w-40  ${nextPage ? '' : 'pointer-events-none opacity-50 cursor-not-allowed'}`}
      >
        Next
      </Link>

      <select
        value={currentPageIndex}
        onChange={onChange}
        className="w-44 font-bold bg-transparent px-8 text-center border-l-4 border-r-4 border-black"
      >
        {Array.from({ length: totalPages })
          .fill(true)
          .map((_, i) => (
            <option value={i + 1}>{i + 1}</option>
          ))}
      </select>

      <Link
        to={previousPage}
        className={`font-bold px-8 py-2 w-40 ${
          previousPage ? '' : 'pointer-events-none opacity-50 cursor-not-allowed'
        }`}
      >
        Previous
      </Link>
    </nav>
  );
};

export default CategoryPagination;
