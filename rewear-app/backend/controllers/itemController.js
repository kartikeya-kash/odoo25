const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('../models/item');

const create = async (req, res, next) => {
  try {
    const item = req.body;
    if (!item.title || !item.uploader_id) {
      return res.status(400).json({ message: 'Title and uploader_id are required.' });
    }
    const itemId = await createItem(item);
    res.status(201).json({ message: 'Item created', itemId });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const affected = await updateItem(req.params.id, req.body);
    if (!affected) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item updated' });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const affected = await deleteItem(req.params.id);
    if (!affected) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getAll, getById, update, remove };
