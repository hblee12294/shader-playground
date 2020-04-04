import { WebGLRenderer, PerspectiveCamera, Scene, Mesh, MeshBasicMaterial, SphereBufferGeometry, Color } from 'three'
import { resizeRendererToDisplaySize } from 'utils'

class App {
  private container: HTMLDivElement
  private renderer: WebGLRenderer
  private camera: PerspectiveCamera
  private scene: Scene
  private disposed: boolean

  constructor(container: HTMLDivElement) {
    this.container = container

    this.renderer = new WebGLRenderer()
    this.container.append(this.renderer.domElement)

    this.camera = new PerspectiveCamera(45, container.clientHeight / container.clientWidth, 0.1, 10000)
    this.camera.position.z = 300

    this.scene = new Scene()
    this.scene.background = new Color(0x101010)

    // create objects
    const geometry = new SphereBufferGeometry(50, 16, 16)
    const material = new MeshBasicMaterial({ color: 0x0000ff })

    const sphere = new Mesh(geometry, material)
    this.scene.add(sphere)

    this.disposed = false
  }

  init = () => {
    this.tick()
  }

  dispose() {
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
