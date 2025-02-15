/**
 * 表单类型
 */
type IFormType =
  | 'input'
  | 'password'
  | 'email'
  | 'number'
  | 'select'
  | 'datepicker'
  | 'areapicker'
  | 'pageselect';

/**
 * form表单类型定义
 */
export interface IFormItem {
  /**
   * 字段
   */
  field: string;

  /**
   * 类型
   */
  type: IFormType;

  /**
   * 显示文本
   */
  label: string;

  /**
   * 默认值
   */
  default?: any;

  /**
   * 是否隐藏
   */
  hidden?: false;

  /**
   * 校验规则
   */
  rules?: any[];

  /**
   * 提示输入信息
   */
  placeholder?: string;

  /**
   * 选择器选项
   */
  option?: any[];

  /**
   * 表单字段
   */
  otherOption?: any;
}

export interface IPageSearchProps {
  /**
   * 表单项
   */
  formItems?: IFormItem[];

  /**
   * 标题
   */
  title?: string | boolean;

  /**
   * 加载中
   */
  loading?: boolean;
}
