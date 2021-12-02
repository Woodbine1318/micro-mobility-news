import { graphql, useStaticQuery } from 'gatsby';

export const useFooter = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      contentfulNavigationBar(slug: { eq: "footer" }) {
        slug
        links {
          externalUrl
          text
          page {
            slug
            title
          }
        }
      }
    }
  `);

  return { links: data.contentfulNavigationBar.links };
};
