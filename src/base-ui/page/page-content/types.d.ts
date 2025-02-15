// 表格内容类型
export interface IPageTableConfig {
  tableItems: ITableItem[];
  tableConfig?: {
    /**
     * 是否展示header
     */
    showHeader?: boolean;

    /**
     * 是否展示footer
     */
    showFooter?: boolean;

    /**
     * 表格配置项可选信息
     */
    options?: any;
  };
}

/**
 * 表格项类型定义
 */
export interface ITableItem {
  /**
   * 表格标题
   */
  label?: string;

  /**
   * 字段
   */
  prop: string;

  /**
   * 类型
   */
  type?: string;

  /**
   * 是否使用插槽
   */
  useSlot?: boolean;

  /**
   * 其他值
   */
  [tableProp: string]: any;
}

export interface IPageContentProps {
  pageTableConfig: IPageTableConfig; // 表格配置
  total: number; // 总条数
  tableData: any[]; // 表格数据
  pageSizes?: number[]; // 分页下拉选择
  page: { page: number; size: number; [item: string]: any }; // 分页
  showAdd?: boolean; // 是否展示添加按钮
  showEdit?: boolean; // 是否展示编辑按钮
  showDelete?: boolean; // 是否展示删除按钮

  /**
   * 是否以链接形式展示
   */
  showLink?: boolean;
}
