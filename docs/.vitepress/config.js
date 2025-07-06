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
            {
                text: "前端",
                items: [
                    {
                        text: "Vue3",
                        link: "/articles/frontend/vue",
                    },
                    {
                        text: "React18",
                        link: "/articles/frontend/React18",
                    },
                    {
                        text: "Typescript",
                        link: "/articles/frontend/typescript",
                    },
                ]
            },
            {
                text: "实践",
                items: [
                    {
                        text: "八股",
                        link: "/articles/practice/八股/html",
                    },
                    {
                        text: "工程化",
                        link: "/articles/practice/projection/自定义元素共享",
                    },
                ]
            },
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
            "articles/frontend/": [
                {
                    text: "前端",
                    items: [
                        {
                            text: "Vue3",
                            link: "/articles/frontend/vue",
                        },
                        {
                            text: "React18",
                            link: "/articles/frontend/React18",
                        },
                        {
                            text: "Typescript",
                            link: "/articles/frontend/typescript",
                        },
                    ],
                },
            ],
            "articles/practice/八股/": [
                {
                    text: "八股",
                    items: [
                        {
                            text: "HTML",
                            link: "/articles/practice/八股/html",
                        },
                        {
                            text: "CSS",
                            link: "/articles/practice/八股/css",
                        },
                        {
                            text: "JavaScript",
                            link: "/articles/practice/八股/js",
                        },
                        {
                            text: "TypeScript",
                            link: "/articles/practice/八股/ts",
                        },
                        {
                            text: "Vue",
                            link: "/articles/practice/八股/vue",
                        },
                        {
                            text: "手撕",
                            link: "/articles/practice/八股/手撕",
                        },
                        {
                            text: "计算机网络",
                            link: "/articles/practice/八股/计算机网络",
                        },
                        {
                            text: "工程化",
                            link: "/articles/practice/八股/工程化",
                        },
                    ],
                },
            ],
            "/articles/practice/projection/": [
                {
                    text: "工程化",
                    items: [
                        {
                            text: "自定义元素共享",
                            link: "/articles/practice/projection/自定义元素共享",
                        },
                        {
                            text: "echarts联动其他组件",
                            link: "/articles/practice/projection/echarts联动其他组件",
                        },
                    ],
                },
            ]
        },
        socialLinks: [{ icon: "github", link: "https://github.com/WeCcRy" }], // 可以连接到 github
    },
}

