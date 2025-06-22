<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { bookTypeClassification } from './utils/bookTypeClassification';
import { booksData } from './data/books';

// 接收年份和类型作为参数
const props = defineProps<{
  year: string;
  type: 'good' | 'medium' | 'bad'; // 指定显示哪种类型的书籍
}>();

// 根据年份获取书籍数据
const bookList = computed(() => {
  return booksData[props.year] || [];
});

// 分类后的书籍
const classifiedBooks = ref({
  good: [],
  medium: [],
  bad: []
});

onMounted(() => {
  // 使用分类工具对书籍进行分类
  classifiedBooks.value = bookTypeClassification(bookList.value);
});

// 根据type选择要展示的书籍列表
const displayBooks = computed(() => {
  return classifiedBooks.value[props.type] || [];
});
</script>

<template>
  <ClientOnly>
    <BookList :type="type" :bookList="displayBooks" />
  </ClientOnly>
</template>