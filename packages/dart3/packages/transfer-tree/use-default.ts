import { computed } from 'vue';
import { cloneDeep } from 'lodash-es';

export default function useDefault(props: any) {
  const dataProps: any = computed(() => {
    return Object.assign(
      {
        value: 'value',
        label: 'label',
        children: 'children',
        disabled: 'disabled'
      },
      props.dataMap
    );
  });
  const treeValue = computed(() => {
    return dataProps.value.value;
  });
  const treeLabel = computed(() => {
    return dataProps.value.label;
  });
  const treeChildren = computed(() => {
    return dataProps.value.children;
  });
  const treeDisabled = computed(() => {
    return dataProps.value.disabled;
  });
  const bodyHeight = computed<string>(() => {
    return props.height + 'px';
  });
  const searchFilterMethod = (query: string, node: any) => {
    let result = false;
    if (props.filterMethod) {
      result = props.filterMethod(query, node);
    } else {
      const _str: string = props.isSearchBranch ? node._label : node[treeLabel.value];

      result = _str!.includes(query);
    }
    return result;
  };

  // 重组树数据，添加 _label
  const fixTreeData = (list: any) => {
    const queue: any = [];
    const _data: any = cloneDeep(list);

    queue.push({
      [props.dataMap.children]: _data,
      [props.dataMap.label]: '',
      _label: '',
      [props.dataMap.value]: '0'
    });
    while (queue.length) {
      const item = queue.shift();

      (item[props.dataMap.children] || []).forEach((child) => {
        child._label = child[props.dataMap.label] + item._label;

        queue.push(child);
      });
    }

    return _data;
  };

  return {
    treeValue,
    treeLabel,
    treeDisabled,
    treeChildren,
    bodyHeight,
    dataProps,
    searchFilterMethod,
    fixTreeData
  };
}
