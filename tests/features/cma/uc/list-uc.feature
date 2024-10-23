Feature: List all uc
    As a user without special permissions
    I want to list all uc
    Scenario: Having one uc
        When I send a GET request to "/api/cma/uc"
        Then the response status should be 200
        And the response content should be:
        """
        [
            {
                "id": "3b9fbc9e-9063-4235-814a-8714dcabbe55",
                "name": "matematicas",
                "creation": "2024-02-03T10:00:00Z"
            }
        ]
        """