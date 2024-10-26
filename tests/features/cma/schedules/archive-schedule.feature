Feature: Archive a schedule
    As an admin with schedule permissions
    I want to archive a schedule
    Scenario: A valid schedule id
        When I send a PUT request to "/api/cma/schedules/d8f2b711-61b6-4c2a-b3aa-c1e74ea6f0ee/archive" without body
        Then the response status should be 202
        And the response content should be empty
