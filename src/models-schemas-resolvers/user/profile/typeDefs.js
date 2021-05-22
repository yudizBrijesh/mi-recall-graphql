const { gql } = require('apollo-server');
require('graphql-import-node/register');
const schemas = require('./schemas.graphql');

const typeDefs = gql`
    ${schemas}
`;

module.exports = typeDefs;
