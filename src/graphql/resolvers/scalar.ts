import { GraphQLScalarType, Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'ISO-8601 compliant DateTime scalar type',
  serialize(value) {
    // Convert outgoing Date to ISO string
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw new Error('DateTime must be a valid Date object');
  },
  parseValue(value) {
    // Convert incoming ISO string to Date
    if (typeof value === 'string') {
      return new Date(value);
    }
    throw new Error('DateTime must be a valid ISO string');
  },
  parseLiteral(ast) {
    // Convert incoming literal string to Date
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    throw new Error('DateTime must be a valid ISO string');
  },
});
