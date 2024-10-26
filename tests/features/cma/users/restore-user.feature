Feature: Restore an user
    As an admin with user permissions
    I want to restore a user
    Scenario: A valid user id
        When I send a PUT request to "/api/cma/users/d8f2b711-61b6-4c2a-b3aa-c1e74ea6f0ee/restore" without body
        Then the response status should be 202
        And the response content should be empty
