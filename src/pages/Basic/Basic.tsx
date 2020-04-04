import React, { useRef, useEffect } from 'react'
import './Basic.scss'

import App from 'apps/basic'

const Shader: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current as HTMLDivElement

    const app = new App(root)
    app.init()
  }, [])

  return <div className="basic" ref={rootRef}></div>
}

export default Shader
