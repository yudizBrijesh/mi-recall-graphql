const mongoose = require('mongoose');

const { Schema } = mongoose;

const model = new Schema(
    {
        iUserId: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
        },
        eMediaType: {
            type: String,
            enum: ['audio', 'video', 'image', 'dataset'],
        },
        eRecordType: {
            type: String,
            enum: ['contact', 'content', 'location'],
        },
        eStatus: {
            type: String,
            enum: ['active', 'deleted'],
            default: 'active',
        },
        eFormStatus: {
            type: String,
            enum: ['selectMediaType', 'insertFormData', 'selectThumbnail', 'done'],
            default: 'selectMediaType',
        },
        sMediaUrl: String,
        sTitle: String,
        sDescription: String,
        sLocation: String,
        sVideoDuration: String,
        sVideoThumbnailUrl: String,
        oContactData: {
            sFirstName: {
                type: String,
            },
            sLastName: String,
            sEmail: String,
            sCompany: String,
            sDesignation: String,
            sLocationCollected: String, // This is the location where the contact was collected.
            eMeetingContext: {
                type: String,
                enum: [],
            },
            eEventTitle: {
                type: String,
                enum: [],
            },
            sEventName: String,
            sEventDescription: String,
            sNotes: String,
            ePersonalTitle: {
                type: String,
                enum: [],
            },
            contacts: [
                {
                    sCountryCode: String,
                    sContactNumber: Number,
                    sContactType: String,
                },
            ],
            profiles: [
                {
                    sProfileLink: String,
                    sProfileType: String,
                },
            ],
            sTitle: String,
            sDescription: String,
            sLocation: String,
        },
        oContentData: {
            sPresentation: String,
            sSpeaker: String,
            sRecordingNotes: String,
            sTitle: String,
            sDescription: String,
            sLocation: String,
        },
        oLocationData: {
            sPlace: String,
            sRoom: Number,
            sSeating: Number,
            sTitle: String,
            sDescription: String,
            sLocation: String,
        },
    },
    { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = mongoose.model('UserData', model);
