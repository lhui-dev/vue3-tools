import { ref } from 'vue';
import useLoading from '../common/useLoading.ts';

/** 回调行为 */
type CallbackAction = (item?: any) => Promise<any>;

/** 模型参数 */
type IModalParam = {
  queryAction: CallbackAction; // 查询询问
  modal?: any; // 弹窗
};

// 默认分页参数
const defaultPageNum = 1;
const defaultPageSize = 10;

/**
 * 用户分页查询
 * @param option
 * @returns
 */
export function usePageSearch(option: IModalParam) {
  /** 表格数据 */
  const tableData = ref([]);
  /** 总记录数 */
  const total = ref(0);
  /** 加载中 */
  const [loading, startLoading, endLoading] = useLoading(false);
  /** 搜索数据 */
  const searchRef = option.modal ? ref<InstanceType<typeof option.modal>>() : ref();
  /** 查询参数 */
  const searchParams = ref<{ page: number; size: number; [key: string]: any }>({
    page: defaultPageNum,
    size: defaultPageSize
  });

  /**
   * 查询数据行为
   * @param searchParams 搜索携带参数
   */
  const queryDataAction = async (searchParams: any = {}) => {
    try {
      startLoading();
      const { data: res } = await option.queryAction(searchParams);
      console.log('page search result: ', res);
      tableData.value = res?.rows;
      total.value = res.count;
      return res;
    } catch (error) {
      console.error('query data occur error...', error);
    } finally {
      endLoading();
    }
  };
  /**
   * 搜索回调
   * @param args 参数
   */
  const handleSearch = async (args: any = {}) => {
    searchParams.value = {
      page: searchParams.value.page,
      size: searchParams.value.size,
      ...args
    };
    await queryDataAction(searchParams.value);
  };

  /**
   * 页面变更回调
   * @param pageInfo 分页信息
   */
  const pageChange = async (pageInfo: { page?: number; size?: number }): Promise<void> => {
    if (pageInfo.page) {
      searchParams.value.page = pageInfo.page;
    }
    if (pageInfo.size) {
      searchParams.value.size = pageInfo.size;
    }
    await queryDataAction(searchParams.value);
  };

  return {
    searchLoading: loading,
    tableData,
    total,
    searchParams,
    searchRef,
    handleSearch,
    pageChange,
    queryDataAction
  };
}
