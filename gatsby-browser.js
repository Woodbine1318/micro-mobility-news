import React from 'react';
import './src/styles/tailwind.css';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/800.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/900.css';
import '@fontsource/barlow-condensed/400.css';
import '@fontsource/barlow-condensed/600.css';
import { Helmet } from 'react-helmet';

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <Helmet>
        <script src="https://cdn.usefathom.com/script.js" data-site="XDNCZTKB" defer></script>
        <script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>
      </Helmet>
      {element}
    </>
  );
};
