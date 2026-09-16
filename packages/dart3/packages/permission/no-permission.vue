<template>
  <div class="dart-no-permission">
    <div class="dart-no-permission-tip">
      <h2>{{ permissionNote }}</h2>
      <p>
        请联系相关人员进行权限申请，若已配好权限，点击
        <el-button type="primary" @click="jumpToIndex">刷新试试</el-button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue';
export default defineComponent({
  name: 'dartNoPermission',
  setup() {
    const app = getCurrentInstance();
    const jumpToIndex = () => {
      window.location.href = window.location.href.replace(/^([^#]+).*$/, '$1');
    };
    const permissionNote = computed(() => {
      var data = (app as any).$dart.permission.getData();

      if (data.errorState) {
        return data.errTip;
      }
      //if (data.state === false) {
      return data.noPermissionTip;
    });
    return { jumpToIndex, permissionNote };
  }
});
</script>
<style>
.dart-no-permission {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}
.dart-no-permission-tip {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
</style>
