import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from '@apollo/server';
import schema from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import assert from 'assert';

interface Lead {
  id: number;
  name: string;
  email: string;
  services: Lead[];
}

interface LeadsQueryResponse {
  leads: {
    leads: Lead[];
    totalCount: number;
  };
}

describe('GraphQL: Leads Endpoint', () => {
  let testServer: ApolloServer;

  beforeAll(() => {
    testServer = new ApolloServer({
      typeDefs: schema,
      resolvers,
    });
  });

  it('Fetches leads with pagination', async () => {
    const GET_LEADS = `
      query GetLeads($limit: Int!, $page: Int!) {
        leads(limit: $limit, page: $page) {
          leads {
            id
            name
            email
          }
          totalCount
        }
      }
    `;

    const variables = { limit: 5, page: 1 };

    const response = await testServer.executeOperation({
      query: GET_LEADS,
      variables,
    });

    assert(response.body.kind === 'single', 'Expected single result body type');

    const leadsData = response.body.singleResult.data as unknown as LeadsQueryResponse;

    assert(leadsData.leads.leads.length <= 10, 'Expected no more than 10 leads in response');
    assert(leadsData.leads.totalCount >= 0, 'Expected totalCount to be non-negative');
  });

  it('Handles invalid pagination gracefully', async () => {
    const GET_LEADS = `
      query GetLeads($limit: Int!, $page: Int!) {
        leads(limit: $limit, page: $page) {
          leads {
            id
            name
            email
          }
          totalCount
        }
      }
    `;
  
    const variables = { limit: -1, page: 0 };
  
    const response = await testServer.executeOperation({
      query: GET_LEADS,
      variables,
    });

    assert(response.body.kind === 'single', 'Expected single result body type');
  
    const singleResult = response.body.singleResult;
    assert(singleResult.errors !== undefined, 'Expected errors in response for invalid pagination');
  });

  it('Validates that services[] is not null and contains only valid values', async () => {
    const GET_LEADS = `
      query GetLeads($limit: Int!, $page: Int!) {
        leads(limit: $limit, page: $page) {
          leads {
            id
            name
            email
            services
          }
        }
      }
    `;
  
    const variables = { limit: 5, page: 1 };
  
    const response = await testServer.executeOperation({
      query: GET_LEADS,
      variables,
    });

    assert(response.body.kind === 'single', 'Expected single result body type');
  
    const leadsData = response.body.singleResult.data as unknown as LeadsQueryResponse;
  
    assert(leadsData.leads.leads.length > 0, 'Expected leads array to not be empty');
  
    // Check services for each lead
    leadsData.leads.leads.forEach((lead) => {
      assert(lead.services !== null, `Expected services for lead ${lead.id} to not be null`);
      
      // Validate that all services are within the enum
      lead.services.forEach((service) => {
        const validServices = ['DELIVERY', 'PAYMENT', 'PICKUP'];
        assert(
          validServices.includes(service.toString()),
          `Invalid service '${service}' found for lead ${lead.id}`
        );
      });
    });
  });
  
});
