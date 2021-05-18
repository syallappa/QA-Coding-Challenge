import apiData  from "../fixtures/apiData";
//cy.log(apiData);
context("todo tests", () => {
  describe("filters", () => {
    it("'All' should be the default filter", () => {
      cy.visitTodos()
      cy.get(".selected")
        .contains("All");
    });
  });
  // write remaining tests here

  //clear completed appears
  describe("ClearCompleted", () => {
    it("When atleast one task is completed, it should show clear completed button", () => {
      cy.visitTodos()
      cy.get('.toggle').click()
      cy.contains("Clear completed");
 
     });
    });

  //Active
  describe("IsActive", () => {
    it("When completed is clicked,s hould show only active ones", () => {
      cy.visitTodos()
      cy.get(".selected").click()
      cy.contains("Active");
    });
  });
  //Completed
  describe("IsCompleted", () => {
    it("When completed is clicked,should show only completed ones", () => {
      cy.visitTodos()
      cy.get(".selected").click()
      cy.contains("Completed");

    });
  });



  describe("IsApiError", () => {
    it("RestAPI throws 500", () => {
      cy.request({
        method: 'POST', url: `${apiData.baseUrl}${apiData.postData.url}`, body:
        apiData.postData,
        failOnStatusCode: false
      }).then((res) => {
        cy.log(`${apiData.baseUrl}${apiData.postData.url}`);
        cy.log(JSON.stringify(res));
        expect(res.status).to.eq(500)
      });

    });
  });



  //Post new resource
  describe("SuccesfulPost", () => {
    it("RestAPI works correctly", () => {
      cy.request({
        method: 'POST', url: `${apiData.baseUrl}${apiData.postData.url}`, body:
       apiData.postData,
        failOnStatusCode: false
      }).then((res) => {
        cy.log(JSON.stringify(res));
        expect(res.status).to.eq(201)
      });
    });
  });

  //Get the resource successfully
  describe("Get Successfully", () => {
    it("RestAPI should bring back the data", () => {

      cy.request({
        method: 'POST', url: `${apiData.baseUrl}${apiData.postData.url}`, body:
        apiData.postData,
        failOnStatusCode: false
      }).then((res) => {
        cy.log(JSON.stringify(res));
        cy.request({
          method: 'GET', url: `${apiData.baseUrl}${apiData.postData.url}${response.body.results[0].order}`,
          failOnStatusCode: false
        }).then((res) => {
          cy.log(JSON.stringify(res));
          expect(res.status).to.eq(200)
        });
        //expect(res.status).to.eq(201)
      });
    });
  });


  //update the resource successfully
  describe("Update Successfully", () => {
    it("RestAPI should update the data", () => {
      cy.request({
        method: 'PUT', url: apiData.putData.url,
        body: apiData.putData,
        failOnStatusCode: false
      }).then((res) => {
        cy.request({
          method: 'GET', url: apiData.putData.url,
          failOnStatusCode: false
        }).then((res) => {
          cy.log(JSON.stringify(res));
          expect(response.body.results[0].completed).to.eq(apiData.putData.completed);
        });

        expect(res.status).to.eq(200)
      });
    });
  });

   //Delete the resource successfully
   describe("Get Successfully", () => {
    it("RestAPI should delete the data", () => {
      cy.request({
        method: 'DELETE', url: `${apiData.baseUrl}${apiData.deleteData.url}${apiData.deleteData.order}`,
        failOnStatusCode: false
      }).then((res) => {
        cy.log(JSON.stringify(res));
        expect(res.status).to.eq(204)
      });
    });
  });


  //should throw 400
  describe("BadRequest", () => {
    it("RestAPI throws 400", () => {
      cy.request({
        method: 'POST', url: `${apiData.baseUrl}${apiData.postData.url}`, body:
        {
          "Idontknow": "Can I Take the dog for a walk"
        },
        failOnStatusCode: false
      }).then((res) => {

        cy.log(JSON.stringify(res));
        expect(res.status).to.eq(400)
      });
    });
  });


  //should throw Resource Not Found.
  describe("ResourceNotFound", () => {
    it("RestAPI throws 404", () => {
      cy.request({
        method: 'GET', url: 'http://todo-backend-typescript.herokuapp.com/BAdUrl',
        failOnStatusCode: false
      }).then((res) => {

        cy.log(JSON.stringify(res));
        expect(res.status).to.eq(404)
      });
    });
  });

});