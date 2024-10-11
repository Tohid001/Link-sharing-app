import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'please enter your firstName'],
            maxLength: [30, "Name cann't exceed 30 characters"],
            minLength: [4, 'Name should have more than 4 characters'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'please enter your lastName'],
            maxLength: [30, "Name cann't exceed 30 characters"],
            minLength: [4, 'Name should have more than 4 characters'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'please enter your email'],
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid email'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'please enter your password'],
            minLength: [8, 'password should have atleast 8 characters'],
        },
        avatar: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
