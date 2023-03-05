export default {
  title: 'laufsteg',
  description: 'Just a laufsteg doing its things',
  themeConfig: {
    siteTile: true,
    nav: [
      { text: 'Docs', link: '/docs/index.html' },
      { text: 'Vue', link: '/docs/basic-usage#Vue' },
      { text: 'React', link: '/docs/basic-usage#React' },
    ],
    sidebar: {
      '/docs/': [
        {
          items: [
            { text: 'General', link: '/docs/index.html' },
            { text: 'Demo', link: '/docs/Demo' },
            { text: 'Installation', link: '/docs/installation' },
            { text: 'Basic Usage', link: '/docs/basic-usage' },
            { text: 'Options', link: '/docs/options' },
            { text: 'Callbacks', link: '/docs/callbacks' },
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
