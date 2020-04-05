import navs from './navs'
import { transNavsToRoutes } from 'utils'
import { Routes } from 'types'

const routes: Routes = transNavsToRoutes(navs)

export default routes
