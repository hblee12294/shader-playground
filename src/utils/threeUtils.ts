import { WebGLRenderer } from 'three'

export const resizeRendererToDisplaySize = (renderer: WebGLRenderer) => {
  const canvas = renderer.domElement
  const pixelRatio = window.devicePixelRatio
  const width = (canvas.clientWidth * pixelRatio) | 0
  const height = (canvas.clientHeight * pixelRatio) | 0

  const needResize = canvas.width !== width || canvas.height !== height

  if (needResize) {
    renderer.setSize(width, height, false)
  }

  return needResize
}
