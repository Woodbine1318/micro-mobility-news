exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query createPagesQuery {
      allContentfulBlogPost(sort: { fields: createdAt, order: DESC }) {
        edges {
          node {
            id
            slug
          }
        }
      }

      allContentfulSitePage {
        edges {
          node {
            id
            slug
          }
        }
      }

      allContentfulCategory {
        edges {
          node {
            id
            slug
            name
            blog_post {
              id
              slug
            }
          }
        }
      }
    }
  `);

  await createPostPages(data?.allContentfulBlogPost?.edges, actions.createPage);
  await createSitePages(data?.allContentfulSitePage.edges, actions.createPage);
  await createCategoryPages(data?.allContentfulCategory.edges, actions.createPage);
};

const createPostPages = async (posts, createPage) => {
  const postsOnIndex = Number(process.env.GATSBY_POSTS_ON_INDEX || 5);
  const postsPerPage = Number(process.env.GATSBY_POSTS_PER_PAGE || 10);
  const totalPosts = posts.length - postsOnIndex;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  posts.forEach(({ node: post }, index) => {
    const next = posts[index + 1];
    const previous = posts[index - 1];

    createPage({
      path: `/news/${post.slug}`,
      component: require.resolve('./src/templates/BlogPost.jsx'),
      context: {
        slug: post.slug,
        previous: previous?.slug,
        next: next?.slug,
      },
    });
  });

  Array.from({ length: totalPages }).forEach((_, index) => {
    const pageIndex = index + 2;

    createPage({
      path: `/${pageIndex}`,
      component: require.resolve('./src/templates/PaginatedBlog.jsx'),
      context: {
        skip: postsPerPage * index + postsOnIndex,
        limit: postsPerPage,
        pageIndex,
      },
    });
  });
};

const createSitePages = async (pages, createPage) => {
  pages.forEach(({ node: page }) => {
    createPage({
      path: `/${page.slug}`,
      component: require.resolve('./src/templates/SitePage.jsx'),
      context: {
        slug: page.slug,
      },
    });
  });
};

const createCategoryPages = async (categories, createPage) => {
  categories.forEach(({ node: category }) => {
    const uniquePosts = category.blog_post
      ? [...category.blog_post]
      : []
          .reverse()
          .filter((p, i, posts) => posts.slice(i + 1).find(({ id }) => id === p.id) === undefined)
          .reverse();

    const postsPerPage = Number(process.env.GATSBY_POSTS_PER_PAGE || 10);
    const totalPosts = uniquePosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    Array.from({ length: totalPages }).forEach((_, index) => {
      const skip = postsPerPage * index;
      const postsInPage = uniquePosts.slice(skip, skip + postsPerPage).map((post) => post.id);

      createPage({
        path: index === 0 ? `/t/${category.slug}` : `/t/${category.slug}/${index + 1}`,
        component: require.resolve('./src/templates/PaginatedCategory.jsx'),
        context: {
          category: category.slug,
          postsInPage,
          totalPages,
          pageIndex: index,
        },
      });
    });
  });
};
