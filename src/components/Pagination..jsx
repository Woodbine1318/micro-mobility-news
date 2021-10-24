import { graphql, Link, useStaticQuery } from 'gatsby';
import { navigate } from 'gatsby-link';
import React from 'react';

const Pagination = ({ currentPageIndex }) => {
  const data = useStaticQuery(graphql`
    query PaginationQuery {
      allContentfulBlogPost {
        totalCount
      }
    }
  `);

  const totalPosts = data.allContentfulBlogPost.totalCount - Number(process.env.GATSBY_POSTS_ON_INDEX || 5);
  const totalPages = Math.ceil(totalPosts / Number(process.env.GATSBY_POSTS_PER_PAGE || 10));

  const prevPage = currentPageIndex < totalPages + 1 ? `/${currentPageIndex + 1}` : null;
  const nextPage = currentPageIndex === 1 ? null : currentPageIndex === 2 ? '/' : `/${currentPageIndex - 1}`;

  const onChange = ({ target }) => {
    const { value } = target;

    navigate(Number(value) === 1 ? '/' : `/${value}`);
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
        <option value="1">1</option>
        {Array.from({ length: totalPages })
          .fill(true)
          .map((_, i) => (
            <option value={i + 2}>{i + 2}</option>
          ))}
      </select>

      <Link
        to={prevPage}
        className={`font-bold px-8 py-2 w-40 ${prevPage ? '' : 'pointer-events-none opacity-50 cursor-not-allowed'}`}
      >
        Previous
      </Link>
    </nav>
  );
};

export default Pagination;
