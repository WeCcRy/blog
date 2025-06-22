const base = "/blog/"; // 设置base路径，部署到github时需要设置

export default {
    title: 'WeCcRy', // 博客的标题
    description: 'wangy的个人博客', // 博客的介绍
    base: base, // 设置base路径，部署到github时需要设置
    head: [
        ['link', { rel: 'icon', href: `${base}weblogo.ico` }],  // 指向 public/weblogo.ico
    ],
    themeConfig: {
        logo: "", // 页面上显示的logo
        nav: [ // 页面右上角的导航
            { text: "书籍", link: "/articles/books/2025" },
            // { text: "前端", link: "/articles/uniapp/一键登录" },
            // {
            //     text: '博客文档',
            //     items: [ // 可以配置成下拉
            //         { text: 'JavaScript 核心系列', link: '/articles/javaScript-core/构造函数、原型、原型链' },
            //         { text: 'Vue 三方组件库', link: '/articles/libs/VForm3低代码初体验' },
            //         { text: '其他', link: '/articles/other/nvm管理node' },
            //     ]
            // }
        ],
        sidebar: { // 侧边栏，可以分组
            "/articles/books/": [
                {
                    text: "年鉴",
                    items: [
                        {
                            text: "2025 / 乙巳蛇年",
                            link: "/articles/books/2025",
                        },
                        {
                            text: "2024 / 甲辰龙年",
                            link: "/articles/books/2024",
                        },
                        {
                            text: "2023 / 癸卯兔年",
                            link: "/articles/books/2023",
                        },
                        {
                            text: "2022 / 壬寅虎年",
                            link: "/articles/books/2022",
                        },
                        {
                            text: "2021 / 辛丑牛年",
                            link: "/articles/books/2021",
                        }
                    ],
                },
            ],
        },
        socialLinks: [{ icon: "github", link: "https://github.com/WeCcRy" }], // 可以连接到 github
    },
}

