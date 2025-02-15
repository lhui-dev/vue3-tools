import { type Ref, ref } from 'vue';

type IFunType = () => void;

/**
 * 布尔类型的hook方法
 * @param initValue 初始值
 * @returns 一个元组[值,置为true,置为false,取反]
 * @author Lee
 */
export default function useBoolean(
  initValue: boolean = false
): [Ref<boolean>, IFunType, IFunType, IFunType] {
  const bool = ref(initValue);

  function setTrue(): void {
    bool.value = true;
  }

  function setFalse(): void {
    bool.value = false;
  }

  function toggle(): void {
    bool.value = !bool.value;
  }

  return [bool, setTrue, setFalse, toggle] as [Ref<boolean>, IFunType, IFunType, IFunType];
}
