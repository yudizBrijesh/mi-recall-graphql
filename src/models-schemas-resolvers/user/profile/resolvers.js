/* eslint-disable no-empty-pattern */
const { utils } = require('../../../helpers');
const User = require('../auth/models');

const resolvers = {
    Query: {
        getProfiles: async (_, {}, header) => {
            const decodedToken = utils.decodeToken(header.authorization);
            const user = await User.findOne({ _id: decodedToken.iUserId, eUserType: decodedToken.eUserType });
            if (!user) return 'User not Found';
            return user;
        },
    },
};

module.exports = resolvers;
