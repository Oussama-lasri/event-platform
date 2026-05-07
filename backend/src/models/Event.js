import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    maxParticipants: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "finished", "cancelled"],
      default: "upcoming",
    },

    image: String,

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);