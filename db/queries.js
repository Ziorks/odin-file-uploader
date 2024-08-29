const prisma = require("./prismaClient");

async function createUser(username, password) {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
}

async function getUserFromUsername(username) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
}

async function getUserFromId(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

module.exports = { createUser, getUserFromUsername, getUserFromId };
