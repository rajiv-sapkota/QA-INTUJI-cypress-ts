import { generateFakeuser } from "../../fakerData/data";
const user = generateFakeuser();

export class ApiPage {
  token =
    "Bearer 28cf32bd646230d7ca6cfcc2df95eadf3730368ddbe4d6ef358d030c5adb227a";

  userDetails = {
    name: user.username,
    gender: "male",
    email: user.email,
    status: "active",
  };

  updatedUser = {
    name: user.firstName,
    email: user.email,
    gender: "male",
    status: "active",
  };

  baseUrl = "https://gorest.co.in/public/v2/users";

  getRequest() {
    return cy.request("GET", this.baseUrl);
  }

  postRequest() {
    return cy.request({
      method: "POST",
      url: this.baseUrl,
      headers: {
        Authorization: this.token,
      },
      body: this.userDetails,
    });
  }
}
