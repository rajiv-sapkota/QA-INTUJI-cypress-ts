// generate-fake-user.ts
import { faker } from "@faker-js/faker";


export function generateFakeuser (){
  username: faker.internet.username()
  password: faker.internet.password({ length: 12 })
};
