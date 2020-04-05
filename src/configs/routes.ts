import { Routes } from 'types'
import { Basic, SpikySphere } from 'pages'

const routes: Routes = [
  {
    path: '/basic',
    exact: true,
    title: 'Basic',
    page: Basic,
  },
  {
    path: '/spiky_sphere',
    exact: true,
    title: 'Spiky Sphere',
    page: SpikySphere,
  },
]

export default routes
