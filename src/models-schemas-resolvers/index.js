require('graphql-import-node/register');
const { gql } = require('apollo-server');
const { shield } = require('graphql-shield');

// Resolvers
const userAuthResolver = require('./user/auth/resolvers');
const userProfileResolver = require('./user/profile/resolvers');

// TpeDefs
const userAuthSchemas = require('./user/auth/typeDefs');
const userProfileSchemas = require('./user/profile/typeDefs');

// Permissions
const userProfilePermissions = require('./user/profile/permissions');

const resolvers = [userProfileResolver, userAuthResolver];

const typeDefs = gql`
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
    ${userProfileSchemas}
    ${userAuthSchemas}
`;

const permissions = shield({
    Query: {
        getProfiles: userProfilePermissions.isAuthenticated,
        getRecords: userProfilePermissions.isAuthenticated,
    },
    Mutation: {
        changePassword: userProfilePermissions.isAuthenticated,
    },
});

module.exports = {
    resolvers,
    typeDefs,
    permissions,
};
