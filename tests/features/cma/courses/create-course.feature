Feature: Create a new course
    As a user with professor permissions
    I want to create a course

    Scenario: A valid non existing course
        When I send a PUT request to "/api/manage/courses/5d16fd83-7b22-417e-8301-187036193946" with body:
        """
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
                "email": "juanperez@example.com",
                "related_url": "https://dev.to/juanperez"
            },
            "total_seats": 20,
            "occupied_seats": 0,
            "online": false,
            "location": "laboratorio 04",
            "price": 400.0,
            "time": "2024-01-04T09:43:15.030Z"
        }
        """
        Then the response status should be 202
        And the response should be empty
