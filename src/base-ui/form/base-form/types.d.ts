/**
 * 表格项内容类型定义
 */
export interface IFormItem {
  field: string; // 字段
  type: IFormType; // 类型
  label: string; // 显示文本  --- deprecated
  default?: any; // 默认值
  hidden?: false; // 是否隐藏
  rules?: any[]; // 规则
  placeholder?: string;
  option?: any[]; // 选择器选项
  otherOption?: any; // 表单字段
}
