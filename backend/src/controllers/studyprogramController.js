const prisma = require('../prisma/client');

// GET all study programs
exports.getAllStudyPrograms = async (req, res) => {
  const programs = await prisma.course.findMany({ include: { lecturer: true } });
  res.json(programs);
};

// GET one
exports.getStudyProgramById = async (req, res) => {
  const program = await prisma.course.findUnique({
    where: { id: req.params.id },
    include: { lecturer: true },
  });
  if (!program) return res.status(404).json({ error: 'Not found' });
  res.json(program);
};

// POST create
exports.createStudyProgram = async (req, res) => {
  const { title, description, duration, lecturerId } = req.body;
  const program = await prisma.course.create({
    data: { title, description, duration, lecturerId },
  });
  res.status(201).json(program);
};

// PUT update
exports.updateStudyProgram = async (req, res) => {
  const program = await prisma.course.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(program);
};

// DELETE
exports.deleteStudyProgram = async (req, res) => {
  await prisma.course.delete({ where: { id: req.params.id } });
  res.json({ message: 'Deleted' });
};
