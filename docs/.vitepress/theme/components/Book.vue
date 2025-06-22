<script setup lang="ts">
import { onMounted } from "vue";
import type { BookItem, BookList } from "./types/book";

const props = defineProps<BookList>();
const bookList = props.bookList;
const type = props.type;

onMounted(() => {
  // 确保bookList在组件挂载时已准备好
  if (!bookList || bookList.length === 0) {
    console.warn("Book list is empty or not provided.");
  }
});

// 根据type生成表格样式类名
const tableClass = `book-table book-type-${type}`;
</script>

<template>
  <div class="book-table-container">
    <table :class="tableClass">
      <colgroup>
        <col class="col-index" />
        <col class="col-title" />
        <col class="col-author" />
        <col class="col-rating" />
      </colgroup>
      <thead>
        <tr>
          <th>序号</th>
          <th>书名</th>
          <th>作者</th>
          <th>评分</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in bookList" :key="`book-${index}`">
          <td>{{ index + 1 }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>
            <div class="star-rating">
              <div class="stars-container">
                <div class="stars-background">★★★★★</div>
                <!-- 通过绝对定位和宽度控制来实现精确的星级评分显示 -->
                <div class="stars-filled" :style="{ width: `${book.rate * 20}%` }">★★★★★</div>
              </div>
              <span class="rating-number">{{ book.rate.toFixed(1) }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.book-table-container {
  margin: 2rem 0;
  width: 100%; // 确保容器占满父元素
  
  .book-table {
    width: 100%; // 确保表格占满容器
    border-collapse: collapse;
    table-layout: fixed; // 使用固定表格布局以便精确控制列宽
    
    // 根据类型设置不同背景色
    &.book-type-good {
      tbody tr {
        background-color: rgba(0, 128, 0, 0.1); // 绿色背景，半透明
        &:hover {
          background-color: rgba(0, 128, 0, 0.2);
        }
      }
    }
    
    &.book-type-medium {
      tbody tr {
        background-color: rgba(255, 215, 0, 0.1); // 黄色背景，半透明
        &:hover {
          background-color: rgba(255, 215, 0, 0.2);
        }
      }
    }
    
    &.book-type-bad {
      tbody tr {
        background-color: rgba(255, 0, 0, 0.1); // 红色背景，半透明
        &:hover {
          background-color: rgba(255, 0, 0, 0.2);
        }
      }
    }
    
    // 设置列宽
    .col-index {
      width: 80px; // 序号列固定宽度
    }
    
    .col-title {
      min-width: 200px; // 书名最小宽度
    }
    
    .col-author {
      min-width: 150px; // 作者最小宽度
    }
    
    .col-rating {
      width: 150px; // 评分列固定宽度，稍微增加以容纳评分显示
    }
    
    th, td {
      padding: 0.75rem;
      border-bottom: 1px solid var(--vp-c-divider);
      text-align: left;
      overflow: hidden; // 防止内容溢出
      text-overflow: ellipsis; // 超出部分显示省略号
    }
    
    thead {
      background-color: var(--vp-c-bg-soft);
      
      th {
        font-weight: 600;
      }
    }
    
    // 精确星级评分样式
    .star-rating {
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      
      .stars-container {
        position: relative;
        display: inline-block;
        line-height: 1;
      }
      
      .stars-background {
        color: #ddd; // 使用浅灰色作为背景星
        letter-spacing: 2px;
      }
      
      .stars-filled {
        position: absolute;
        top: 0;
        left: 0;
        color: #f90; // 橙黄色的填充星
        overflow: hidden;
        white-space: nowrap;
        letter-spacing: 2px;
      }
      
      .rating-number {
        margin-left: 8px;
        font-size: 0.9em;
        color: var(--vp-c-text-2);
        font-weight: 500;
      }
    }
  }
}
</style>