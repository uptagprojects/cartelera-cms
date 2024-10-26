Feature: Reschedule an event
    As an admin with event permissions
    I want to change the date of an event

    Scenario: A valid existing event
        When I send a PUT request to "/api/cma/courses/10158325-f219-4622-8b9a-1c4a84df8dc2/reschedule" with body:
        """
        {
            "datetime": "2024-02-03T09:30:00.000Z"
        }
        """
        Then the response status should be 202
        And the response content should be empty
