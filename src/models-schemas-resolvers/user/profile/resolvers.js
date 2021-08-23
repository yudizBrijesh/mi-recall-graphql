/* eslint-disable no-empty-pattern */
const { utils } = require('../../../helpers');
const User = require('../auth/models');
const UserData = require('./UserData');

const resolvers = {
    Query: {
        getProfiles: async (_, {}, header) => {
            const decodedToken = utils.decodeToken(header.authorization);
            const query = { _id: decodedToken.iUserId, eUserType: decodedToken.eUserType };
            const user = await User.findOne(query);
            return user;
        },
        getRecords: async (_, { input }, header) => {
            try {
                const decodedToken = utils.decodeToken(header.authorization);
                const query = { _id: decodedToken.iUserId, eUserType: decodedToken.eUserType };
                const user = await User.findOne(query);
                const findQuery = {
                    iUserId: utils.mongify(user._id),
                    eStatus: 'active',
                    eFormStatus: 'done',
                };
                if (input.sRecordType !== 'all') {
                    query.eRecordType = input.sRecordType;
                }
                if (input.sMediaType.length) {
                    query.$or = [];
                    // eslint-disable-next-line array-callback-return
                    input.sMediaType.map((elem) => {
                        query.$or.push({ eMediaType: { $eq: elem } });
                    });
                }
                input.nStart *= input.nLimit;
                input.nEnd = input.nStart + input.nLimit;
                const response = {};
                const result = await UserData.find(findQuery).lean();
                if (!result.length) throw new Error('Data not found');
                response.totalRecords = result.length;
                response.records = result.sort((a, b) => b.dCreatedDate - a.dCreatedDate).slice(input.nStart, input.nEnd);
                // eslint-disable-next-line no-unused-expressions
                result.slice(input.nEnd, input.nEnd + 10).length ? (response.isMoreData = true) : (response.isMoreData = false);
                return response;
            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        changePassword: async (_, { input }, header) => {
            try {
                const decodedToken = utils.decodeToken(header.authorization);
                const query = { _id: decodedToken.iUserId, eUserType: decodedToken.eUserType };
                const user = await User.findOne(query);
                if (!user) throw new Error('User not Found');
                if (!user.sPassword === utils.encryptPassword(input.sOldPassword)) throw new Error("Old password doesn't match");
                const updateQuery = { sPassword: utils.encryptPassword(input.sNewPassword) };
                const update = await User.updateOne(query, updateQuery);
                if (!update.nModified) throw new Error('Please try again!!!');
                return 'Password changed successfully';
            } catch (error) {
                return error;
            }
        },
    },
};

module.exports = resolvers;
