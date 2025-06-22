import type { BookItem, BookTypeClassification } from '../types/book'

export const bookTypeClassification = (bookList: BookItem[]): BookTypeClassification => {
    // 初始化分类
    const classificationResult: BookTypeClassification = {
        good: [],
        medium: [],
        bad: []
    };

    const sortByRate = (a: BookItem, b: BookItem) => {
        // 按照评分从高到低排序
        return b.rate - a.rate;
    }

    // 对书籍列表按照评分进行排序
    bookList.sort(sortByRate);

    // 遍历书籍列表，根据评分分类
    bookList.forEach((book) => {
        if (book.rate > 4) {
            classificationResult.good.push(book);
        } else if (book.rate > 3.0) {
            classificationResult.medium.push(book);
        } else {
            classificationResult.bad.push(book);
        }
    });

    return classificationResult;
} 