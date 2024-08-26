const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("seeding...");
  console.log("done");
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });

//run this file once to create tables and/or add data to a database
