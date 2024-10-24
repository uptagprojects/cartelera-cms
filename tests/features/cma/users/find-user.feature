Feature: Find an user
    Scenario: A valid user id
        As a user without special permissions
        I want to find an user by their id
        When I send a GET request to "/api/cma/users/3b9fbc9e-9063-4235-814a-8714dcabbe55"
        Then the response status should be 200
        And the response content should be:
        """
        {
            "id": "3b9fbc9e-9063-4235-814a-8714dcabbe55",
            "name": "Jane Doe",
            "email": "janedoe@example.com",
            "avatar": "https://example.com/janedoe.jpg",
            "status": "active",
            "creation": "2024-02-03T10:00:00Z"
        }
        """

    Scenario: A valid authenticated user
        As a user without special permissions
        I want to find my own user
        When I send a GET request to "/api/cma/users/me"
        Then the response status should be 200
        And the response content should be:
        """
        {
            "id": "3b9fbc9e-9063-4235-814a-8714dcabbe55",
            "name": "My User",
            "email": "myuser@example.com",
            "avatar": "https://example.com/janedoe.jpg",
            "status": "active",
            "creation": "2024-02-03T10:00:00Z"
        }
        """