import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import BlogPostCard from '../components/BlogPostCard';
import Pagination from '../components/Pagination.';
import HeaderAlternate from '../components/HeaderAlternate';

const PaginatedBlog = ({ data: { allContentfulBlogPost: posts }, pageContext: { pageIndex } }) => {
  return (
    <Layout>
      <SEO />

      <HeaderAlternate />

      <section className="container relative grid grid-cols-1 gap-12 px-8 mb-12 md:grid-cols-2 md:items-start md:mb-24 md:px-24">
        {posts.edges.map(({ node: post }, index) => (
          <BlogPostCard post={post} key={post.id} isEven={index % 2 === 0} extended />
        ))}
      </section>

      <Pagination currentPageIndex={pageIndex} />
    </Layout>
  );
};

export const query = graphql`
  query PaginatedBlogQuery($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(skip: $skip, limit: $limit, sort: { fields: createdAt, order: DESC }) {
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

export default PaginatedBlog;
