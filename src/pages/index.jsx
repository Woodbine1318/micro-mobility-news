import React from 'react';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import Logo from '../assets/images/Logo.svg';
import Bike from '../assets/images/Bike.svg';
import Scooter from '../assets/images/Scooter.svg';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';
import BlogPostCard from '../components/BlogPostCard';

const IndexPage = ({ data: { allContentfulBlogPost } }) => {
  const [featured, ...latest] = allContentfulBlogPost?.edges.map(({ node: post }) => post);

  return (
    <Layout>
      <SEO title="Home" />

      <header className="container flex flex-row flex-nowrap justify-around items-center py-8 px-7 max-w-screen-xl mx-auto mb-24 md:justify-between">
        <Bike className="w-40 h-w-40 hidden md:block md:w-48 md:h-48" />
        <Scooter className="w-32 h-w-32 md:w-40 md:h-40" />

        <Logo className="w-60" />

        <Bike className="w-40 h-w-40 md:w-48 md:h-48" />
        <Scooter className="w-32 h-w-32 hidden md:block md:w-40 md:h-40" />
      </header>

      <div className="container px-7 grid grid-cols-1 md:grid-cols-2 md:px-11 md:gap-x-14">
        <article className="max-w-4xl p-14 border-8 border-black rounded-3xl mb-24 md:mb-8">
          <GatsbyImage
            image={featured.cover.gatsbyImageData}
            alt={featured.cover.title || ''}
            className="rounded-3xl mb-7 w-full max-h-120"
          />

          <h2 className="font-extrabold text-lg mb-16">{featured.title}</h2>
          <p className="mb-8">{featured.content.childMarkdownRemark.excerpt}</p>

          <p className="w-72 text-center border-4 border-black rounded-xl font-black uppercase py-3">
            {featured.category.name}
          </p>
        </article>

        <section className="w-full">
          <h1 className="font-black text-2xl uppercase border-b-8 border-black mb-16">Latest</h1>

          {latest.map((post, index) => (
            <div className="flex flex-row flex-nowrap items-center mb-14">
              <p className="font-black text-2xl mr-12">{index + 1}</p>

              <BlogPostCard post={post} isEven={index % 2 === 0} />
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query IndexPageQuery {
    allContentfulBlogPost(limit: 5, sort: { fields: createdAt, order: ASC }) {
      edges {
        node {
          id
          slug
          title
          category {
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
              excerpt(format: PLAIN, pruneLength: 260, truncate: true)
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
