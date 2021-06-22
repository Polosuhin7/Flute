export const userMock = {
    'user/list/2': {
        "success": true,
        "error": 0,
        "data": {
            size: 25,
            total_elements: 3,
            total_pages: 1,
            empty: false,
            first: true,
            last: true,
            number: 0,
            number_of_elements: 3,
            "content": [
                {
                    "id": 2,
                    "title": "User 2",
                    "description": "",
                    "groups": [
                        {
                            "id": 1,
                            "title": "Операторы",
                            "description": "",
                            "member": "",
                            "acl": "*/admin/*",
                            "rules": [
                                "operator/list",
                                "operator/new",
                                "operator/edit",
                                "operator/remove"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    'user/list/1': {
        "success": true,
        "error": 0,
        "data": {
            size: 25,
            total_elements: 3,
            total_pages: 1,
            empty: false,
            first: true,
            last: true,
            number: 0,
            number_of_elements: 3,
            "content": [
                {
                    "id": 1,
                    "title": "User 1",
                    "description": "",
                    "groups": []
                }
            ]
        }
    },
    'user/list': {
        "success": true,
        "error": 0,
        "data": {
            size: 25,
            total_elements: 100,
            total_pages: 1,
            empty: false,
            first: true,
            last: true,
            number: 0,
            number_of_elements: 3,
            "content": [
                {
                    "id": 1,
                    "title": "User 1",
                    "description": "",
                    "groups": [
                        {
                            "id": 2,
                            "title": "Операторы",
                            "description": "",
                            "member": "",
                            "acl": "*/admin/*",
                            "rules": [
                                "operator/list",
                                "operator/new",
                                "operator/edit",
                                "operator/remove"
                            ]
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "User 2",
                    "description": "",
                    "groups": [
                        {
                            "id": 2,
                            "title": "Операторы",
                            "description": "",
                            "member": "",
                            "acl": "*/admin/*",
                            "rules": [
                                "operator/list",
                                "operator/new",
                                "operator/edit",
                                "operator/remove"
                            ]
                        }
                    ]
                },
            ]
        }
    }
}
