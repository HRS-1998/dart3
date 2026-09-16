# Multirows 多行信息

名称 + `ID · 编码` 两行展示，常用于表格、列表单元格展示主体信息；两行各自溢出省略并在悬停时以 tooltip 展示全文。

- `id` 缺省时展示 `--`
- `code` 为空时第二行仅展示 `id`

配合 `dart-table-column` 的 `useType="multirows"` 可自动从行数据取值（见 [Table 文档](/guide/table#多行信息列)）。

## 基础

<demo src="multirows/m1" />

## 溢出提示

容器宽度不足时省略号截断，悬停显示全文。

<demo src="multirows/m2" />

## 属性

| 参数 | 说明               | 类型             | 可选值 | 默认值 |
| ---- | ------------------ | ---------------- | ------ | ------ |
| name | 名称（第一行）     | string           | —      | ''     |
| id   | ID（第二行左侧）   | string / number  | —      | —      |
| code | 编码（第二行右侧） | string / number  | —      | —      |
