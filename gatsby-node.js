exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query createPagesQuery {
      allContentfulBlogPost(sort: { fields: createdAt, order: ASC }) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  const postsOnIndex = 5;
  const postsPerPage = 10;
  const posts = data?.allContentfulBlogPost?.edges;
  const totalPosts = posts.length - postsOnIndex;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  posts.forEach(({ node: post }, index) => {
    const next = posts[index + 1];
    const previous = posts[index - 1];

    actions.createPage({
      path: `/news/${post.slug}`,
      component: require.resolve('./src/templates/BlogPost.jsx'),
      context: {
        slug: post.slug,
        previous: previous?.slug,
        next: next?.slug,
      },
    });
  });
};
