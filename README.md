# Vue3 Tools

    封装一些常用的vue3一些组件和小工具

# 依赖

- axios
- vue-router4
- pinia
- element-plus
- prettier
- vite-plugin-vue-devtools
- nprogress
- unplugin-auto-import
- unplugin-vue-components
- echarts

# hooks工具使用

- echarts图标

```ts
import { useEcharts } from './useEcharts'

const echarts = useEcharts()
```

### Boolean类型

- 函数定义
```ts
import { type Ref, ref } from 'vue'

type IFunType = () => void

/**
 * 布尔类型的hook方法
 * @param initValue 初始值
 * @returns 一个元组[值,置为true,置为false,取反]
 * @author Lee
 */
export default function useBoolean(initValue: boolean = false): [Ref<boolean>, IFunType, IFunType, IFunType] {
  const bool = ref(initValue)

  /**
   * 置为true
   */
  function setTrue(): void {
    bool.value = true
  }

  /**
   * 置为false
   */
  function setFalse(): void {
    bool.value = false
  }

  /**
   * 取反
   */
  function toggle(): void {
    bool.value = !bool.value
  }

  return [bool, setTrue, setFalse, toggle] as [Ref<boolean>, IFunType, IFunType, IFunType]
}
```

- 引入使用
```ts
import useBoolean from './useBoolean'

const initValue: boolean = false
const [loading, startLoading, endLoading] = useBoolean(initValue)
```


### Loading

- 函数定义
```ts
import type { Ref } from 'vue'

function useLoading(initValue: boolean = false) {
  const [loading, startLoading, endLoading] = useBoolean(initValue)
  return [loading, startLoading, endLoading] as [
    Ref<boolean>,
    () => void,
    () => void
  ]
}
```

- 引入使用
```ts
import useLoading from './useLoading'

/**
 *  加载中 
 */
const [loading, startLoading, endLoading] = useLoading(false)
```
