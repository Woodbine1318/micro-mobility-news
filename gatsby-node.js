exports.createPages = async ({ graphql, actions }) => {
  const data = await graphql(`
    query createPagesQuery {
      allContentfulBlogPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  const posts = data?.allContentfulBlogPost?.edges;
  console.log(posts);
};
