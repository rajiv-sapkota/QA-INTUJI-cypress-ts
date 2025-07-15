import { generateFakeuser } from "../fakerData/data";

const user = generateFakeuser();

const userDetails = {
  name: user.username,
  gender: "male",
  email: user.email,
  status: "active",
};

const updatedUser = {
  name: user.firstName,
  email: user.email,
  gender: "male",
  status: "active",
};


const baseUrl = "https://gorest.co.in/public/v2/users";

const token =
  "Bearer 28cf32bd646230d7ca6cfcc2df95eadf3730368ddbe4d6ef358d030c5adb227a";



describe("API Testing Using Cypress for GoRest API", () => {
  it("TC-API-101: should get all the users", () => {
    cy.request("GET", baseUrl).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body[0]).to.have.all.keys(
        "id",
        "name",
        "gender",
        "email",
        "status"
      );
    });
  });

  it("TC-API-102: should post and verify user id is in response", () => {
    cy.request({
      method: "POST",
      url: baseUrl,
      headers: {
        Authorization: token,
      },
      body: userDetails,
    }).then((response) => {
        const userID=response.body.id
        expect(response.status).to.equal(201)
        expect(response.body).to.have.all.keys("id", "name", "email", "gender", "status")
        expect(response.body.id).to.equal(userID)
        expect(response.body.name).to.equal(user.username)
        expect(response.body.email).to.equal(user.email)
        expect(response.body.status).to.equal(userDetails.status)
    
    })

 });
    
    it("TC-API-103: should edit user details using PATCH request", () => {
        
        const updatedUser = {
          name: user.firstName,
          email:user.email
        };
        
        cy.request({
          method: "PATCH",
          url: baseUrl + "/" + 8005636,
          headers: {
            Authorization: token,
          },
          body: updatedUser
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("name", updatedUser.name)
            expect(response.body).to.have.property("email", updatedUser.email);
        });
    })

    it("TC-API-104: should edit user details using PUT request", () => {
    

      cy.request({
        method: "PUT",
        url: baseUrl + "/" + 8005636,
        headers: {
          Authorization: token,
        },
        body: updatedUser,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.include(updatedUser)
      });
    });

    it.only("TC-API-105: should delete user id", () => {
      cy.request({
        method: "DELETE",
        url: baseUrl + "/" + 8005635,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });


    

  
})
