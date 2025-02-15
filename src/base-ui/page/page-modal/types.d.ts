// 表单内容类型
import type { IFormItem } from '@/base-ui/form/base-form/types';

export interface IPageFormConfig {
  formItems: IFormItem[];
  colLayout?: any;
  labelWidth: string;
}

export interface IPageModalProps {
  modalConfig: IPageFormConfig; // 弹窗内容
  defaultData?: any; // 默认数据
  title?: string; // 展示的标题
  primaryKey?: string; // 主键
  loading?: boolean; // 加载状态
}
