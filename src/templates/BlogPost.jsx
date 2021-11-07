import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { graphql, Link } from 'gatsby';
import HeaderAlternate from '../components/HeaderAlternate';
import ImagePost from '../components/ImagePost';

const BlogPostTemplate = ({ location, data: { contentfulBlogPost: post, next, previous } }) => {
  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.content?.childMarkdownRemark.excerpt}
        og={{
          type: 'article',
          published_time: post.createdAt,
          tags: [post.categories.map((c) => c.name)],
        }}
        canonicalPath={location.pathname}
      />

      <HeaderAlternate />

      <ImagePost post={post} />

      <section className="container grid grid-cols-1 px-8 mb-24 md:px-24 md:gap-x-24 md:grid-cols-4">
        <div className="flex flex-row flex-wrap items-start h-min mb-12 gap-2">
          <h2 className={`text-lg mb-6`}>{post.createdAt}</h2>
          {post.categories.map((category) => (
            <span
              className="inline w-72 text-center border-4 border-black rounded-xl font-black uppercase py-3 px-2 mr-2 md:w-full"
              key={category.slug}
            >
              {category.name}
            </span>
          ))}
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: post.content.childMarkdownRemark.html }}
          className="rich-text md:col-span-3"
        />
      </section>

      <nav className="container flex flex-col items-between py-16 px-8 md:flex-row md:justify-between md:px-24 md:items-start">
        <div className="max-w-lg mb-8 md:mb-0">
          {next && (
            <>
              <p className="font-display text-primary">Next up</p>
              <h3 class="text-lg font-bold leading-tight">
                <Link to={`/news/${next?.slug}`}>{next?.title}</Link>
              </h3>
            </>
          )}
        </div>

        <div className="self-end text-right max-w-lg">
          {previous && (
            <>
              <p className="font-display text-primary">Previous</p>
              <h3 class="text-lg font-bold leading-tight">
                <Link to={`/news/${previous?.slug}`}>{previous?.title}</Link>
              </h3>
            </>
          )}
        </div>
      </nav>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostTemplateQuery($slug: String!, $next: String, $previous: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
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
      createdAt(formatString: "MMMM D, yyyy")
      content {
        childMarkdownRemark {
          html
          excerpt(format: PLAIN, pruneLength: 260, truncate: true)
        }
      }
    }

    next: contentfulBlogPost(slug: { eq: $next }) {
      id
      slug
      title
    }

    previous: contentfulBlogPost(slug: { eq: $previous }) {
      id
      slug
      title
    }
  }
`;

export default BlogPostTemplate;
