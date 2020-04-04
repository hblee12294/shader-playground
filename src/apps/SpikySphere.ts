import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  ShaderMaterial,
  SphereBufferGeometry,
  Color,
  BufferAttribute,
  MathUtils,
  BufferGeometry,
  TextureLoader,
  Texture,
  RepeatWrapping,
} from 'three'
import { resizeRendererToDisplaySize } from 'utils'

import waterURL from 'assets/water.jpg'

const vertext = `
  uniform float amplitude;

  attribute float displacement;

  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vNormal = normal;
    vUv= (0.5 + amplitude) * uv + vec2(amplitude);

    vec3 newPosition = position + amplitude * normal * vec3(displacement);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const fragment = `
  varying vec3 vNormal;
  varying vec2 vUv;

  uniform vec3 color;
  uniform sampler2D colorTexture;

  void main() {
    vec3 light = vec3(0.5, 0.2, 0.1);

    light = normalize(light);

    float dProd = dot(vNormal, light) * 0.5 + 0.5;

    vec4 tcolor = texture2D(colorTexture, vUv);
    vec4 gray = vec4(vec3(tcolor.r * 0.3 + tcolor.g * 0.59 + tcolor.b * 0.11), 1.0);

    gl_FragColor = gray * vec4(vec3(dProd) * vec3(color), 1.0);
  }
`

class App {
  private container: HTMLDivElement
  private renderer: WebGLRenderer
  private camera: PerspectiveCamera
  private scene: Scene
  private disposed: boolean
  private displacement: Float32Array
  private noise: Float32Array
  private sphere: Mesh
  private uniforms: {
    amplitude: { value: number }
    color: { value: Color }
    colorTexture: { value: Texture }
  }

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
    const position = (geometry.attributes as any).position

    this.displacement = new Float32Array(position.count)
    this.noise = new Float32Array(position.count)

    for (let i = 0; i < this.displacement.length; ++i) {
      this.noise[i] = Math.random() * 5
    }

    geometry.setAttribute('displacement', new BufferAttribute(this.displacement, 1))

    // Material
    this.uniforms = {
      amplitude: { value: 1.0 },
      color: { value: new Color(0xff2200) },
      colorTexture: { value: new TextureLoader().load(waterURL) },
    }
    this.uniforms.colorTexture.value.wrapS = this.uniforms.colorTexture.value.wrapT = RepeatWrapping

    const material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertext,
      fragmentShader: fragment,
    })

    this.sphere = new Mesh(geometry, material)
    this.scene.add(this.sphere)

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

    const time = Date.now() * 0.01

    this.sphere.rotation.y = this.sphere.rotation.z = 0.01 * time

    this.uniforms.amplitude.value = 2.5 * Math.sin(this.sphere.rotation.y * 0.125)
    this.uniforms.color.value.offsetHSL(0.0005, 0, 0)

    for (let i = 0; i < this.displacement.length; ++i) {
      this.displacement[i] = Math.sin(0.1 * i + time)

      this.noise[i] += 0.5 * (0.5 - Math.random())
      this.noise[i] = MathUtils.clamp(this.noise[i], -5, 5)

      this.displacement[i] += this.noise[i]
    }

    ;((this.sphere.geometry as BufferGeometry).attributes.displacement as BufferAttribute).needsUpdate = true

    this.renderer.render(this.scene, this.camera)

    requestAnimationFrame(this.tick)
  }
}

export default App
