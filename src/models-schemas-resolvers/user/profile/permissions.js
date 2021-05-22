const { rule } = require('graphql-shield');
const { utils } = require('../../../helpers');
const User = require('../auth/models');

const permissions = {};

permissions.isAuthenticated = rule()(async (parent, args, headers) => {
    try {
        if (!headers.authorization) return false;
        const decodedToken = utils.verifyToken(headers.authorization);
        if (!decodedToken || decodedToken === 'jwt expired') return false;
        const query = {
            _id: decodedToken.iUserId,
            eUserType: decodedToken.eUserType,
        };
        const result = await User.findOne(query).lean();
        if (!result) return false;
        if (result.eStatus === 'n') return false;
        if (result.eStatus === 'd') return false;
        if (!result.bIsEmailVerified) return false;
        if (!result || !result.sToken || result.sToken !== headers.authorization) return false;
        return true;
    } catch (error) {
        return error;
    }
});

module.exports = permissions;
