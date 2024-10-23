Feature: Create a new event
    As an admin with event permissions
    I want to create a new event

    Scenario: A valid non existing event
        When I send a PUT request to "/api/cma/events/10158325-f219-4622-8b9a-1c4a84df8dc2" with body:
        """
        {
            "id": "10158325-f219-4622-8b9a-1c4a84df8dc2",
            "name": "Jornada de validaciones I",
            "description": "Las validaciones para trayecto 1. Por favor llevar dos copias de los instrumentos de validación llenados.",
            "datetime": "2024-02-03T08:00:00.000Z",
            "location": "Salón de usos múltiples",
            "creation": "2024-02-03T10:00:00Z"
        }
        """
        Then the response status should be 202
        And the response content should be empty
