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
            { icon: 'twitter', link: 'https://twitter.com/frsource1' },
            { icon: {
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path d="M0 10v11h9v2h7v-2h16V10H0zm1.777 1.777h7.114v7.668H7.11v-5.888H5.334v5.888H1.777v-7.668zm8.891 0H17.779v7.666h-3.556v1.78h-3.555v-9.446zm8.889 0H30.225v7.668h-1.78v-5.888h-1.777v5.888h-1.777v-5.888h-1.78v5.888h-3.554v-7.668zm-5.334 1.78v4.111H16v-4.111h-1.777z"/></svg>'
            }, link: 'https://www.npmjs.com/package/@frsource/light-scrollbar' }
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
                    { text: 'Gettings started', link: '/getting-started' },
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
