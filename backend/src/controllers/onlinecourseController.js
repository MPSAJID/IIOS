const prisma = require('../prisma/client');

// GET all online courses
exports.getAllOnlineCourses = async (req, res) => {
  const courses = await prisma.onlineCourse.findMany({ include: { lecturer: true } });
  res.json(courses);
};

// GET one
exports.getOnlineCourseById = async (req, res) => {
  const course = await prisma.onlineCourse.findUnique({
    where: { id: req.params.id },
    include: { lecturer: true },
  });
  if (!course) return res.status(404).json({ error: 'Not found' });
  res.json(course);
};

// POST create
exports.createOnlineCourse = async (req, res) => {
  const { title, description, duration, price, lecturerId } = req.body;
  const course = await prisma.onlineCourse.create({
    data: { title, description, duration, price, lecturerId },
  });
  res.status(201).json(course);
};

// PUT update
exports.updateOnlineCourse = async (req, res) => {
  const course = await prisma.onlineCourse.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(course);
};

// DELETE
exports.deleteOnlineCourse = async (req, res) => {
  await prisma.onlineCourse.delete({ where: { id: req.params.id } });
  res.json({ message: 'Deleted' });
};

// POST purchase course
exports.purchaseOnlineCourse = async (req, res) => {
  const { onlineCourseId } = req.params;
  const userId = req.user.id;

  const existing = await prisma.onlineCoursePurchase.findFirst({
    where: { onlineCourseId, userId },
  });

  if (existing) return res.status(400).json({ error: 'Already purchased' });

  const purchase = await prisma.onlineCoursePurchase.create({
    data: { userId, onlineCourseId },
  });

  res.status(201).json(purchase);
};
