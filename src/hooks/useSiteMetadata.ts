import { useStaticQuery, graphql } from 'gatsby';

interface UseSiteMetaDataResult {
  title: string;
  description: string;
  addText: string;
  addLink: string;
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
      }
    }
  `);

  return data.site.siteMetadata;
}
