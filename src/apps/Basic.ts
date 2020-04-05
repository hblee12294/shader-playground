import { WebGLRenderer, PerspectiveCamera, Scene, Color, SphereBufferGeometry, ShaderMaterial, Mesh } from 'three'
import { resizeRendererToDisplaySize } from 'utils'

const vertex = `
  varying vec3 vNormal;

  void main() {
    vNormal = normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragment = `
  varying vec3 vNormal;

  void main() {
    vec3 light = vec3(0.5, 0.2, 0.1);

    light = normalize(light);

    float dProd = max(0.0, dot(vNormal, light));

    gl_FragColor = vec4(dProd, dProd, dProd, 1.0);
  }
`

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

    // Geometry
    const geometry = new SphereBufferGeometry(50, 128, 64)

    // Material
    const material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    const sphere = new Mesh(geometry, material)
    this.scene.add(sphere)

    this.disposed = false
  }

  init = () => {
    this.tick()
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
