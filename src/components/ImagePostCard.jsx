import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

const ImagePostCard = ({ post, extended = false, isEven }) => {
  if (!post.cover?.gatsbyImageData) {
    return (
      <Link to={`/news/${post.slug}`} className="mb-4 lg:mb-0">
        <section
          className={`${extended ? 'w-full h-96 md:w-80 md:h-56' : 'w-80 h-56'} rounded-2xl mr-12 ${
            isEven ? 'bg-primary' : 'bg-secondary'
          }`}
        ></section>
      </Link>
    );
  }
  return (
    <Link to={`/news/${post.slug}`} className="mb-4 lg:mb-0">
      <GatsbyImage
        image={post.cover.gatsbyImageData}
        alt={post.cover.title || ''}
        className={`${extended ? 'w-full h-96 md:w-80 md:h-56' : 'w-80 h-56'} rounded-2xl mr-12`}
      />
    </Link>
  );
};

export default ImagePostCard;
