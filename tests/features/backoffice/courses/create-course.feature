Feature: Create a new course
    As a user with professor permissions
    I want to create a course

    Scenario: A valid non existing course
        When I send a PUT request to "/api/manage/courses/5d16fd83-7b22-417e-8301-187036193946" with body:
        """
        {
            "id": "5d16fd83-7b22-417e-8301-187036193946",
            "name": "Curso PHP Basico",
            "start_date": "2024-02-03",
            "finish_date": "2024-02-05",
            "duration": "PT12H",
            "periods": [
                "2024-02-03T12:00:00/2024-02-03T16:00:00",
                "2024-02-04T12:00:00/2024-02-04T16:00:00",
                "2024-02-05T12:00:00/2024-02-05T16:00:00"
            ]
        }
        """
        Then the response status should be 202
        And the response should be empty
