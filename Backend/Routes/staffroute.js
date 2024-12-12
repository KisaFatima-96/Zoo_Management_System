const express = require('express');
const router = express.Router();
const Staff = require('../Schemas/staff');
const Animal = require('../Schemas/Animal');

// Get all staff and their assigned animals
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find().populate('assignedAnimals');
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new staff
router.post('/', async (req, res) => {
  const { name, role } = req.body;

  const newStaff = new Staff({
    name,
    role,
    assignedAnimals: [],
  });

  try {
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Assign animal to a staff member
router.put('/:staffId/assign', async (req, res) => {
  const { staffId } = req.params;
  const { animalId } = req.body;

  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    const animal = await Animal.findById(animalId);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    staff.assignedAnimals.push(animal._id);
    await staff.save();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific staff member by ID along with assigned animals
router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate('assignedAnimals');
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
