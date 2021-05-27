const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
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

const { typeDefs, resolvers, permissions } = require('./src/models-schemas-resolvers');

const server = new ApolloServer({
    schema: applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), permissions),
    context: ({ req }) => {
        const header = req.headers;
        return header;
    },
});

server.applyMiddleware({ app });

app.listen(4000 || process.env.PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${4000 || process.env.PORT}`);
});

module.exports = app;
