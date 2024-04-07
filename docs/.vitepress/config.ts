import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'node:url';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Byakuren Js',
  description:
    "A theme color extracting library translate from <a href='https://github.com/XadillaX/byakuren' target='_blank' class='brand-link'>Byakuren</a> to JavaScript.",
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [{ text: 'Home', link: '/' }],

        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'What ByakurenJs did?', link: '/guide/introduction' },
              { text: 'Getting Started', link: '/guide/get-started' }
            ]
          },
          {
            text: 'Usage',
            items: [
              { text: 'Basic Usage', link: '/guide/basic-usage' },
              // { text: "Advanced Usage", link: "/guide/advanced-usage" },
              { text: 'API', link: '/guide/api' }
            ]
          },
          {
            text: 'Other',
            items: [
              {
                text: 'byakuren',
                link: 'https://github.com/XadillaX/byakuren'
              }
            ]
          }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/siaikin/byakuren-js' }]
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [{ text: '主页', link: '/zh/' }],

        sidebar: [
          {
            text: '介绍',
            items: [
              { text: 'ByakurenJs 是什么?', link: '/zh/guide/introduction' },
              { text: '入门指南', link: '/zh/guide/get-started' }
            ]
          },
          {
            text: 'Usage',
            items: [
              { text: '基本用法', link: '/zh/guide/basic-usage' },
              // { text: "Advanced Usage", link: "/guide/advanced-usage" },
              { text: 'API', link: '/zh/guide/api' }
            ]
          },
          {
            text: '其他',
            items: [
              {
                text: 'byakuren',
                link: 'https://github.com/XadillaX/byakuren'
              }
            ]
          }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/siaikin/byakuren-js' }]
      }
    }
  },
  vite: {
    resolve: {
      alias: {
        'byakuren-js': fileURLToPath(new URL('../../lib/index', import.meta.url))
      }
    }
  }
});
