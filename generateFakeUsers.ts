// generate-fake-user.ts
import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

const user = {
  username: faker.internet.username(),
  password: faker.internet.password({ length: 12 }),
};

writeFileSync("cypress/fixtures/loginData.json", JSON.stringify(user, null, 2));

console.log("✅ Faker user written to cypress/fixtures/loginUser.json");
