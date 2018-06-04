const { graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID } = require('graphql');
const server = require('express')();
const graphqlHttp = require('express-graphql');

const videos = [
	{
		id: '1',
		title: 'goonies',
		duration: 300,
		watched: true,
	},
	{
		id: '1',
		title: 'indiana jones',
		duration: 300,
		watched: true,
	},
];

const videoType = new GraphQLObjectType({
  name: 'Video',
	id: {
		type: GraphQLID,
		description: 'duh id',
	},
	title: {
		type: GraphQLString,
	},
	duration: {
		type: GraphQLInt,
	},
	watched: {
		watched: GraphQLBoolean,
	},
});

const queryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'Root query',
	fields: {
		video: {
			type: videoType,
			resolve: () =>
				new Promise((resolve) => {
					resolve({
						id: '1',
						title: 'goonies',
						duration: 300,
						watched: true,
					});
				}),
		},
	},
});

const advancedSchema = new GraphQLSchema({
	query: queryType,
});

server.use(
	'/graphql',
	graphqlHttp({
		advancedSchema,
		graphiql: true,
	}),
);

server.listen('8080', () => console.log('Running on port 8080'));

/*
/ Simple schema and query
*/
// const simpleSchema = buildSchema(`
// type Schema {
//   query: Query
// }

// 	type Query {
//     video: Video
// 		videos: [Video]
// 	}
  
// 	type Video {
// 		id: ID,
// 		title: String,
// 		duration: Int,
// 		watched: Boolean
// 	}
// `);

// const query = `
// query q {
//   video { title }
//   videos { title }
// 	}
//   `;

// const resolvers = {
// 	video: () => ({
// 		id: '1',
// 		title: 'goonies',
// 		duration: 300,
// 		watched: true,
// 	}),
// 	videos: () => videos,
// };

// graphql(simpleSchema, query, resolvers)
// 	.then((result) => console.log(result))
// 	.catch((error) => console.log(error));
