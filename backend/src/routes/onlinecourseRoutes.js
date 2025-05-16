const express = require('express');
const router = express.Router();
const controller = require('../controllers/onlinecourseController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', controller.getAllOnlineCourses);
router.get('/:id', controller.getOnlineCourseById);
router.post('/', protect, restrictTo('admin', 'lecturer'), controller.createOnlineCourse);
router.put('/:id', protect, restrictTo('admin', 'lecturer'), controller.updateOnlineCourse);
router.delete('/:id', protect, restrictTo('admin'), controller.deleteOnlineCourse);

// student purchase
router.post('/:id/purchase', protect, restrictTo('student'), controller.purchaseOnlineCourse);

module.exports = router;
