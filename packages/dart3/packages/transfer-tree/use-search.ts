import { computed, ref, nextTick } from 'vue';
import { intersection, difference } from 'lodash-es';
import type { Ref } from 'vue';
import { arrayConcatClear } from './tool';
export default function useSearch(
  props: any,
  getTreeBySearchQuery: Function,
  getAllId: Function,
  searchFilterMethod: Function,
  setCheckAll: Function,
  checkedData: Ref<any[]>,
  setChecked: Function,
  allSearchDisabledIds: Ref<any[]>,
  getAllSearchIds: Function,
  defaultCheckedKeys: Ref<any[]>,
  _data: any
) {
  //search
  const queryLeft = ref('');
  const searchRef = ref();
  const searchDefaultCheckedKeys = ref<any[]>([]);
  const searchCheckedIds = ref<any[]>([]);
  const isSearch = ref(false); //是否搜索
  const searchSubTree = ref<any[]>([]); //搜索后子树
  const allCheckedDisabledIds = computed(() => {
    return intersection(defaultCheckedKeys.value, allSearchDisabledIds.value);
  });
  const allSearchIds = computed(() => {
    //return getAllSearchIds(searchSubTree.value);
    return arrayConcatClear(getAllSearchIds(searchSubTree.value), allCheckedDisabledIds.value);
  });
  const searchFilterMethod2 = () => {
    return true;
  };
  const setSearchData = (searchIds: any[], isNotSet: boolean = false) => {
    searchCheckedIds.value = searchIds;
    searchDefaultCheckedKeys.value = searchIds;
    if (isNotSet) {
      return;
    }
    nextTick(() => {
      searchRef.value?.setCheckedKeys(searchIds);
    });
  };
  const onQueryChanged = (query: string) => {
    isSearch.value = query !== '';
    searchDefaultCheckedKeys.value = [];
    searchSubTree.value = [];
    searchCheckedIds.value = [];
    if (!query) {
      return;
    }

    searchSubTree.value = getTreeBySearchQuery(_data.value, query, searchFilterMethod) || [];
    const checkedIds = intersection(checkedData.value, allSearchIds.value);
    setSearchData(checkedIds);
    nextTick(() => {
      searchRef.value.filter('');
    });
    setCheckAll();
  };
  const onSearchCheckChange = (data: object, checked: boolean) => {
    const ids = searchRef.value.getCheckedKeys(true);
    const currentIds = getAllId([data]);
    setSearchData(ids, true);
    const concatIds = checked
      ? arrayConcatClear(checkedData.value, currentIds)
      : difference(checkedData.value, currentIds);

    setChecked(concatIds);
  };

  const clearQueryLeft = () => {
    queryLeft.value = '';
    onQueryChanged('');
  };

  return {
    queryLeft,
    searchRef,
    searchDefaultCheckedKeys,
    searchCheckedIds,
    allSearchIds,
    searchSubTree,
    isSearch,
    setSearchData,
    searchFilterMethod2,
    onQueryChanged,
    onSearchCheckChange,
    clearQueryLeft
  };
}
