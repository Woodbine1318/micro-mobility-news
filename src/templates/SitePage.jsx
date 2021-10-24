import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Badge from '../assets/images/Badge.svg';
import Stack from '../components/Stack';

const SitePage = ({ data: { contentfulSitePage: page } }) => {
  return (
    <Layout>
      <SEO />

      <header className="container flex flex-row flex-nowrap justify-between items-center py-8 px-7 mb-24">
        <Link to="/">
          <Badge className="w-36" />
        </Link>
      </header>

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
