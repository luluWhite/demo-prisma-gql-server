const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client');

// const resolvers = require('./resolvers')
const Query = require('./resolvers/Queries');
const Mutation = require('./resolvers/Mutations');

/**
 * child resolver name must be same as schema type name
 * for example, this resolver will resolve user for AuthenPayload,
 * so when import, the name would be AuthenPayload.
 */
const AuthenPayload = require('./resolvers/childrenResolvers/User');
const CourseFeed = require('./resolvers/childrenResolvers/CoursesViaIds');

const resolvers = {
	Query,
	Mutation,
	AuthenPayload,
	CourseFeed
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	/* context: {
		prisma
	}, */
	context: (req) => ({
		...req,
		prisma
	})
})

server.start(() => console.log('Server is running on http://localhost:4000'))

