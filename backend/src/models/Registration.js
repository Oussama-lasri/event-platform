import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    status: {
      type: String,
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Registration", registrationSchema);