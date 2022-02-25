const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	userId: {
		type: String, required: true,
	},
	guildId: {
        type: String, required: true,
    },
    AFK: {
        type: Boolean, default: false,
    },
    reason: {
        type: String, default: null,
    },
    timestamp: {
        type: Number, default: 0,
    },
    pings: {
        type: Array, default: [],
    }
});

module.exports = mongoose.model('afkSchema', schema);