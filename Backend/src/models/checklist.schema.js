import mongoose, { Schema } from "mongoose";

const OnboardingChecklistSchema = new Schema(
    {
        prospectId: {
            type: Schema.Types.ObjectId,
            ref: "Card",
            required: true
        },

        stepNumber: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        assignee: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: ["todo", "done"],
            default: "todo"
        },

        dueDate: Date
    },
    {
        timestamps: true
    }
);

// Optimizes checklist retrieval and enforces one step number per prospect.
OnboardingChecklistSchema.index({ prospectId: 1, stepNumber: 1 }, { unique: true });
OnboardingChecklistSchema.index({ prospectId: 1, status: 1 });

export default mongoose.model(
    "OnboardingChecklist",
    OnboardingChecklistSchema
);