import { gql } from '@apollo/client';

// Queries
const GET_USERS = gql`
  query Users {
    allUsers(role: MEMBER) {
      data {
        name
      }
    }
  }
`;

const ALL_TALENTS = gql`
  query AllTalents {
    allTalents {
      data {
        _id
        name
        avatar
        pictures
        domain
        platform
        v30 {
          value
          date
        }
        mostRecentV30 {
          value
          date
        }
        subscribers {
          value
          date
        }
        mostRecentSubscribers {
          value

          date
        }
        price {
          value
          date
        }
        mostRecentPrice {
          value
          date
        }
        youtube {
          link
        }
        instagram {
          link
        }

        twitch {
          link
        }
        tiktok {
          link
        }
      }
    }
  }
`;

export { GET_USERS, ALL_TALENTS };
