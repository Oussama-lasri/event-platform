import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

export const registerToEvent = async (req, res) => {
    try {
        const { eventId } = req.body;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        const registrationsCount =
            await Registration.countDocuments({
                eventId,
            });

        if (
            registrationsCount >= event.maxParticipants
        ) {
            return res.status(400).json({
                message: "Event is full",
            });
        }

        const alreadyRegistered =
            await Registration.findOne({
                userId: req.user.id,
                eventId,
            });

        if (alreadyRegistered) {
            return res.status(400).json({
                message: "Already registered",
            });
        }

        const registration =
            await Registration.create({
                userId: req.user.id,
                eventId,
            });

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const cancelRegistration = async (
    req,
    res
) => {
    try {
        const registration =
            await Registration.findById(
                req.params.id
            );

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found",
            });
        }

        await registration.deleteOne();

        res.json({
            message: "Registration cancelled",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};