import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    if (!req.body.title || !req.body.date) {
        return res.status(400).json({
          message: "Missing fields",
        });
      }
    const event = await Event.create(req.body);

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getEvents = async (req, res) => {
    try {
      const {
        search,
        category,
        status,
        date,
      } = req.query;
  
      const filters = {};
  
      // Search by title
      if (search) {
        filters.title = {
          $regex: search,
          $options: "i",
        };
      }
  
      // Filter by category
      if (category) {
        filters.categoryId = category;
      }
  
      // Filter by status
      if (status) {
        filters.status = status;
      }
  
      // Filter by date
      if (date) {
        const startDate = new Date(date);
  
        const endDate = new Date(date);
  
        endDate.setDate(endDate.getDate() + 1);
  
        filters.date = {
          $gte: startDate,
          $lt: endDate,
        };
      }
  
      const events = await Event.find(filters)
        .populate("categoryId")
        .sort({ date: 1 });
  
      res.json(events);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("categoryId");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};