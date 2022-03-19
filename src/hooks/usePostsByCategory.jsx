import { graphql, useStaticQuery } from 'gatsby';

export const usePostsByCategory = (category) => {
  const data = useStaticQuery(graphql`
    query AllPostsByCategory {
      allContentfulCategory {
        edges {
          node {
            slug
            blog_post {
              id
              slug
              title
            }
          }
        }
      }
    }
  `);

  return data.allContentfulCategory.edges.find(({ node: c }) => c.slug === category)?.node.blog_post ?? [];
};
