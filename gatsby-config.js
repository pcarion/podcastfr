module.exports = {
  siteMetadata: {
    title: 'Podcasts Tech en Français',
    description: 'Vous pouvez ajouter votre podcast gratuitement sur https://github.com/pcarion/podcastfr',
    addText: 'Ajouter un podcast',
    addLink: 'https://github.com/pcarion/podcastfr',
  },
  plugins: [
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
  ],
};
