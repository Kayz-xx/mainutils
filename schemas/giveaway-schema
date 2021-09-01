const {mongoPath} = require('../config.json')
const mongoose = require('mongoose');
mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB(Giveaways)');
});
const giveawaySchema = new mongoose.Schema({
    messageId: String,
    channelId: String,
    guildId: String,
    startAt: Number,
    endAt: Number,
    ended: Boolean,
    winnerCount: Number,
    prize: String,
    messages: {
        giveaway: String,
        giveawayEnded: String,
        inviteToParticipate: String,
        drawing: String,
        dropMessage: String,
        winMessage: mongoose.Mixed,
        embedFooter: mongoose.Mixed,
        noWinner: String,
        winners: String,
        endedAt: String,
        hostedBy: String
    },
    thumbnail: String,
    hostedBy: String,
    winnerIds: [String],
    reaction: mongoose.Mixed,
    botsCanWin: Boolean,
    embedColor: mongoose.Mixed,
    embedColorEnd: mongoose.Mixed,
    exemptPermissions: [],
    exemptMembers: String,
    bonusEntries: String,
    extraData: mongoose.Mixed,
    lastChance: {
        enabled: Boolean,
        content: String,
        threshold: Number,
        embedColor: mongoose.Mixed
    },
    pauseOptions: {
        isPaused: Boolean,
        content: String,
        unPauseAfter: Number,
        embedColor: mongoose.Mixed,
        durationAfterPause: Number
    },
    isDrop: Boolean,
    allowedMentions: {
        parse: [String],
        users: [String],
        roles: [String]
    }
});


module.exports = mongoose.model('giveaways', giveawaySchema);
