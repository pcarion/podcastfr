import { graphql, useStaticQuery } from 'gatsby';
import { Host } from '../jtd/podcast';
import { PodcastExtra, EpisodeDate } from '../types';

const usePodcasts = (): PodcastExtra[] => {
  const data = useStaticQuery(graphql`
    query {
      allPodcastsJson {
        nodes {
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
    }
  `);

  return data.allPodcastsJson.nodes.map((post: PodcastExtra) => ({
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    pid: post.pid,
    yamlDescriptionFile: post.yamlDescriptionFile,
    contacts: {
      link: post.contacts.link,
      email: post.contacts.email,
      twitter: post.contacts.twitter,
      patreon: post.contacts.patreon,
      googleGroup: post.contacts.googleGroup,
    },
    hosts: post.hosts.map((h: Host) => ({
      name: h.name,
      twitter: h.twitter,
    })),
    feed: {
      rss: post.feed.rss,
      itunes: post.feed.itunes,
      spotify: post.feed.spotify,
      soundcloud: post.feed.soundcloud,
      deezer: post.feed.deezer,
      google: post.feed.google,
      castbox: post.feed.castbox,
      pocketcast: post.feed.pocketcast,
    },
    extra: {
      colors: {
        vibrant: post.extra.colors.vibrant,
        darkVibrant: post.extra.colors.darkVibrant,
        lightVibrant: post.extra.colors.lightVibrant,
        muted: post.extra.colors.muted,
        darkMuted: post.extra.colors.darkMuted,
        lightMuted: post.extra.colors.lightMuted,
      },
      episodes: post.extra.episodes.map((e: EpisodeDate) => ({
        publishingDate: e.publishingDate,
      })),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      imageFluid: post.extra.logoRepoImage?.childImageSharp?.fluid || null,
    },
  }));
};

export default usePodcasts;
