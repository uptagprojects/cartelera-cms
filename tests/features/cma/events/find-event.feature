Feature: Find an event
    As a user without special permissions
    I want to find an event by their id
    Scenario: A valid event id
        When I send a GET request to "/api/cma/events/10158325-f219-4622-8b9a-1c4a84df8dc2"
        Then the response status should be 200
        And the response content should be:
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