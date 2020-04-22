/// <reference types="Cypress" />


describe("Site Pages", function() {

    beforeEach(function() {
        // reset the server database between tests
        cy.request('http://localhost:8010/api/reset');
    });

    describe("Main Page", function(){

        it("successfully loads", function() {
            cy.visit('http://localhost:8010/')
        })
        
        it("has links to views for observations and users", function() {
            cy.visit('http://localhost:8010/');
            cy.get("a[href='#!/users']");
            cy.get("a[href='#!/observations']");
            cy.get("a[href='#!/submit']");
        })

        it("contains a list of recent observations", function() {
            cy.visit('http://localhost:8010/');
            cy.contains("Recent Observations");
            // contains links to the most recent observations, check for a few
            cy.get("a[href='/#!/observations/17']")
            cy.get("a[href='/#!/observations/2']")
            cy.get("a[href='/#!/observations/1']")
            cy.get("a[href='/#!/observations/10']")
        })

        it("contains a list of users", function() {
            cy.visit('http://localhost:8010/');
            cy.contains("Users");
            cy.fixture('trees.json').then((json) => {

                for(let i=0; i<json.users.length; i++) {
                    let user = json.users[i];
                    cy.contains(user.first_name);
                    cy.contains(user.last_name);
                    cy.get("a[href='/#!/users/"+user.id+"']");
                }
            });
        });
    });

    describe("Observations page", function() {

        it("successfully loads", function() {
            cy.visit('http://localhost:8010/#!/observations');
        })

        it("contains a list of observations", function() {
            cy.visit('http://localhost:8010/#!/observations');
            cy.fixture('trees.json').then((json) => {

                for(let i=0; i<json.observations.length; i++) {
                    let observation = json.observations[i];
                    cy.get("a[href='/#!/observations/"+observation.id+"']")
                    .should("contain", observation.location)
                    .should("contain", observation.weather);                    
                }
            });
        })
    });

    describe("Users page", function() {

        it("successfully loads", function() {
            cy.visit('http://localhost:8010/#!/users');
        })

        it("contains a list of users", function() {
            cy.visit('http://localhost:8010/#!/users');
            cy.fixture('trees.json').then((json) => {
                for(let i=0; i<json.users.length; i++) {
                    let user = json.users[i];
                    cy.get("a[href='/#!/users/"+user.id+"']")
                    .should("contain", user.first_name)
                    .should("contain", user.last_name);                    
                }
            });
        })
    });

    describe("Individual User Page", function() {

        it("successfully loads", function() {
            cy.visit('http://localhost:8010/#!/users/1');
        })

        it("contains user details", function() {

            cy.fixture('trees.json').then((json) => {
                for(let i=0; i<json.users.length; i++) {
                    let user = json.users[i];

                    cy.visit('http://localhost:8010/#!/users/'+user.id);
                    cy.contains(user.first_name);
                    cy.contains(user.last_name);
                }
            });
        });

        it("contains a list of user observations", function(){

            let hazels = [17, 10, 28, 12, 7, 19, 11, 21];
            cy.visit('http://localhost:8010/#!/users/1');
            for(let i=0; i<hazels.length; i++) {
                cy.get("a[href='/#!/observations/"+hazels[i]+"']");
            }
        });
    });
});

