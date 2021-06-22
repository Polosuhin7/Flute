export const menuMock = {
    '/api/menu/list/3': {
        "success": true,
        "error": 0,
        "data": [
            {
                id: 3,
                title: 'Банковские услуги',
                description: "Карты, Выпуск карт",
                row: 1,
                column: 1,
                type: 2,
                children: [],
            },
        ]
    },
    '/api/menu/list/4': {
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
                    id: 4,
                    title: 'Депозитарий',
                    description: "",
                    row: 1,
                    column: 2,
                    type: 2,
                    children: [],
                },
            ]
        }
    },
    '/api/menu/list': {
        "success": true,
        "error": 0,
        "data": [
            {
                id: 1,
                title: 'Физические лица',
                description: "Раздел для физических лиц",
                row: 1,
                column: 1,
                type: 1,
                children: [
                    {
                        id: 3,
                        title: 'Банковские услуги',
                        description: "Карты, Выпуск карт",
                        row: 1,
                        column: 1,
                        type: 2,
                        children: [],
                    },
                    {
                        id: 4,
                        title: 'Депозитарий',
                        description: "",
                        row: 1,
                        column: 2,
                        type: 2,
                        children: [],
                    },
                ],
            },
            {
                id: 2,
                title: 'Юридические лица',
                description: "Раздел для юр.лиц",
                row: 1,
                column: 2,
                type: 1,
                children: [],
            }
        ]
    }
}
