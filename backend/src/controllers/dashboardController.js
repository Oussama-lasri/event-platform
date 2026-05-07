import User from "../models/User.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

export const getDashboardStats =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments();

      const totalEvents =
        await Event.countDocuments();

      const totalRegistrations =
        await Registration.countDocuments();

      res.json({
        totalUsers,
        totalEvents,
        totalRegistrations,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };