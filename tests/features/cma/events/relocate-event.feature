Feature: Relocate an event
    As an admin with event permissions
    I want to change the location of an event

    Scenario: A valid existing event
        When I send a PUT request to "/api/cma/events/10158325-f219-4622-8b9a-1c4a84df8dc2/relocate" with body:
        """
        {
            "location": "AI01"
        }
        """
        Then the response status should be 202
        And the response content should be empty
