Feature: Remove an event
    As an admin with event permissions
    I want to remove an event by their id
    Scenario: A valid event id
        When I send a DELETE request to "/api/cma/events/10158325-f219-4622-8b9a-1c4a84df8dc2"
        Then the response status should be 202
        And the response content should be empty
