Feature: Change an user avatar

    Scenario: A valid existing user
        As an admin with user permissions
        I want to change the avatar of an user
        When I send a PUT request to "/api/cma/users/ec52686a-5241-4cc3-835a-2ab254d67bfb/avatar" with body:
        """
        {
            "avatar": "https://example.com/avatar.jpg"
        }
        """
        Then the response status should be 202
        And the response content should be empty
    
    Scenario: A valid authenticated user
        As an user without special permissions
        I want to change my name
        When I send a PUT request to "/api/cma/users/me/avatar" with body:
        """
        {
            "avatar": "https://example.com/avatar.jpg"
        }
        """
        Then the response status should be 202
        And the response content should be empty