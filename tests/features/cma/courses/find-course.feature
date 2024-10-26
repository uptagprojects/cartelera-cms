Feature: Find a course
    As a user without special permissions
    I want to find a course by their id
    Scenario: A valid course id
        When I send a GET request to "/api/cma/courses/5d16fd83-7b22-417e-8301-187036193946"
        Then the response status should be 200
        And the response content should be:
        """
        {
            "id": "5d16fd83-7b22-417e-8301-187036193946",
            "name": "Curso PHP Basico",
            "abstract": "Aprenderemos todo sobre PHP",
            "duration": {
                "start_date": "2024-02-03",
                "finish_date": "2024-02-05",
                "total_hours": 12
            },
            "picture": "https://fastly.picsum.photos/id/649/600/400.jpg?hmac=DYo_ps60GePCKwwn_W6ufVKyMoROAraGIBEjuL5y-c4",
            "instructor": {
                "name": "Juan Perez",
                "badge": "Senior PHP Developer para Shoppi",
                "avatar": "https://avatar.iran.liara.run/public/7",
                "related_url": "https://dev.to/juanperez"
            },
            "available_seats": 20,
            "location": "laboratorio 04",
            "price": 400.0
        }
        """