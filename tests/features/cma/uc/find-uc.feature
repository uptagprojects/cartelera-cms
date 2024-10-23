Feature: Find an uc
    As a user without special permissions
    I want to find a uc by their id
    Scenario: A valid uc id
        When I send a GET request to "/api/cma/uc/3b9fbc9e-9063-4235-814a-8714dcabbe55"
        Then the response status should be 200
        And the response content should be:
        """
        {
            "id": "3b9fbc9e-9063-4235-814a-8714dcabbe55",
            "name": "matematicas",
            "creation": "2024-02-03T10:00:00Z"
        }
        """