Feature: Rename an event
    As an admin with event permissions
    I want to change the name of an event

    Scenario: A valid existing event
        When I send a PUT request to "/api/cma/events/0891322c-5ba5-4209-9f17-d0ed1710a55a/rename" with body:
        """
        {
            "name": "Foro de tecnologías de la información 2024"
        }
        """
        Then the response status should be 202
        And the response content should be empty
