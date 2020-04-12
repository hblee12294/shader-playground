import { Navs } from 'types'
import { Basic, SpikySphere, PixelParticles } from 'pages'

const navs: Navs = [
  {
    title: 'Sphere',
    subNav: [
      {
        title: 'Basic Sphere',
        itemId: '/basic_sphere',
        exact: true,
        component: Basic,
      },
      {
        title: 'Spiky Sphere',
        itemId: '/spiky_sphere',
        exact: true,
        component: SpikySphere,
      },
    ],
  },
  {
    title: 'Particles',
    subNav: [
      {
        title: 'Pixel Particles',
        itemId: '/pixel_particles',
        exact: true,
        component: PixelParticles,
      },
    ],
  },
]

export default navs
