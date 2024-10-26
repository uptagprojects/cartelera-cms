Feature: Create a new course
    As an admin with course permissions
    I want to create a course

    Scenario: A valid non existing course
        When I send a PUT request to "/api/cma/courses/5d16fd83-7b22-417e-8301-187036193946" with body:
        """
        {
            "id": "5d16fd83-7b22-417e-8301-187036193946",
            "name": "Curso PHP Basico",
            "abstract": "Aprenderemos todo sobre PHP",
            "picture": "https://fastly.picsum.photos/id/649/600/400.jpg?hmac=DYo_ps60GePCKwwn_W6ufVKyMoROAraGIBEjuL5y-c4",
            "instructor": {
                "name": "Juan Perez",
                "badge": "Senior PHP Developer para Shoppi",
                "avatar": "https://avatar.iran.liara.run/public/7",
                "related_url": "https://dev.to/juanperez"
            },
            "total_seats": 0,
            "location": "laboratorio 04",
            "price": 400.0,
            "duration": {
                "start_date": "2024-02-03",
                "finish_date": "2024-02-05",
                "total_hours": 12
            },
            "creation": "2024-02-03T10:00:00Z"
        }
        """
        Then the response status should be 201
        And the response content should be empty
