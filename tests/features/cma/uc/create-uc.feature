Feature: Create a new uc
    As an admin with uc permissions
    I want to create a new uc

    Scenario: A valid non existing uc
        When I send a PUT request to "/api/cma/uc/3b9fbc9e-9063-4235-814a-8714dcabbe55" with body:
        """
        {
            "id": "3b9fbc9e-9063-4235-814a-8714dcabbe55",
            "name": "matematicas",
            "creation": "2024-02-03T10:00:00Z"
        }
        """
        Then the response status should be 201
        And the response content should be empty
