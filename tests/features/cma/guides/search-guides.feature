Feature: Search guides
    As a user without special permissions
    I want to list all guides matching my criteria
    Scenario: A valid search criteria
        When I send a GET request to "/api/cma/guides?status=draft"
        Then the response status should be 200
        And the response content should be:
        """
        [
            {
                "id": "dc539c59-7439-4349-8937-9368b349d8e0",
                "title": "CSS Container Queries",
                "uc": {
                    "id": "ec52686a-5241-4cc3-835a-2ab254d67bfb",
                    "name": "programacion II"
                },
                "content": "## Aprende a usar las queries de contenedores en CSS",
                "attachments": [
                    {
                        "id": "4f542aa5-6c5e-403e-91dc-764a5a7062d6",
                        "name": "CSS Container Queries Archive",
                        "url": "https://www.w3.org/TR/css-contain-3/"
                    }
                ],
                "status": "draft",
                "creation": "2024-02-03T10:00:00Z"
            }
        ]
        """