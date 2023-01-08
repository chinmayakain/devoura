import mongoose, { Schema } from "mongoose";

interface IJobTracker {
    status: String;
    url: String;
    userId: mongoose.Schema.Types.ObjectId;
}

const JobTrackerSchema = new Schema<IJobTracker>({
    status: {
        type: String,
        enum: ["processing", "completed", "failed"],
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const JobTracker = mongoose.model("JobTracker", JobTrackerSchema);

export { JobTracker };
