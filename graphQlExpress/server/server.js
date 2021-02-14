const express = require("express");
const path = require("path");
const fs = require("fs");
// apolloserver for graphQl
const { ApolloServer } = require("apollo-server-express");
// scalartype
const { GraphQLScalarType } = require("graphql");

// hard coded in-memory values
let aboutMessage = "Issue Tracker Api v1.0";
const issueDB = [
  {
    id: 1,
    status: "New",
    owner: "Raven",
    effort: 5,
    created: new Date("2018-08-15"),
    due: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    effort: 14,
    created: new Date("2018-08-16"),
    due: new Date("2019-08-30"),
    title: "Missing bottom border on panel",
  },
];

const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "A Date() type in GraphQl as a scalar",
  serialize(value) {
    return value.toISOString();
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return (aboutMessage = message);
}

function issueList() {
  return issueDB;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"),
  resolvers,
});

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

server.applyMiddleware({ app, path: "/graphql" });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listen on http//:localhost:${port}`);
});
