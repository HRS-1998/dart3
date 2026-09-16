<template>
  <table>
    <thead>
      <tr><th>版本</th><th>日期</th><th>说明</th></tr>
    </thead>
    <tbody>
      <tr v-for="entry in entries" :key="entry.version">
        <td><code><a :href="tagBaseUrl + entry.version" target="_blank">{{ entry.version }}</a></code></td>
        <td>{{ entry.date }}</td>
        <td>{{ entry.description }}</td>
      </tr>
    </tbody>
  </table>
  <p v-if="showMore" class="changelog-more">
    <a :href="withBase('/log')">查看完整日志 →</a>
  </p>
</template>

<script setup lang="ts">
import { changelog, tagBaseUrl } from '../../changelog'
import { withBase } from 'vitepress'

const props = defineProps<{
  limit?: number
  showMore?: boolean
}>()

const entries = props.limit ? changelog.slice(0, props.limit) : changelog
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}
th, td {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}
th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}
code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
}
code a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
code a:hover {
  text-decoration: underline;
}
.changelog-more {
  margin-top: 8px;
}
</style>
