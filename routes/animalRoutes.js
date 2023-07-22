const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', animalController.getAnimals);
router.post('/', authMiddleware, animalController.createAnimal);
router.get('/:id', animalController.getAnimalById);
router.put('/:id', authMiddleware, animalController.updateAnimal);
router.delete('/:id', authMiddleware, animalController.deleteAnimal);

module.exports = router;
