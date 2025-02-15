import type { Ref } from 'vue';
import useBoolean from './useBoolean.ts';

/**
 * 加载中的hook方法
 * @param {Boolean} initValue 初始值
 * @returns 一个元组[值,置为true,置为false,取反]
 * @author Lee
 */
export default function useLoading(initValue: boolean = false) {
  const [loading, startLoading, endLoading] = useBoolean(initValue);
  return [loading, startLoading, endLoading] as [Ref<boolean>, () => void, () => void];
}
