const base = "/blog/"; // 设置base路径，部署到github时需要设置

export default {
    title: 'Blog|WeCcRy', // 博客的标题
    description: 'wangy的个人博客', // 博客的介绍
    head: [
        ['link', { rel: 'icon', href: `${base}/weblogo.ico` }],  // 指向 public/weblogo.ico
    ],
    themeConfig: {
        logo: "/images/weblogo.ico", // 页面上显示的logo
        nav: [ // 页面右上角的导航
            { text: "vue", link: "/articles/vue/上传素材到COS" },
            { text: "uniapp", link: "/articles/uniapp/一键登录" },
            {
                text: '博客文档',
                items: [ // 可以配置成下拉
                    { text: 'JavaScript 核心系列', link: '/articles/javaScript-core/构造函数、原型、原型链' },
                    { text: 'Vue 三方组件库', link: '/articles/libs/VForm3低代码初体验' },
                    { text: '其他', link: '/articles/other/nvm管理node' },
                ]
            }
        ],
        sidebar: { // 侧边栏，可以分组
            "/articles/vue/": [
                {
                    text: "基础",
                    items: [
                    ],
                },
                {
                    text: "代码段",
                    items: [
                        {
                            text: "上传素材到COS",
                            link: "/articles/vue/上传素材到COS",
                        },
                        {
                            text: "文件下载",
                            link: "/articles/vue/文件下载",
                        },
                    ],
                },
            ],
            "/articles/javaScript-core/": [
                {
                    text: "基础",
                    items: [
                        {
                            text: "1. 构造函数、原型、原型链",
                            link: "/articles/javaScript-core/构造函数、原型、原型链",
                        },
                        {
                            text: "2. 执行上下文和执行上下文栈",
                            link: "/articles/javaScript-core/执行上下文和执行上下文栈",
                        },
                        {
                            text: "3. this的指向",
                            link: "/articles/javaScript-core/this的指向",
                        },
                    ],
                },
                {
                    text: "进阶",
                    items: [
                        {
                            text: "xx",
                            link: "/xx",
                        },
                    ],
                },
            ],
            "/articles/libs/": [
                {
                    items: [
                        {
                            text: "1. VForm3低代码初体验",
                            link: "/articles/libs/VForm3低代码初体验",
                        },
                    ],
                }
            ],
        },
        socialLinks: [{ icon: "github", link: "https://github.com/WeCcRy" }], // 可以连接到 github
    },
}

