// const User = require('../auth/models');

// const resolvers = {
//     Query: {
//         getProfile: async (_, { sToken }, {}, {}) => {
//             const decodedToken = _.decodedToken(sToken);
//             const user = await User.findOne({ _id: decodedToken.iUserId, eUserType: decodedToken.eUserType });
//             if (!user) return 'User not Found';
//             return user;
//         },
//     },
// };

// module.exports = resolvers;
