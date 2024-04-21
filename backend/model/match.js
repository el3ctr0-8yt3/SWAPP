const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    OfferId1:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
        required: true,
    },
    OfferId2:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
        required: true,
    },
    Offer1want : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    Offer2want : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    MatchDate:{
        type: Date,
        default: Date.now,
        expires: "7d", // 7 days
    },
    SwapComplete:{
        type: Boolean,
        default: false,
    }
});




exports.Match = mongoose.model("Match", matchSchema);
exports.matchSchema = matchSchema;