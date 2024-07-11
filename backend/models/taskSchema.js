import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
    }

})

export default mongoose.model('Task', taskSchema);