Feature: Create a new guide
    As a professor with guide permissions
    I want to create a new guide

    Scenario: A valid non existing guide
        When I send a PUT request to "/api/cma/guides/dc539c59-7439-4349-8937-9368b349d8e0" with body:
        """
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
        """
        Then the response status should be 202
        And the response content should be empty
