Feature: Search users
    As a user without special permissions
    I want to list all users matching my criteria
    Scenario: A valid search criteria
        When I send a GET request to "/api/cma/users?name=Jane%20Doe"
        Then the response status should be 200
        And the response content should be:
        """
        [
            {
                "id": "3b9fbc9e-9063-4235-814a-8714dcabbe55",
                "name": "Jane Doe",
                "email": "janedoe@example.com",
                "locked": false,
                "creation": "2024-02-03T10:00:00Z"
            }
        ]
        """