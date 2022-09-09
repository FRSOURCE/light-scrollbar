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
            { icon: 'facebook', link: 'https://facebook.com/FRSOURCE' }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present Szymon Dziewoński'
        },
        nav: [
            apiNav().items[0],
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
                ]
            }
        ]
    }
}

function apiNav() {
    return {
        text: 'Api',
        items: [{
            text: 'Options', link: '/api/options'
        }, {
            text: 'Typings', link: '/api/typings'
        }]
    }
}
