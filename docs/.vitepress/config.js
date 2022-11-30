import { version } from '../../package.json'

export default {
    title: 'Light-scrollbar docs',
    description: '@frsource/light-scrollbar minimalistic light plugin to create custom scrollbar',
    lastUpdated: true,
    base: '/light-scrollbar/',
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/FRSOURCE/vitepress/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/FRSOURCE' },
            { icon: 'facebook', link: 'https://facebook.com/FRSOURCE' },
            { icon: 'instagram', link: 'https://instagram.com/frsource' },
            { icon: 'linkedin', link: 'https://linkedin.com/in/jakub-freisler-03a32138/' },
            { icon: 'twitter', link: 'https://twitter.com/frsource1' }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present FRSOURCE - Szymon Dziewoński'
        },
        nav: [
            {   text: 'Api', link: '/api' },
            {
                text: version,
                items: [{
                    text: 'Changelog',
                    link: 'https://github.com/FRSOURCE/light-scrollbar/blob/main/CHANGELOG.md'
                },
                {
                    text: 'Issues',
                    link: 'https://github.com/FRSOURCE/light-scrollbar/issues'
                }]
            }
        ],
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Instalation', link: '/instalation' },
                ]
            },
            { ...apiNav(), link: '/api', },
            {
                text: 'Examples',
                items: [
                    { text: 'Default', link: '/examples/default' },
                    { text: 'WrapperOutside', link: '/examples/wrapperOutside' },
                    { text: 'ShowOnHover', link: '/examples/showOnHover' },
                ]
            }
        ]
    }
}

function apiNav() {
    return {
        text: 'Api',
        items: [{
            text: 'attach', link: '/api/attach', items: [
                { text: 'arguments', link: '/api/attach/arguments' },
                { text: 'returns', link: '/api/attach/returns' },
            ]
        }, {
            text: 'detach', link: '/api/detach'
        }]
    }
}
