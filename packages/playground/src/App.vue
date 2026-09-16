<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="border-right: 1px solid #e6e6e6; overflow-y: auto">
      <h3 style="padding: 16px; margin: 0; text-align: center">ct-dart3</h3>
      <el-menu :default-active="currentRoute" router>
        <el-menu-item v-for="item in navItems" :key="item.path" :index="item.path">
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="overflow-y: auto; padding: 24px">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { navItems } from './router'

const route = useRoute()
const currentRoute = computed(() => route.path)
</script>