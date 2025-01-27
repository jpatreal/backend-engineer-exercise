import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
 enum Service {
    DELIVERY
    PICKUP
    PAYMENT
 }
  type Lead {
    id: Int!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [Service]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type LeadPagination {
    leads: [Lead]!
    totalCount: Int!
  }

  type Query {
    leads(limit: Int!, page: Int!): LeadPagination
    lead(id: Int!): Lead
  }

  type Mutation {
    register(name: String!, email: String!, mobile: String!, postcode: String!, services: [Service!]!): Lead!
  }
`;

export default userTypeDefs;
