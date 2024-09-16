const { clients, projects } = require("../sampleData");

// Mongoose models
const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// Client Type
const ClientType = new GraphQLObjectType({
  /** name - name of the type */
  name: "Client",
  /** fields - uses callback to get the actual data from specific fields and uses strongly type field names i.e. GraphQLID */
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  /** name - name of the type */
  name: "Project",
  /** fields - uses callback to get the actual data from specific fields and uses strongly type field names i.e. GraphQLID */
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
        type: ClientType,
        resolve(parent, args) {
            return Client.findById(parent.clientId);
        }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      /** name of type to use, taken from ClientType above */
      type: ProjectType,
      /** args - argument when getting the specific client from db */
      args: { id: { type: GraphQLID } },
      /** resolve - the response from this query */
      resolve(parent, args) {
        // return projects.find((project) => project.id === args.id);
        return Project.findById(args.id);
      },
    },

    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        // return clients;
        return Client.find();
      },
    },
    client: {
      /** name of type to use, taken from ClientType above */
      type: ClientType,
      /** args - argument when getting the specific client from db */
      args: { id: { type: GraphQLID } },
      /** resolve - the response from this query */
      resolve(parent, args) {
        // return clients.find((client) => client.id === args.id);
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
