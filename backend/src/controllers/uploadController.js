export const uploadEventImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    return res.status(201).json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
