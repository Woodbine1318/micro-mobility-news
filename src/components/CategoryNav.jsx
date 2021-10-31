import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';

const CategoryNav = ({ className = '' }) => {
  const { allContentfulCategory } = useStaticQuery(graphql`
    query CategoryNavQuery {
      allContentfulCategory {
        edges {
          node {
            id
            slug
            name
            blog_post {
              id
            }
          }
        }
      }
    }
  `);

  const categories = allContentfulCategory?.edges;

  return (
    <nav className={`container px-12 ${className}`}>
      <ul className="flex flex-row flex-wrap items-center justify-center md:grid-cols-6 lg:grid-cols-8">
        <li className="flex justify-center items-center min-w-max px-8 font-display text-lg">
          <Link
            to="/"
            className="hover:border-b-4 transition-all duration-300"
            activeClassName="border-b-4 border-black"
          >
            Recent
          </Link>
        </li>

        {categories.map(({ node: category }) =>
          category.blog_post?.length ? (
            <li
              className="flex justify-center items-center min-w-max px-8 font-display text-lg hover:border-b-4 transition-all duration-300"
              key={category.id}
            >
              <Link to={`/t/${category.slug}`}>{category.name}</Link>
            </li>
          ) : null,
        )}
      </ul>
    </nav>
  );
};

export default CategoryNav;
