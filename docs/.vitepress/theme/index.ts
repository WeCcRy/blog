import DefaultTheme from 'vitepress/theme'
import BookList from './components/Book.vue'
import YearBooks from './components/YearBooks.vue'
import './style.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        // 全局注册组件
        app.component('BookList', BookList)
        app.component('YearBooks', YearBooks)
    }
}