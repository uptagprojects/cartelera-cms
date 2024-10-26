Feature: Change user password
    As an user without special permissions
    I want to change my own password

    Scenario: A valid authenticated user
        When I send a PUT request to "/api/cma/users/me/password" with body:
        """
        {
            "password": "secret"
        }
        """
        Then the response status should be 202
        And the response content should be empty