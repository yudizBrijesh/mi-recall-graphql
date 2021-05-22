const { ApolloServer } = require('apollo-server');

const app = require('express')();

const mongoose = require('mongoose');

mongoose
    .connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('Database Connected');
    })
    .catch(() => {
        console.log('Connection Error');
    });

const { typeDefs, resolvers } = require('./src/models-schemas-resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => req.headers,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

module.exports = app;
