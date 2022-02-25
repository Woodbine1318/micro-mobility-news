require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: `Micromobility News`,
    description: `Micromobility News`,
    author: `@micromobilitynews`,
    siteUrl: `https://micromobilitynews.co.uk/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Micromobility News`,
        short_name: `MMN`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/assets/`,
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlogPost } }) => {
              return allContentfulBlogPost.edges.map(({ node: post }) => {
                return {
                  title: post.title,
                  date: post.publishedDate,
                  description: post.content ? post.content.childMarkdownRemark.excerpt : '',
                  url: `${site.siteMetadata.siteUrl}/news/${post.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/news/${post.slug}`,
                  enclosure: post.cover
                    ? {
                        url: post.cover.file.url,
                        size: post.cover.file.details.size,
                        type: post.cover.file.contentType,
                      }
                    : null,
                  custom_elements: [{ 'content:encoded': post.content ? post.content.childMarkdownRemark.html : '' }],
                };
              });
            },
            query: `
              {
                allContentfulBlogPost(sort: {fields: createdAt, order: DESC}) {
                  edges {
                    node {
                      slug
                      title
                      publishedDate: createdAt
                      categories {
                        id
                        slug
                        name
                      }
                      content {
                        childMarkdownRemark {
                          html
                          excerpt(format: PLAIN, pruneLength: 260, truncate: true)
                        }
                      }
                      cover {
                        file {
                          url
                          details {
                            size
                          }
                          contentType
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Micromobility News',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GATSBY_GA_ID],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {},
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          exclude: [],
        },
      },
    },
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `micromobility`,
      },
    },
  ],
};
