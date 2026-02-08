export const ValidationRules = {
    nickname: {
        minLength: 3,
        maxLength: 30,
        pattern: /^[a-zA-Z0-9_.]+$/,
    },
    group: {
        name: {
            minLength: 3,
            maxLength: 50,
        },
        description: {
            maxLength: 500,
        },
    },
    post: {
        text: {
            maxLength: 1000,
        },
    },
    MIN_VIP_PRICE: 1.00,
};