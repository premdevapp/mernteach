const express = require("express");
const path = require("path");
const fs = require("fs");
// apolloserver for graphQl
const { ApolloServer, UserInputError } = require("apollo-server-express");
// scalartype
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

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
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    return ast.kind === Kind.STRING
      ? isNaN(new Date(ast.value))
        ? undefined
        : value
      : undefined;
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
    issueAdd,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return (aboutMessage = message);
}

function issueValidate(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (issue.status === "Assigned" && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError("Invalid input(s)", { errors });
  }
}

function issueAdd(_, { issue }) {
  issueValidate(issue);
  issue.created = new Date();
  issue.id = issueDB.length + 1;
  issueDB.push(issue);
  return issue;
}

function issueList() {
  return issueDB;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

server.applyMiddleware({ app, path: "/graphql" });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listen on http//:localhost:${port}`);
});
