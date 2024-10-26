Feature: Rename a course
    As an admin with course permissions
    I want to change the name of a course

    Scenario: A valid existing course
        When I send a PUT request to "/api/cma/courses/5d16fd83-7b22-417e-8301-187036193946/rename" with body:
        """
        {
            "name": "Curso PHP Avanzado"
        }
        """
        Then the response status should be 202
        And the response content should be empty
