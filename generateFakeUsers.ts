// generate-fake-user.ts
import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

const user = {
  username: faker.internet.username(),
  password: faker.internet.password({ length: 12 }),
};


