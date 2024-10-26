Feature: remove a uc
    As an user with guide permissions
    I want to remove a guide
    Scenario: A valid uc id
        When I send a DELETE request to "/api/cma/uc/3b9fbc9e-9063-4235-814a-8714dcabbe55"
        Then the response status should be 202
        And the response content should be empty
