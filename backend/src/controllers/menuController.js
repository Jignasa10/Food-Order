import MenuItem from "../models/MenuItem.js";

// GET all menu items
export const getMenuItems = async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create menu item
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const newItem = await MenuItem.create({
      name,
      description,
      price,
      image,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
