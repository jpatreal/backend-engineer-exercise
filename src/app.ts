import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from './graphql/schema'; // Import the schema
import sequelize from './models';
import 'dotenv/config';

const startServer = async () => {
  // Sync the database
  await sequelize.sync();
  console.log('Database connected!');

  // Initialize Apollo Server
  const server = new ApolloServer({
    schema, // Use the GraphQL schema
  });

  // Start the server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
};

startServer().catch((err) => {
  console.error('Error starting the server:', err);
});
