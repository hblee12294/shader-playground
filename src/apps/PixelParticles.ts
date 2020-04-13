import { WebGLRenderer, PerspectiveCamera, Scene, Color, Geometry, ShaderMaterial, Vector3, Points } from 'three'
import { resizeRendererToDisplaySize } from 'utils'

const imageWidth = 640
const imageHeight = 360

const animationTime = 0
const animationDelta = 0.03

const vertex = `
  uniform float amplitude;
  
  attribute vec3 vertexColor;

  varying vec4 varColor;

  void main() {
    varColor = vec4(vertexColor, 1.0);

    vec4 pos = vec4(position, 1.0);
    pos.z *= amplitude;

    vec4 mvPosition = modelViewMatrix * pos;

    gl_PointSize = 1.0;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragment = `
  varying vec4 varColor;

  void main() {
    gl_FragColor = varColor;
  }
`

class App {
  private container: HTMLDivElement
  private renderer: WebGLRenderer
  private camera: PerspectiveCamera
  private scene: Scene
  private disposed: boolean
  private imageData!: Uint8ClampedArray
  private uniforms!: {
    amplitude: {
      value: number
    }
  }

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
    const zRange = 400

    const geometry = new Geometry()
    let x = imageWidth * -0.5
    let y = imageHeight * 0.5
    let c = 0
    // let index = 0

    const vertexColor = new Float32Array(imageHeight * imageWidth)

    for (let i = 0; i < imageHeight; i++) {
      for (let j = 0; j < imageWidth; j++) {
        const color = new Color()

        color.setRGB(this.imageData[c] / 255, this.imageData[c + 1] / 255, this.imageData[c + 2] / 255)
        // vertexColor[index] = color

        const weight = color.r * weights[0] + color.g * weights[1] + color.b * weights[2]

        const vertex = new Vector3()

        vertex.x = x
        vertex.y = y
        vertex.z = zRange * -0.5 + zRange * weight

        geometry.vertices.push(vertex)

        c += 4
        x++
      }

      x = imageWidth * -0.5
      y--
    }

    this.uniforms = {
      amplitude: { value: 0.5 },
    }

    const material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    const particles = new Points(geometry, material)

    this.scene.add(particles)
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
