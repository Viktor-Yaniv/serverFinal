const Animal = require('../models/animal');

exports.getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: 'Animal not found' });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!animal) {
      return res.status(404).json({ error: 'Animal not found' });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: 'Animal not found' });
    }
    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
