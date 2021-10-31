import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import HeaderAlternate from '../components/HeaderAlternate';

const BlogPostTemplate = ({ data: { contentfulBlogPost: post } }) => {
  return (
    <Layout>
      <SEO />

      <HeaderAlternate />

      <section className="container relative px-8 mb-12 md:mb-24 md:px-24">
        <GatsbyImage
          image={post.cover.gatsbyImageData}
          title={post.cover.title || ''}
          className="w-full h-224 rounded-3xl"
        />

        <h1 className="absolute left-8 w-10/12 right-10 bottom-0 px-6 md:px-14 py-12 bg-white border-8 border-black font-extrabold rounded-bl-3xl text-xl md:left-24 md:w-max md:max-w-5xl md:text-2xl">
          {post.title}
        </h1>
      </section>

      <section className="container grid grid-cols-1 px-8 mb-24 md:px-24 md:gap-x-24 md:grid-cols-4">
        <div className="flex flex-row flex-wrap items-start height-min mb-12 gap-2">
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
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

export default BlogPostTemplate;
