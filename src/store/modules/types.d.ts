/**
 * app的store类型定义
 */
export interface IApplicationState {
  /**
   * 客户端类型
   */
  deviceType: IDeviceType;

  /**
   * 组件大小（参考element-plus的组件大小定义）
   */
  componentSize: IComponentSize;

  /**
   * 主题：暗黑，白色
   */
  theme: IThemeType;

  /**
   * 侧边栏状态: 默认打开
   */
  isCollapse: boolean;
}

type IComponentSize = 'large' | 'default' | 'small' | string;
type IDeviceType = 'pc' | 'ios' | 'ipad' | string;
type IThemeType = 'white' | 'dark' | string;
