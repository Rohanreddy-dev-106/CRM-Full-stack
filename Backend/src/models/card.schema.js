import mongoose, { Schema } from "mongoose";
const CardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        school: {
            type: String,
            required: true,
            trim: true
        },

        role: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            trim: true
        },

        phone: {
            type: String,
            trim: true
        },

        source: {
            type: String
        },

        stage: {
            type: String,
            enum: [
                "Cold",
                "Contacted",
                "Demo Booked",
                "Demo Done",
                "Proposal Sent",
                "Pilot Closed"
            ],
            default: "Cold"
        },

        lastContactDate: Date,
        nextFollowUpDate: Date
    },
    {
        timestamps: true
    }
);

// Supports board-style stage grouping and recent-first timeline views.
CardSchema.index({ stage: 1, createdAt: -1 });
CardSchema.index({ createdAt: -1 });
CardSchema.index({ nextFollowUpDate: 1 });

export default mongoose.model("Card", CardSchema);