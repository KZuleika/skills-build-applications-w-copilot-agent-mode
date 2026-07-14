import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
}, { timestamps: true });
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
