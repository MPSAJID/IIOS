const z = require('zod');

 const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['admin', 'lecturer', 'student']).optional(),
  });
  
   const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  module.exports = {
    registerSchema,
    loginSchema,
  };