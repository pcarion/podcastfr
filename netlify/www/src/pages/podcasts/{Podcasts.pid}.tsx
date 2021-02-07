import React, { ReactElement } from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/single/layout';

import Podcast from '../../components/podcast';

export default function PodcastPage(props: any): ReactElement {
  const data = props.data.podcasts;
  return (
    <Layout>
      <Podcast key={`${data.yamlDescriptionFile}`} podcast={data} />
    </Layout>
  );
}
// This is the page query that connects the data to the actual component. Here you can query for any and all fields
// you need access to within your code. Again, since Gatsby always queries for `id` in the collection, you can use that
// to connect to this GraphQL query.
export const query = graphql`
  query($id: String) {
    podcasts(id: { eq: $id }) {
      title
      description
      imageUrl
      pid
      yamlDescriptionFile
      contacts {
        link
        email
        twitter
        patreon
        googleGroup
      }
      hosts {
        name
        twitter
      }
      feed {
        rss
        itunes
        spotify
        soundcloud
        deezer
        google
        castbox
        pocketcast
      }
      extra {
        colors {
          vibrant
          darkVibrant
          lightVibrant
          muted
          darkMuted
          lightMuted
        }
        episodes {
          publishingDate
        }
        logoRepoImage {
          childImageSharp {
            fluid(maxWidth: 128) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
