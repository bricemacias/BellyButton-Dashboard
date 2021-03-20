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
          channelId
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

// Mutations
const UPDATE_TALENT_SUBSCRIBERS = gql`
  mutation UpdateTalentSubscribers(
    $id: ID!
    $name: String!
    $value: Int
    $date: Date
    $subscribers: [SubscribersInput]
  ) {
    updateTalent(
      id: $id
      data: {
        name: $name
        mostRecentSubscribers: { value: $value, date: $date }
        subscribers: $subscribers
      }
    ) {
      name
      mostRecentSubscribers {
        value
        date
      }
      subscribers {
        value
        date
      }
    }
  }
`;

const UPDATE_TALENT_V30 = gql`
  mutation UpdateTalentV30(
    $id: ID!
    $name: String!
    $value: Int
    $date: Date
    $v30: [V30Input]
  ) {
    updateTalent(
      id: $id
      data: {
        name: $name
        mostRecentV30: { value: $value, date: $date }
        v30: $v30
      }
    ) {
      name
      mostRecentV30 {
        value
        date
      }
      v30 {
        value
        date
      }
    }
  }
`;

export { GET_USERS, ALL_TALENTS, UPDATE_TALENT_SUBSCRIBERS, UPDATE_TALENT_V30 };
