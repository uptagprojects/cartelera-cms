Feature: Find a course
    As a user without special permissions
    I want to find a course by their id
    Scenario: A valid course id
        When I send a GET request to "/api/courses/d2a7b983-c56e-49ac-b0c6-682499da4411"
        Then the response status should be 200
        And the response content should be:
        """
        {
            "id": "d2a7b983-c56e-49ac-b0c6-682499da4411"
        }
        """