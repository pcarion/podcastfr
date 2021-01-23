import { useStaticQuery, graphql } from 'gatsby';

interface UseSiteMetaDataResult {
  title: string;
  description: string;
  addText: string;
  addLink: string;
  buildTime: string;
  commitRef: string;
}

export default function useSiteMetadata(): UseSiteMetaDataResult {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          addText
          addLink
        }
        buildTime
      }
    }
  `);

  return {
    ...data.site.siteMetadata,
    buildTime: data.site.buildTime,
    commitRef: process.env.GATSBY_COMMIT_REF,
  };
}
