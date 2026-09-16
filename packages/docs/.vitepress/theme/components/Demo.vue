<template>
  <div class="demo-container">
    <div class="demo-preview">
      <component :is="demoComponent" v-if="demoComponent" />
    </div>
    <details class="demo-code-details">
      <summary>查看源码</summary>
      <div class="demo-code">
        <pre><code>{{ rawCode }}</code></pre>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'

const props = defineProps<{
  src: string
}>()

const demoComponent = shallowRef<any>(null)
const rawCode = ref('')

onMounted(async () => {
  try {
    const modules = import.meta.glob('../../../examples/**/*.vue')
    const path = `../../../examples/${props.src}.vue`
    if (modules[path]) {
      const mod = await modules[path]()
      demoComponent.value = mod.default
    }

    const rawModules = import.meta.glob('../../../examples/**/*.vue', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>
    if (rawModules[path]) {
      rawCode.value = rawModules[path]
    }
  } catch (e) {
    console.error('Demo load error:', e)
  }
})
</script>

<style scoped lang="scss">
.demo-container {
  border: 1px solid var(--vp-c-divider, #e2e2e2);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.demo-preview {
  padding: 24px;
}

.demo-code-details {
  border-top: 1px solid var(--vp-c-divider, #e2e2e2);

  summary {
    padding: 8px 16px;
    cursor: pointer;
    font-size: 13px;
    color: var(--vp-c-text-2, #666);
    user-select: none;

    &:hover {
      color: var(--vp-c-text-1, #333);
    }
  }
}

.demo-code {
  padding: 16px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;

  pre {
    margin: 0;
    background: var(--vp-c-bg-soft, #f6f6f7);
    padding: 16px;
    border-radius: 4px;
  }

  code {
    font-family: var(--vp-font-family-mono, monospace);
  }
}
</style>
