// src/controllers/lecturerController.js

import { prisma } from "../prisma/client.js";

export const createLecturerProfile = async (req, res) => {
  try {
    const { userId, bio, subject, photoUrl } = req.body;

    // Check if user exists and is a lecturer
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

    if (!user || user.role !== 'lecturer') {
      return res.status(400).json({ message: "Invalid lecturer user ID." });
    }

    // Prevent duplicate profile creation
    const existing = await prisma.lecturer.findUnique({ where: { userId: user.id } });
    if (existing) {
      return res.status(400).json({ message: "Lecturer profile already exists." });
    }

    const lecturer = await prisma.lecturer.create({
      data: {
        userId: user.id,
        bio,
        subject,
        photoUrl
      }
    });

    res.status(201).json({ message: "Lecturer profile created", lecturer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error(while creating lecturer" });
  }
};


// GET ALL lecturers
export const getAllLecturers = async (req, res) => {
  try {
    const lecturers = await prisma.lecturer.findMany({
      include: { user: true }
    });
    res.json(lecturers);
  } catch (err) {
    res.status(500).json({ message: "Server error(while fetching all lecturers" });
  }
};

// GET lecturer by ID
export const getLecturerById = async (req, res) => {
  try {
    const { id } = req.params;
    const lecturer = await prisma.lecturer.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }

    res.json(lecturer);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching lecturer by id" });
  }
};

// UPDATE lecturer profile
export const updateLecturer = async (req, res) => {
  try {
    const { id } = req.params;
    const { bio, subject, photoUrl } = req.body;

    const updated = await prisma.lecturer.update({
      where: { id },
      data: { bio, subject, photoUrl }
    });

    res.json({ message: "Lecturer updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Server error or lecturer not found" });
  }
};

// DELETE lecturer profile
export const deleteLecturer = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.lecturer.delete({
      where: { id }
    });

    res.json({ message: "Lecturer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error or lecturer not found" });
  }
};

