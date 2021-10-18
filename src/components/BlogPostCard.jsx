import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

const BlogPostCard = ({ post, isEven }) => {
  return (
    <article className="flex flex-nowrap items-center" key={post.slug}>
      <Link to={`/news/${post.slug}`}>
        <GatsbyImage
          image={post.cover.gatsbyImageData}
          alt={post.cover.title || ''}
          className="w-80 h-56 rounded-2xl mr-12"
        />
      </Link>

      <div className="flex-1">
        <p className={`font-bold text-sm uppercase ${isEven ? 'text-primary' : 'text-secondary'}`}>
          #{post.category.name}
        </p>
        <h2 className="font-extrabold text-lg leading-tight mb-8">
          <Link to={`/news/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-sm">{post.content.childMarkdownRemark.excerpt}</p>
      </div>
    </article>
  );
};

export default BlogPostCard;
