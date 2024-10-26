Feature: Change user email

    Scenario: A valid existing user
        As an user with organization admin permissions
        I want to change the email of an user
        When I send a PUT request to "/api/cma/users/3b9fbc9e-9063-4235-814a-8714dcabbe55/email" with body:
        """
        {
            "email": "susanamedina@example.com"
        }
        """
        Then the response status should be 202
        And the response content should be empty

    Scenario: A valid authenticated user
        As an user without special permissions
        I want to change my own email
        When I send a PUT request to "/api/cma/users/me/email" with body:
        """
        {
            "email": "myemail@example.com"
        }
        """
        Then the response status should be 202
        And the response content should be empty