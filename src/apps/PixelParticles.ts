import { WebGLRenderer, PerspectiveCamera, Scene, Color } from 'three'
import { resizeRendererToDisplaySize } from 'utils'

const imageWidth = 640
const imageHeight = 360

const animationTime = 0
const animationDelta = 0.03

class App {
  private container: HTMLDivElement
  private renderer: WebGLRenderer
  private camera: PerspectiveCamera
  private scene: Scene
  private disposed: boolean
  private imageData: Uint8ClampedArray | null = null

  constructor(container: HTMLDivElement) {
    this.container = container

    this.renderer = new WebGLRenderer()
    this.container.append(this.renderer.domElement)

    this.camera = new PerspectiveCamera(45, container.clientHeight / container.clientWidth, 0.1, 10000)
    this.camera.position.z = 3000

    this.scene = new Scene()
    this.scene.background = new Color(0x101010)

    this.disposed = false
  }

  createPixelData = () => {
    const image = document.createElement('img')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) return

    image.crossOrigin = 'Anonymous'
    image.onload = () => {
      image.width = canvas.width = imageWidth
      image.height = canvas.height = imageHeight

      context.createPattern(image, 'no-repeat')
      context.fillRect(0, 0, imageWidth, imageHeight)

      this.imageData = context.getImageData(0, 0, imageWidth, imageHeight).data
    }

    image.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/tree_star.jpg'
  }

  createParticles = () => {
    const colors = []
    const weights = [0.2126, 0.7152, 0.0722]
    let c = 0
  }

  init = () => {
    // this.tick()
  }

  dispose = () => {
    this.disposed = true
  }

  tick = () => {
    if (this.disposed || !this) return

    if (resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.tick)
  }
}

export default App
