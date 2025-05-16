// src/routes/lecturerRoutes.js

import { Router } from 'express';
const router = Router();

import {
    createLecturerProfile,
    getAllLecturers,
    getLecturerById,
    updateLecturer,
    deleteLecturer
} from "../controllers/lecturerController.js";
import { authenticate, isAdmin } from "../middleware/authMiddleware.js";


router.get("/all", getAllLecturers);
router.get("/:id", getLecturerById);
router.post("/create", authenticate, isAdmin,createLecturerProfile);
router.put("/update/:id", authenticate, isAdmin,updateLecturer);
router.delete("/:id",authenticate, isAdmin, deleteLecturer);

export default router;
