/* eslint-disable no-empty-pattern */
const User = require('./models');

const { utils } = require('../../../helpers');

const resolvers = {
    Query: {},
    Mutation: {
        userLogin: async (parent, { input }, {}, {}) => {
            try {
                const findQuery = {
                    sEmail: input.sEmail.trim(),
                    eUserType: 'user',
                    eStatus: 'y',
                };
                const user = await User.findOne(findQuery);
                if (!user) throw new Error('User Not Found');
                if (!user.bIsEmailVerified) throw new Error('User Account not verified');
                if (user.sPassword !== utils.encryptPassword(input.sPassword)) throw new Error('Password Incorrect');
                if (user.eStatus === 'n') throw new Error('User Account not active');
                if (user.eStatus === 'd') throw new Error('User Account not deleted');
                const sToken = input.isRememberMe ? utils.encodeToken({ iUserId: user._id, eUserType: user.eUserType }, { expiresIn: '30d' }) : utils.encodeToken({ iUserId: user._id, eUserType: user.eUserType });
                const updateQuery = {
                    $set: {
                        sToken,
                    },
                };
                const update = await User.updateOne(findQuery, updateQuery, { upsert: true }).lean();
                if (!update.nModified) throw new Error('Please Try Again!!!');
                return sToken;
            } catch (error) {
                return error;
            }
        },
        register: async (_, { input }, {}) => {
            try {
                const query = {
                    sEmail: input.sEmail,
                    eUserType: 'user',
                    sStatus: { $ne: 'd' },
                };
                const user = await User.countDocuments(query).lean();
                if (user) throw new Error('Email already exists');
                input.sPassword = utils.encryptPassword(input.sPassword);
                input.bIsEmailVerified = true;
                const result = await User.create(input);
                if (!result) throw new Error('Something went wrong');
                return 'user creation success';
            } catch (error) {
                return error;
            }
        },
    },
};

module.exports = resolvers;
