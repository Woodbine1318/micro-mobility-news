import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import ImagePostCard from './ImagePostCard';

const BlogPostCard = ({ post, isEven, extended = false }) => {
  return (
    <article className={`flex flex-col flex-nowrap lg:flex-row ${extended ? '' : 'lg:items-center'}`} key={post.slug}>
      <ImagePostCard post={post} extended={extended} isEven={isEven} />

      <div className="flex-1">
        {post.categories.map((category, i) => (
          <span
            className={`font-bold text-sm uppercase ${isEven ? 'text-primary' : 'text-secondary'} mr-2`}
            key={category.id}
          >
            #{category.name}
          </span>
        ))}

        <h2 className="font-extrabold text-lg leading-tight mb-8">
          <Link to={`/news/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-sm">{post.content.childMarkdownRemark.excerpt}</p>
      </div>
    </article>
  );
};

export default BlogPostCard;
