Feature: Find a schedule
    As a user without special permissions
    I want to find a schedule by their id
    Scenario: A valid schedule id
        When I send a GET request to "/api/cma/schedules/d8f2b711-61b6-4c2a-b3aa-c1e74ea6f0ee"
        Then the response status should be 200
        And the response content should be:
        """
        {
            "id": "d8f2b711-61b6-4c2a-b3aa-c1e74ea6f0ee",
            "name": "Horarios 2024-2",
            "attachments": [
                {
                    "id": "d8f2b711-61b6-4c2a-b3aa-c1e74ea6f0ee",
                    "name": "Horario del Laboratorio 01",
                    "url": "https://example.com/horarios-2024-2-12.pdf"
                },
                {
                    "id": "d8f2b711-61b6-4c2a-b3aa-c1e74ea6f0ee",
                    "name": "Horario del Laboratorio 04",
                    "url": "https://example.com/horarios-2024-2-12.pdf"
                },
                {
                    "id": "d8f2b711-61b6-4c2a-b3aa-c1e74ea6f0ee",
                    "name": "Horario Seccion 13",
                    "url": "https://example.com/horarios-2024-2-13.pdf"
                }
            ],
            "status": "draft",
            "creation": "2024-02-03T10:00:00Z"
        }
        """