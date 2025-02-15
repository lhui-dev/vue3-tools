import type { IPageSearchProps } from '@/base-ui/page/page-search/types';

const searchConfig: IPageSearchProps = {
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '姓名',
      placeholder: '请输入姓名',
      default: '',
      otherOption: {
        clearable: true
      }
    },
    {
      type: 'select',
      field: 'gender',
      label: '性别',
      placeholder: '请选择性别',
      default: '',
      option: [
        {
          value: 1,
          label: '男'
        },
        {
          value: 2,
          label: '女'
        }
      ]
    }
  ],
  title: '请输入信息进行搜索'
};

export default searchConfig;
