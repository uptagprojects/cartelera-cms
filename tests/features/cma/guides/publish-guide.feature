Feature: Publish a guide
    As an admin with guide permissions
    I want to publish a guide
    Scenario: A valid guide id
        When I send a PUT request to "/api/cma/guides/dc539c59-7439-4349-8937-9368b349d8e0/publish" without body
        Then the response status should be 202
        And the response content should be empty
