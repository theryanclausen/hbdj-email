import { faker } from "@faker-js/faker";

export const dataBuilder = (length) =>
  Array(length)
    .fill("aa")
    .map(() => ({
      sender: faker.internet.email(undefined, undefined, "parcelout.biz"),
      subject: faker.company.bs(),
      body: faker.hacker.phrase(),
      flag: faker.helpers.arrayElement([
        "error",
        "warning",
        "warning",
        "warning",
        "warning",
        "warning",
        "",
        "",
      ]),
    }));
