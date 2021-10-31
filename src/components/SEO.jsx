import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ description, lang, image, canonicalPath, title, og }) => {
  const {
    site: { siteMetadata: metadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `,
  );

  const canonicalUrl = `${metadata.siteUrl}${canonicalPath}`;
  const isArticleScheme = og.type === 'article';

  return (
    <Helmet title={title ? `${title} — ${metadata.title}` : metadata.title}>
      <html lang={lang} dir="ltr" />

      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />

      <meta name="description" content={description || metadata.description} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={og.type} />
      <meta property="og:site_name" content={metadata.title} />
      <meta property="og:title" content={title || metadata.title} />
      <meta property="og:description" content={description || metadata.description} />
      {image ? <meta property="og:image" content={image} /> : null}
      {image ? <meta property="og:image:type" content="image/png" /> : null}
      {image ? <meta property="og:image:width" content="1200" /> : null}
      {image ? <meta property="og:image:height" content="630" /> : null}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_GB" />

      {isArticleScheme ? <meta property="article:published_time" content={new Date(og.published_time)} /> : null}
      {isArticleScheme ? <meta property="article:author" content={metadata.author} /> : null}
      {isArticleScheme && og.tags
        ? og.tags.map((t, i) => <meta property="og:tag" content={t} key={`tag-${t}-${i}`} />)
        : null}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title || metadata.title} />
      <meta name="twitter:creator" content={metadata.author} />
      <meta name="twitter:description" content={description || metadata.description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      <meta name="twitter:url" content={canonicalUrl} />
    </Helmet>
  );
};

SEO.propTypes = {
  lang: PropTypes.string,
  canonicalPath: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  og: PropTypes.shape({
    type: PropTypes.oneOf(['website', 'article']),
    published_time: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

SEO.defaultProps = {
  lang: 'en',
  canonicalPath: '',
  description: '',
  og: { type: 'website' },
};

export default SEO;
