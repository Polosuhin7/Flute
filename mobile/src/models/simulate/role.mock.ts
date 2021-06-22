export const roleMock = {
    "role/list/2": {
        success: true,
        error: 0,
        data: {
            size: 25,
            total_elements: 3,
            total_pages: 1,
            empty: false,
            first: true,
            last: true,
            number: 0,
            number_of_elements: 3,
            content: [
                { id: 2, title: "Client", description: "top best", active: false },
            ],
        },
    },
    "role/list/1": {
        success: true,
        error: 0,
        data: {
            size: 25,
            total_elements: 3,
            total_pages: 1,
            empty: false,
            first: true,
            last: true,
            number: 0,
            number_of_elements: 3,
            content: [
                { id: 1, title: "Admin", description: "top best", active: true },
            ],
        },
    },
    "role/list": {
        success: true,
        error: 0,
        data: {
            size: 25,
            total_elements: 3,
            total_pages: 1,
            empty: false,
            first: true,
            last: true,
            number: 0,
            number_of_elements: 3,
            content: [
                { id: 1, title: "Admin", description: "top best", active: true },
                { id: 2, title: "Client", description: "top best", active: false },
                { id: 3, title: "User", description: "top best", active: true },
            ],
        },
    },
};
