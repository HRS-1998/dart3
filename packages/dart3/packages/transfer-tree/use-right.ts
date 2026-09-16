import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { intersection } from 'lodash-es';
export default function useRight(
  props: any,
  allIds: Ref<any[]>,
  checkedData: Ref<any[]>,
  getSubTree: Function,
  isSearch: Ref<boolean>,
  searchCheckedIds: Ref<any[]>,
  setSearchData: Function,
  setChecked: Function,
  allDisabledIds: Ref<any[]>,
  _data: Ref<any[]>
) {
  //right
  const rightTree = ref();
  const queryRight = ref('');
  const rightCheckData = computed(() => {
    return props.isRightClear ? checkedData.value : null;
  });

  const rightData = computed(() => {
    if (!checkedData.value || !checkedData.value.length) {
      return [];
    }
    if (checkedData.value.length === allIds.value.length && !allDisabledIds.value.length) {
      return _data.value;
    }

    return getSubTree(_data.value, checkedData.value) || [];
  });

  const onRightCheckChange = () => {
    if (!props.isRightClear) {
      return;
    }
    const ids = rightTree.value.getCheckedKeys(true);
    if (isSearch.value) {
      const searchIds = intersection(searchCheckedIds.value, ids);
      setSearchData(searchIds);
    }
    setChecked(ids);
  };
  const onQueryChangedRight = (query: string) => {
    rightTree.value!.filter(query);
  };

  const clearQueryRight = () => {
    queryRight.value = '';
    onQueryChangedRight('');
  };

  return {
    onQueryChangedRight,
    onRightCheckChange,
    clearQueryRight,
    rightTree,
    queryRight,
    rightCheckData,
    rightData
  };
}
