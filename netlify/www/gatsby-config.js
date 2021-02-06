module.exports = {
  siteMetadata: {
    title: 'Podcasts Techniques en Français',
    description: 'Vous pouvez ajouter votre podcast favori gratuitement.',
    addText: 'Ajouter un podcast',
    addLink: 'https://github.com/pcarion/podcastfr#readme',
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://www.cistula.com/',
        siteUrl: 'https://www.podcastfr.com/',
        disableCookies: true,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'podcasts',
        path: `${__dirname}/content/podcasts`,
      },
    },
  ],
};
