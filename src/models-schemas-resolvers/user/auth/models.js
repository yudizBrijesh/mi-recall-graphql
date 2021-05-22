const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        sFirstName: {
            type: String,
            default: '',
        },
        sLastName: {
            type: String,
            default: '',
        },
        sPassword: {
            type: String,
            default: '',
        },
        sEmail: {
            type: String,
            default: '',
        },
        bIsEmailVerified: {
            type: Boolean,
            default: false,
        },
        sToken: {
            type: String,
            default: '',
        },
        sVerificationToken: {
            type: String,
            default: '',
        },
        eStatus: {
            type: String,
            enum: ['y', 'n', 'd'],
            default: 'y',
        },
        eUserType: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        sProfilePicture: {
            type: String,
            default: process.env.DEFAULT_PROFILE_PICTURE,
        },
        sOtp: {
            type: String,
        },
    },
    { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = mongoose.model('users', User);
