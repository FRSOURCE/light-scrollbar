module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:eslint-comments/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    plugins: [
        '@typescript-eslint',
        'eslint-comments'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/indent': ['error', 2],
        'semi': 2
    },
    overrides: [
        {
            files: [
                'cypress/**/*.{spec,pageObject}.ts',
            ],
            rules: {
                '@typescript-eslint/indent': ['error', 2],
                'jest/valid-expect-in-promise': 'off',
                'jest/no-duplicate-hooks': 'off',
                '@typescript-eslint/no-namespace': 'off',
                '@typescript-eslint/ban-ts-ignore': 'off',
            },
            plugins: ['cypress'],
        },
    ],
};
