import { GatsbyImage } from 'gatsby-plugin-image';
import Stack from '../components/Stack';
import React from 'react';

const ImagePost = ({ post }) => {
  if (!post.cover?.gatsbyImageData) {
    return (
      <section className="container relative px-8 md:px-24">
        <Stack className="w-max mx-auto">
          <h1 className="relative w-max font-extrabold text-xl text-center px-12 py-6 mb-24 border-8 border-black rounded-2xl bg-white mx-auto md:mb-32">
            {post.title}
          </h1>
        </Stack>
      </section>
    );
  }
  return (
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
  );
};

export default ImagePost;
