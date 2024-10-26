Feature: Create a new schedule
    As an admin with schedule permissions
    I want to create a new schedule

    Scenario: A valid non existing schedule
        When I send a PUT request to "/api/cma/schedules/d8f2b711-61b6-4c2a-b3aa-c1e74ea6f0ee" with body:
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
        Then the response status should be 201
        And the response content should be empty
