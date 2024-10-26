Feature: Rename an uc
    As an admin with uc permissions
    I want to change the name of an uc

    Scenario: A valid existing uc
        When I send a PUT request to "/api/cma/events/3b9fbc9e-9063-4235-814a-8714dcabbe55/rename" with body:
        """
        {
            "name": "matematica I"
        }
        """
        Then the response status should be 202
        And the response content should be empty
