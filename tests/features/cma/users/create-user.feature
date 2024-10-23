Feature: Create a new user
    As an admin with user permissions
    I want to create a new user

    Scenario: A valid non existing user
        When I send a PUT request to "/api/cma/users/3b9fbc9e-9063-4235-814a-8714dcabbe55" with body:
        """
        {
            "id": "3b9fbc9e-9063-4235-814a-8714dcabbe55",
            "name": "Jane Doe",
            "email": "janedoe@example.com",
            "password": "SECRET PASSWORD FOR THIS USER",
            "locked": false,
            "creation": "2024-02-03T10:00:00Z"
        }
        """
        Then the response status should be 202
        And the response content should be empty
