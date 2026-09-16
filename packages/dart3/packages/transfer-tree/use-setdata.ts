import type { Ref } from 'vue';
import { ref } from 'vue';
export default function useSetData(
  treeValue: Ref<string>,
  treeLabel: Ref<string>,
  treeChildren: Ref<string>,
  treeDisabled: Ref<string>
) {
  const defaultCheckedKeys = ref<any[]>([]);
  const allDisabledIds = ref<any[]>([]);
  const allSearchDisabledIds = ref<any[]>([]);
  function cloneDeep(item: any) {
    return JSON.parse(JSON.stringify(item));
  }
  function getSubTree(tree: any[], targetId: any[]) {
    const idMap: any = {};
    targetId.forEach((item: any) => {
      idMap[item] = true;
    });
    let newNode: any = getSubtreeByIds(tree, targetId, idMap);
    const resultNode: any = cloneDeep(newNode);
    newNode = null;
    return resultNode;
  }

  function getAllId(treeNodes: any) {
    allDisabledIds.value = [];
    return getAllIdByNode(treeNodes, allDisabledIds);
  }
  function getAllSearchIds(treeNodes: any) {
    allSearchDisabledIds.value = [];
    return getAllIdByNode(treeNodes, allSearchDisabledIds);
  }
  function getAllIdByNode(treeNodes: any, disabledIds: any) {
    return treeNodes.reduce((pre: any, cur: any) => {
      if (cur[treeDisabled.value]) {
        disabledIds.value.push(cur[treeValue.value]);
        return pre;
      }
      if (cur[treeChildren.value] && cur[treeChildren.value].length) {
        pre.push(...getAllIdByNode(cur[treeChildren.value], disabledIds));
      } else {
        pre.push(cur[treeValue.value]);
      }
      return pre;
    }, []);
  }
  // 根据选择值 获取树节点
  function getSubtreeByIds(tree: any[], targetId: any[], idMap: any) {
    if (!Array.isArray(tree)) return null;
    const nodes: any = [];

    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (idMap[node[treeValue.value]]) {
        nodes.push(node);
      }
      if (node[treeChildren.value] && node[treeChildren.value].length) {
        const nodeBox: any = {
          [treeValue.value]: node[treeValue.value],
          [treeLabel.value]: node[treeLabel.value],
          [treeDisabled.value]: node[treeDisabled.value],
          [treeChildren.value]: [],
          _label: node._label
        };

        const subtree: any = getSubtreeByIds(node[treeChildren.value], targetId, idMap);
        if (subtree) {
          nodeBox[treeChildren.value] = subtree;
          nodes.push(nodeBox);
        }
      }
    }
    return nodes.length ? nodes : null;
  }

  // 根据选择值 获取树节点
  function getTreeBySearchQuery(tree: any[], query: string, checkNode: any) {
    if (!Array.isArray(tree)) return null;
    const nodes: any = [];

    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      const isChildren = node[treeChildren.value] && node[treeChildren.value].length;
      if (checkNode(query, node) && !isChildren) {
        nodes.push(node);
      }
      if (isChildren) {
        const nodeBox: any = {
          [treeValue.value]: node[treeValue.value],
          [treeLabel.value]: node[treeLabel.value],
          [treeDisabled.value]: node[treeDisabled.value],
          [treeChildren.value]: []
        };

        const subtree: any = getTreeBySearchQuery(node[treeChildren.value], query, checkNode);
        if (subtree) {
          nodeBox[treeChildren.value] = subtree;
          nodes.push(nodeBox);
        }
      }
    }
    return nodes.length ? nodes : null;
  }
  return {
    allDisabledIds,
    allSearchDisabledIds,
    defaultCheckedKeys,
    getSubTree,
    getTreeBySearchQuery,
    getAllId,
    getAllSearchIds
  };
}
