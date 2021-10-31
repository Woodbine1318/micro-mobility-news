import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Stack from '../components/Stack';
import HeaderAlternate from '../components/HeaderAlternate';

const SitePage = ({ data: { contentfulSitePage: page } }) => {
  return (
    <Layout>
      <SEO />

      <HeaderAlternate />

      <section className="container relative px-8 md:px-24">
        <Stack className="w-max mx-auto">
          <h1 className="relative w-max font-extrabold text-xl text-center px-12 py-6 mb-24 border-8 border-black rounded-2xl bg-white mx-auto md:mb-32">
            {page.title}
          </h1>
        </Stack>

        <div
          dangerouslySetInnerHTML={{ __html: page.content?.childMarkdownRemark.html }}
          className="rich-text max-w-screen-md mx-auto"
        />
      </section>
    </Layout>
  );
};

export const query = graphql`
  query SitePage($slug: String!) {
    contentfulSitePage(slug: { eq: $slug }) {
      slug
      title
      content {
        childMarkdownRemark {
          html
          excerpt(format: PLAIN, pruneLength: 260, truncate: true)
        }
      }
    }
  }
`;

export default SitePage;
