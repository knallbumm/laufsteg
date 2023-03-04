export default {
  title: 'laufsteg',
  description: 'Just a laufsteg doing its things',
  themeConfig: {
    siteTile: true,
    nav: [{ text: 'Docs', link: '/docs/index.html' }],
    sidebar: {
      '/docs/': [
        {
          text: 'General',
          items: [
            { text: 'Installation', link: '/docs/index' },
            { text: 'Usecases', link: '/docs/usecases' },
            { text: 'Options', link: '/docs/options' },
            { text: 'Callbacks', link: '/docs/callbacks' },
          ],
        },

        {
          text: 'Adapters',
          items: [
            {
              text: 'React',
              items: [
                { text: 'Installation', link: '/docs/react/installation' },
                { text: 'Circle', link: '/docs/index' },
                { text: 'Path', link: '/' },
              ],
            },
            {
              text: 'Vue',
              items: [
                { text: 'Installation', link: '/docs/vue/installation' },
                { text: 'Circle', link: '/docs/index' },
                { text: 'Path', link: '/' },
              ],
            },
          ],
        },
      ],
    },
  },
  head: [
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#3a0839',
      },
    ],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['meta', { name: 'msapplication-TileColor', content: '#3a0839' }],
    [
      'meta',
      {
        name: 'msapplication-config',
        content: '/browserconfig.xml',
      },
    ],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
  ],
  base: '/laufsteg/',
};
