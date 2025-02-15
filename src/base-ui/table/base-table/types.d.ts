/**
 * 表格项内容类型定义
 */
export interface ITableItem {
  label?: string; // 表格标题
  prop: string; // 字段
  type?: string; // 类型
  useSlot?: boolean; // 是否使用插槽
  [tableProp: string]: any;
}

// props
export interface ITableProps {
  tableItems: ITableItem[]; // 表格项
  tableConfig?: any; // 表格配置项信息
  tableCallback?: any; // 表格回调函数
  tableData: any[]; // 表格数据
}
