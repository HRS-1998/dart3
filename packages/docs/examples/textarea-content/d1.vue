<template>
  <div>内容展示：</div>
  <dart-textarea-content :value="textarea"></dart-textarea-content>
  <el-input autosize type="textarea" v-model="textarea"></el-input>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const textarea = ref(
  `HTML 是用来描述网页的一种语言。\nHTML 指的是超文本标记语言: HyperText Markup Language\nHTML 不是一种编程语言，而是一种标记语言\n标记语言是一套标记标签 (markup tag)\nHTML 使用标记标签来描述网页\nHTML 文档包含了HTML 标签及文本内容\nHTML文档也叫做 web 页面`
);
</script>
<style lang="scss"></style>
