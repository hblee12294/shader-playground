import { Navs, NavConfig, Routes, RouteConfig } from 'types'

const transNavsToRoutes = (navs: Navs) => {
  const initialRoutes: (NavConfig | RouteConfig)[] = []

  return navs.reduce((prev, { itemId, component, subNav, ...routeProps }) => {
    if (component && itemId) {
      delete routeProps.title

      prev.concat({
        component,
        itemId,
        ...routeProps,
      })
    }

    if (subNav) {
      prev = prev.concat(subNav)
    }

    return prev
  }, initialRoutes) as Routes
}

export default transNavsToRoutes
