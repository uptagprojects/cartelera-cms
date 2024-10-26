Feature: Edit guide content
    As an user with guide permissions
    I want to change the content of a guide
    Scenario: A valid guide id
        When I send a PUT request to "/api/cma/guides/dc539c59-7439-4349-8937-9368b349d8e0/edit/content" with body:
        """
        {
            "content": "This is the new content of the guide"
        }
        """
        Then the response status should be 202
        And the response content should be empty
