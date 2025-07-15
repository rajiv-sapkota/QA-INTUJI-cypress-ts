import { generateFakeuser } from "../fakerData/data";

const user = generateFakeuser();

const userDetails = {
  name: user.firstName,
  email: user.email,
  gender: "male",
  status: "active",
};

const token =
  "Bearer 28cf32bd646230d7ca6cfcc2df95eadf3730368ddbe4d6ef358d030c5adb227a";

const baseUrl = "https://gorest.co.in/public/v2/users";

describe("E2E API test for GOREST API / USERS", () => {
  it("TC-101: Should execute E2E API test for GOREST API / USERS", () => {
   
      //getting all users
    cy.log("Getting all Users");
    cy.request({
      method: "GET",
      url: baseUrl,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });

    //posting a user
    cy.log("Posting a User");
    cy.request({
      method: "POST",
      url: baseUrl,
      headers: {
        Authorization: token,
      },
      body: userDetails,
    }).then((response) => {
      expect(response.status).to.equal(201);
      const userID = response.body.id;

      //getting posted user
      cy.log("Getting Created User Details");
      cy.request({
        method: "GET",
        url: `${baseUrl}/${userID}`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });

      //editing user
      cy.log("Editing Name and Email");
      cy.request({
        method: "PATCH",
        url: `${baseUrl}/${userID}`,
        headers: {
          Authorization: token,
        },
        body: {
          name: userDetails.name,
          email: userDetails.email,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
        
        //deleting user
        cy.log("Deleting User")
        cy.request({
          method: "DELETE",
          url: `${baseUrl}/${userID}`,
          headers: {
            Authorization: token,
          }
        }).then((response) => {
            expect(response.status).to.equal(204)
        });
    });
  });
});


