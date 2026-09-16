import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { intersection } from 'lodash-es';
import { arrayConcatClear } from './tool';
export default function useTree(
  props: any,
  emit: any,
  elFormItem: any,
  getAllId: Function,
  setCheckAll: Function,
  allDisabledIds: Ref<any[]>,
  defaultCheckedKeys: Ref<any[]>,
  _data: any
) {
  //maintree
  const checkedData = ref<any[]>([]);
  const leftTree = ref();

  const allCheckedDisabledIds = computed(() => {
    return intersection(defaultCheckedKeys.value, allDisabledIds.value);
  });
  const allIds = computed(() => {
    return arrayConcatClear(getAllId(_data.value), allCheckedDisabledIds.value);
  });

  const setCheckedKeys = (ids: any[]) => {
    setChecked(ids);
    defaultCheckedKeys.value = ids;
  };
  const setChecked = (ids: any[]) => {
    checkedData.value = ids;
    setCheckAll();

    if (leftTree.value) {
      leftTree.value?.setCheckedKeys(ids);
    }
    checkChange(ids);
  };

  const checkChange = (ids: any[]) => {
    emit('check-change', ids);
    elFormItem && elFormItem.clearValidate();
  };
  const onCheckChange = () => {
    const ids = leftTree.value.getCheckedKeys(true);
    setChecked(ids);
  };
  return {
    checkedData,
    leftTree,
    defaultCheckedKeys,
    allIds,
    allCheckedDisabledIds,
    onCheckChange,
    setCheckedKeys,
    setChecked
  };
}
