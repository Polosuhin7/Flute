export const authMock = {
    '/api/auth/login': {
        "success": true,
        "error": 0,
        "message": ""
    },
    '/api/auth/logoff': {
        "success": true,
        "error": 0,
    },
    '/api/auth/information': {
        "success": true,
        "error": 0,
        "message": "",
        "data": {
            "id": 1,
            "login": "admin",
            "description": "",
            "email": "",
            "active": true,
            "groups": []
        }
    }

}
