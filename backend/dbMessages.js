import mongoose from "mongoose";

const threadSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    reply: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reply",
        },
    ],
    lastReplied: {
        type: Date,
        default: Date.now,
    },
});

var Thread = mongoose.model("Thread", threadSchema);

const replySchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    upvote: {
        type: Number,
        default: 0,
    },
    downvote: {
        type: Number,
        default: 0,
    },
    upvotedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    downvotedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

var Reply = mongoose.model("Reply", replySchema);

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        unique: true,
    },
    nameChanged: {
        type: Boolean,
        default: false,
    },
});

var User = mongoose.model("User", userSchema);

export { Thread, Reply, User };
