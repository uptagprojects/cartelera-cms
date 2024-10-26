Feature: Change password
    As a user without special permissions
    I want to change my password by using a token

    Scenario: A valid user
        When I send a POST request to "/auth/password/change" with body:
        """
        {
            "password": "Password$$"
        }
        """
        Then the response status should be 202
        And the response content should be empty