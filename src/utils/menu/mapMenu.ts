import type { RouteRecordRaw } from 'vue-router';

/**
 * 加载本地路由定义信息
 */
function loadLocalRoutes(): RouteRecordRaw[] {
  // 动态获取所有路由对象，放到数组中
  // 每个路由对象都存放在独立的文件中
  const localRoutes: RouteRecordRaw[] = [];

  // 动态加载文件
  const files: Record<string, any> = import.meta.glob('@/router/**/*.ts', {
    eager: true
  })

  // 从文件中将所有路由对象先读取到数组中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}


/**
 * 将用户菜单信息映射成路由信息
 * @param userMenus 用户菜单信息
 */
export function mapMenuToRoutes(userMenus: any): RouteRecordRaw[] {
  // 加载本地路由
  const localRoutes = loadLocalRoutes();
  // 根据菜单匹配动态路由
  const matchedRoutes: RouteRecordRaw[] = [];
  for (const userMenu of userMenus) {
    for (const subMenu of userMenu.children) {
      // 匹配符合条件的菜单信息
      const matchedRoute = localRoutes.find(item => {
        return item.path === subMenu.url
      })
      if (matchedRoute) {
        // 给matchedRoutes的顶层菜单添加重定向属性（但是只需添加一次即可）
        if (!matchedRoutes.find(item => item.path === userMenu.url)) {
          matchedRoutes.push({ path: userMenu.url, redirect: matchedRoute.path })
        }
        matchedRoutes.push(matchedRoute)
      }
    }
  }

  return matchedRoutes;
}
