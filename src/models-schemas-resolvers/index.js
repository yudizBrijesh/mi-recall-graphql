const userAuthResolver = require('./user/auth/resolvers');
const userAuthTypeDefs = require('./user/auth/typeDefs');

const resolvers = [userAuthResolver];
const typeDefs = [userAuthTypeDefs];

module.exports = {
    resolvers,
    typeDefs,
};
