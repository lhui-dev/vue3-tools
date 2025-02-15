import { type Ref, ref } from 'vue';

import PageModalComponent from '@/base-ui/page/page-modal/page-modal.vue';

type CallbackFn = (item?: any) => void;
type IModalParam = {
  createFn?: CallbackFn;
  editFn?: CallbackFn;
  modal?: any;
  defaultData?: object;
};

/**
 * 公用创建，编辑的逻辑
 * @member {Function} createFn 创建模态框打开回调
 * @member {Function} editFn 编辑模态框打开回调
 * @param {IModalParam} option
 * @returns
 */
export function usePageModal(option: IModalParam = {}) {
  if (!option.modal) {
    option.modal = PageModalComponent;
  }

  const pageModalRef = ref<InstanceType<typeof option.modal>>();
  const formData = ref<any>({});

  // 创建操作回调
  const handleCreate = (): void => {
    if (pageModalRef.value) {
      formData.value = {};
      // 设置默认值
      if (option.defaultData) {
        formData.value = { ...option.defaultData };
      }
      // 打开弹窗
      pageModalRef.value.dialogVisible = true;
    }
    option.createFn && option.createFn();
  };

  // 更新操作回调
  const handleUpdate = (data: any): void => {
    if (pageModalRef.value) {
      formData.value = data;
      // 关闭弹窗
      pageModalRef.value.dialogVisible = true;
    }
    option.editFn && option.editFn(data);
  };

  return {
    handleCreate,
    handleUpdate,
    pageModalRef,
    formData
  };
}

import { ElMessage } from 'element-plus';
import useLoading from '../common/useLoading.ts';

type CallbackAction = (item?: any) => Promise<any>;
type IModalActionParam = {
  createAction?: CallbackAction;
  editAction?: CallbackAction;
  deleteAction?: CallbackAction;
  callback?: CallbackFn;
  pageModalRef?: Ref<any>;
};

/**
 * 表格数据变更的hook
 * @member  {IModalActionParam} createAction 创建数据的api函数
 * @member {IModalActionParam} editAction 编辑数据的api函数
 * @member {IModalActionParam} deleteAction 删除数据的api函数
 * @member {IModalActionParam} deleteAction 数据完成修改后的回调函数
 */
export function usePageModalAction(option: IModalActionParam = {}) {
  let createPageDataAction;
  let updatePageDataAction;
  let deletePageDataAction;
  const [loading, startLoading, endLoading] = useLoading(false);
  if (option.createAction) {
    // 新增
    createPageDataAction = async (data: any) => {
      try {
        startLoading();
        const res = await option.createAction!(data);
        ElMessage.success('创建成功');
        if (option.pageModalRef && option.pageModalRef.value) {
          option.pageModalRef.value.dialogVisible = false;
        }
        option.callback && option.callback();
        return res;
      } catch (error) {
        console.log(error);
      } finally {
        endLoading();
      }
    };
  }

  if (option.editAction) {
    // 编辑
    updatePageDataAction = async (data: any) => {
      try {
        startLoading();
        const res = await option.editAction!(data);
        ElMessage.success('修改成功');
        if (option.pageModalRef && option.pageModalRef.value) {
          option.pageModalRef.value.dialogVisible = false;
        }
        option.callback && option.callback();
        return res.data;
      } catch (error) {
        console.log(error);
      } finally {
        endLoading();
      }
    };
  }

  if (option.deleteAction) {
    // 删除
    deletePageDataAction = async (data: any) => {
      try {
        startLoading();
        const res = await option.deleteAction!(data);
        ElMessage.success('删除成功');
        option.callback && option.callback();
        return res?.data;
      } catch (error) {
        console.log(error);
      } finally {
        endLoading();
      }
    };
  }

  const nullFoo = () => {};

  return {
    createPageDataAction: createPageDataAction || nullFoo,
    updatePageDataAction: updatePageDataAction || nullFoo,
    deletePageDataAction: deletePageDataAction || nullFoo,
    modalLoading: loading
  };
}
