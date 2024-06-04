import mongoose from "mongoose";


const userpostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            default: "",
        },
        number: {
            type: String,
            default: "",
        },
        category: {
            type: String,
            default: "",
        },
        quantity: {
            type: String,
            default: "",
        },
        image: {
            id: {
                type: String
            },
            url: {
                type: String
            }
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
)

const Userpost = mongoose.models.Userpost || mongoose.model("Userpost", userpostSchema)
export default Userpost;