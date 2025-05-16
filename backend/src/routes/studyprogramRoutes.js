const express = require('express');
const router = express.Router();
const controller = require('../controllers/studyprogramController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', controller.getAllStudyPrograms);
router.get('/:id', controller.getStudyProgramById);
router.post('/', protect, restrictTo('admin'), controller.createStudyProgram);
router.put('/:id', protect, restrictTo('admin'), controller.updateStudyProgram);
router.delete('/:id', protect, restrictTo('admin'), controller.deleteStudyProgram);

module.exports = router;
