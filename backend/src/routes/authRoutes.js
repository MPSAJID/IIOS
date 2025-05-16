import { Router } from 'express';
const router = Router();

const { register, login, logout } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


module.exports = router;

// auth routes used for authentication related operations
// such as login, logout, and registration      


