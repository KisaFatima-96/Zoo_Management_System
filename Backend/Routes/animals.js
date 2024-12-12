const express = require('express');
const router = express.Router();
const Animal = require('../Schemas/Animal');

// Get all animals
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one animal
router.get('/:id', getAnimal, (req, res) => {
  res.json(res.animal);
});

async function getAnimal(req, res, next) {
  let animal;
  try {
    animal = await Animal.findById(req.params.id);
    if (animal == null) {
      return res.status(404).json({ message: 'Cannot find animal' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.animal = animal;
  next();
}

module.exports = router;