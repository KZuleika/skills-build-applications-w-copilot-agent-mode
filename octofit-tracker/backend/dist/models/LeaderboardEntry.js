import mongoose, { Schema } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    rank: { type: Number, required: true },
    userId: { type: String, required: true },
    score: { type: Number, required: true },
}, { timestamps: true });
const LeaderboardEntry = mongoose.models.LeaderboardEntry ||
    mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntry;
