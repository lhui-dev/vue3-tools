import echarts from '@/plugins/echarts';
import type { ECOption, IThemeType, RendererType } from '../../types';

export function useEcharts(
  el: HTMLElement,
  renderType: RendererType = 'svg',
  theme: IThemeType = 'light'
) {
  // 创建echarts实例
  const echartsInstance = echarts.init(el, theme, { renderer: renderType });

  const setOptions = (options: ECOption) => {
    echartsInstance.setOption(options);
  };

  const setResize = () => {
    echartsInstance.resize();
  };

  window.addEventListener('resize', () => {
    echartsInstance.resize();
  });

  return {
    echartsInstance,
    setOptions,
    setResize
  };
}
