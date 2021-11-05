import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import Stack from '../components/Stack';
import HeaderAlternate from '../components/HeaderAlternate';
import ImagePost from '../components/ImagePost';

const BlogPostTemplate = ({ location, data: { contentfulBlogPost: post } }) => {
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
    </Layout>
  );
};

export const query = graphql`
  query BlogPostTemplateQuery($slug: String!) {
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
      createdAt
      content {
        childMarkdownRemark {
          html
          excerpt(format: PLAIN, pruneLength: 260, truncate: true)
        }
      }
    }
  }
`;

export default BlogPostTemplate;
