const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
module.exports = prisma;
//prisma client is used to interact with the database. it is stored here to be used in the controllers. 