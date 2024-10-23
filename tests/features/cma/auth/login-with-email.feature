Feature: Login authentication with email
    As a user without special permissions
    I want to login using my email and password

    Scenario: A valid user
        When I send a POST request to "/auth/local" with body:
        """
        {
            "email": "janedoe@example.com",
            "password": "Password$"
        }
        """
        Then the response status should be 202
        And the response content should be:
        """
        {
            "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzQwZjQwMzQ4MzQwMzQ4MzQwMzQ4MyIsImlhdCI6MTYzNjIwNjYwMiwiZXhwIjoxNjM2MjA2NjAyfQ.7",
            "user": {
                "id": "e45dab73-870e-4298-8d24-aef0f90f486c",
                "name": "Jane Doe",
                "email": "janedoe@example.com"
            }
        }
        """