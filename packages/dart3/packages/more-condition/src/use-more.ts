import { computed, ref } from 'vue';
export default function useMore(attrsProp: any, maxNum: number): any {
  const maxItemNum = ref(0);
  const getAllLeafNode = (treeNodes: any[]) => {
    return treeNodes.reduce((pre: any, cur: any) => {
      const children = cur[attrsProp.value.children];

      if (children && children.length) {
        pre.push(...getAllLeafNode(children));
      } else {
        pre.push(cur[attrsProp.value.id]);
      }
      return pre;
    }, []);
  };
  const isMaxNum = computed(() => {
    if (maxNum === 0) {
      return false;
    }
    return maxItemNum.value >= maxNum;
  });

  const refreshMaxItemNum = (list: any[]) => {
    maxItemNum.value = getAllLeafNode(list)?.length || 0;
  };

  return { isMaxNum, refreshMaxItemNum };
}
