Feature: Search available courses
    As a user without special permissions
    I want to search all available courses
    Scenario: A valid course id
        When I send a GET request to "/api/courses/"
        Then the response status should be 200
        And the response content should be:
        """
        [
            {
                "id": "5d16fd83-7b22-417e-8301-187036193946",
                "name": "Curso PHP Basico",
                "abstract": "Aprenderemos todo sobre PHP",
                "start_date": "2024-02-03",
                "finish_date": "2024-02-05",
                "duration": "PT12H",
                "periods": [
                    "2024-02-03T12:00:00/2024-02-03T16:00:00",
                    "2024-02-04T12:00:00/2024-02-04T16:00:00",
                    "2024-02-05T12:00:00/2024-02-05T16:00:00"
                ],
                "picture": "https://fastly.picsum.photos/id/649/600/400.jpg?hmac=DYo_ps60GePCKwwn_W6ufVKyMoROAraGIBEjuL5y-c4",
                "instructor": {
                    "name": "Juan Perez",
                    "badge": "Senior PHP Developer para Shoppi",
                    "avatar": "https://avatar.iran.liara.run/public/7",
                    "related_url": "https://dev.to/juanperez"
                },
                "available_seats": 20,
                "online": false,
                "location": "laboratorio 04",
                "price": 400.0
            }
        ]
        """