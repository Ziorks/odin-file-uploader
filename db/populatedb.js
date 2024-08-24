require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS exampleTable (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    exampleColumn VARCHAR ( 255 )
);

INSERT INTO exampleTable (exampleColumn)
VALUES
    ('value1'),
    ('value2');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL, //postgresql://<roleName>:<rolePassword>@localhost:<databasePort>/<databaseName>
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

//run this file once to create tables and/or add data to a database
