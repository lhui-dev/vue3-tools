/**
 * NProgress进度条工具类
 * @author 李少辉
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * 全局进度条的配置
 */
NProgress.configure({
  easing: 'ease', // 动画样式
  speed: 300, // 递增进度条的速度
  showSpinner: false, // 是否显示加载icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body' // 指定进度条的父容器
});

/**
 * 打开进度条
 */
const startNProgress = () => {
  NProgress.start();
};

/**
 * 关闭进度条
 */
const closeNProgress = () => {
  NProgress.done();
};

export { startNProgress, closeNProgress };
