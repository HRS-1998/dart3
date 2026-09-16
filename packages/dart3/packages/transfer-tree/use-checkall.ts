import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { arrayConcatClear } from './tool';
import { difference } from 'lodash-es';
export default function useCheckAll(
  checkedData: Ref<any[]>,
  isSearch: Ref<boolean>,
  searchCheckedIds: Ref<any[]>,
  allSearchIds: Ref<any[]>,
  allIds: Ref<any[]>,
  setChecked: Function,
  setSearchData: Function,
  defaultCheckedKeys: Ref<any[]>,
  allCheckedDisabledIds: Ref<any[]>
) {
  //check
  const checkAll = ref(false);
  const isIndeterminate = computed(() => {
    if (isSearch.value) {
      const searchCheckedIdsLen = searchCheckedIds.value.length;
      return searchCheckedIdsLen > 0 && searchCheckedIdsLen < allSearchIds.value.length;
    }
    const idLen = checkedData.value?.length || 0;
    return idLen > 0 && idLen < allIds.value.length;
  });

  const setCheckAll = () => {
    if (isSearch.value) {
      const searchCheckedIdsLen = searchCheckedIds.value.length;
      checkAll.value = searchCheckedIdsLen > 0 && searchCheckedIdsLen === allSearchIds.value.length;
      return;
    }
    const idLen = checkedData.value?.length || 0;
    checkAll.value = idLen > 0 && idLen === allIds.value.length;
  };
  const handleCheckAllChange = (val: boolean) => {
    if (isSearch.value) {
      const searchIds = val
        ? arrayConcatClear(checkedData.value, allSearchIds.value)
        : difference(
            checkedData.value,
            difference(allSearchIds.value, allCheckedDisabledIds.value)
          );

      const currentIds = val ? allSearchIds.value : allCheckedDisabledIds.value;
      setSearchData(currentIds);
      setChecked(searchIds);
      return;
    }

    const ids = val
      ? arrayConcatClear(allIds.value, allCheckedDisabledIds.value)
      : allCheckedDisabledIds.value;
    setChecked(ids);
  };
  return {
    checkAll,
    handleCheckAllChange,
    setCheckAll,
    isIndeterminate
  };
}
