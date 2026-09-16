<template>
  <div class="dart-toolbar" :class="!brandVisible && 'dart-toolbar-nobrand'">
    <span class="dart-brand"></span>
    <el-row :gutter="20">
      <el-col :span="span[0]" :xs="spanXS[0]">
        <div class="content">
          <slot name="content"></slot>
        </div>
      </el-col>
      <el-col :span="span[1]" :xs="spanXS[1]">
        <div class="operate">
          <slot name="operate"></slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Utils from '../utils/index';
export default defineComponent({
  name: 'DartToolbar',
  props: {
    brandVisible: {
      type: Boolean,
      default: true,
    },
    span: {
      type: Array,
      default: () => [12, 12],
    },
    spanXS: {
      type: Array,
      default: () => [24, 24],
    },
  },
  setup(props) {
    // eslint-disable-next-line complexity
    onMounted(() => {
      if (!Utils.isArray(props.span)) {
        console.error('span 必须是数组');
      } else if (props.span.length !== 2) {
        console.error('span 数组长度必须为2');
      } else {
        if (!(Utils.isNumber(props.span[0]) && Utils.isNumber(props.span[1]))) {
          console.error('span 数组元素必须为整数');
        }
      }
      if (!Utils.isArray(props.spanXS)) {
        console.error('spanXS 必须是数组');
      } else if (props.spanXS.length !== 2) {
        console.error('spanXS 数组长度必须为2');
      } else {
        if (
          !(Utils.isNumber(props.spanXS[0]) && Utils.isNumber(props.spanXS[1]))
        ) {
          console.error('spanXS 数组元素必须为整数');
        }
      }
    });
  },
});
</script>

<style lang="scss">
.dart-toolbar {
  text-align: left;
  position: relative;
  margin-bottom: 10px;
  .dart-brand {
    position: absolute;
    left: 0;
    top: 4px;
    width: 3px;
    height: 24px;
    line-height: 24px;
    background-color: #2395f1;
  }
  .content {
    margin-left: 15px;
    min-height: 32px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .operate {
    float: right;
  }
  .el-breadcrumb {
    padding-top: 8px;
  }
}

.dart-toolbar-nobrand {
  .dart-brand {
    display: none;
  }
  .content {
    margin-left: 0;
  }
}
</style>
