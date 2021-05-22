/* eslint-disable no-empty-pattern */
const User = require('./models');

const { utils } = require('../../../helpers');

const resolvers = {
    Query: {},
    Mutation: {
        userLogin: async (_, { input }, {}, {}) => {
            const findQuery = {
                sEmail: input.sEmail.trim(),
                eUserType: 'user',
                eStatus: 'y',
            };
            const user = await User.findOne(findQuery);
            if (!user) return 'User not Found';
            if (!user.bIsEmailVerified) return 'User Account not verified';
            if (user.sPassword !== utils.encryptPassword(input.sPassword)) return 'Password Incorrect';
            if (user.eStatus === 'n') return 'User Account not active';
            if (user.eStatus === 'd') return 'User Account not deleted';
            const sToken = utils.encodeToken({ iUserId: user._id, eUserType: user.eUserType });
            const updateQuery = {
                $set: {
                    sToken,
                },
            };
            const update = await User.updateOne(findQuery, updateQuery, { upsert: true }).lean();
            if (!update.nModified) return 'Please Try Again!!!';
            return sToken;
        },
    },
};

module.exports = resolvers;
