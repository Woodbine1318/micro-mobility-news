import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query useSiteMetadata {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  return { link: data.site.siteMetadata.siteUrl };
};
