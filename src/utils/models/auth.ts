import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            default: "",
        },
        avatar: {
            type: Object,
            default: "",
        },
        age: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
        },
        location: {
            type: String,
            default: "",
        },
        about: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
)

const User = mongoose.models.user || mongoose.model("user", userSchema)
export default User