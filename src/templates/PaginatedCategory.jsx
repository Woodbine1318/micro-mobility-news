import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Stack from '../components/Stack';
import BlogPostCard from '../components/BlogPostCard';
import CategoryPagination from '../components/CategoryPagination';
import HeaderAlternate from '../components/HeaderAlternate';

const PaginatedCategoryPage = ({
  location,
  pageContext: { pageIndex, totalPages },
  data: { contentfulCategory: category, allContentfulBlogPost: posts },
}) => {
  return (
    <Layout>
      <SEO title={category.name} canonicalPath={location.pathname} />

      <HeaderAlternate />

      <section className="container relative px-8 md:px-24">
        <Stack className="w-max mx-auto">
          <h1 className="relative w-max font-extrabold text-xl text-center px-12 py-6 mb-24 border-8 border-black rounded-2xl bg-white mx-auto md:mb-32">
            {category.name}
          </h1>
        </Stack>

        <div className="container relative grid grid-cols-1 gap-12 px-8 mb-12 md:grid-cols-2 md:items-start md:mb-24 md:px-24">
          {posts.edges.map(({ node: post }, index) => (
            <BlogPostCard post={post} key={post.id} isEven={index % 2 === 0} extended />
          ))}
        </div>
      </section>

      <CategoryPagination currentPageIndex={pageIndex} totalPages={totalPages} categorySlug={category.slug} />
    </Layout>
  );
};

export const query = graphql`
  query PaginatedCategoryQuery($postsInPage: [String!]!, $category: String!) {
    contentfulCategory(slug: { eq: $category }) {
      id
      slug
      name
    }

    allContentfulBlogPost(filter: { id: { in: $postsInPage } }, sort: { fields: createdAt, order: DESC }) {
      edges {
        node {
          id
          slug
          title
          categories {
            id
            slug
            name
          }
          cover {
            gatsbyImageData(quality: 100, layout: CONSTRAINED, width: 600, placeholder: DOMINANT_COLOR)
            title
          }
          content {
            childMarkdownRemark {
              excerpt(format: PLAIN, pruneLength: 260, truncate: true)
            }
          }
        }
      }
    }
  }
`;

export default PaginatedCategoryPage;
