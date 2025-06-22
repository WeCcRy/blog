// 书籍项类型
export interface BookItem {
    title: string;  // 书名
    author: string;  // 作者
    rate: number;  // 评分
}

// 组件接受类型，需要接受一个 BookItem 数组和一个 type 字符串
export interface BookList {
    type: string;  // 用于区分佳作(good)、良作(medium)、庸作(bad)
    bookList: BookItem[]; // 书籍列表
}

// 书籍分类类型，用于将书籍列表分为佳作、良作和庸作
export interface BookTypeClassification {
    good: BookItem[];  // 佳作
    medium: BookItem[];  // 良作
    bad: BookItem[];  // 庸作
}