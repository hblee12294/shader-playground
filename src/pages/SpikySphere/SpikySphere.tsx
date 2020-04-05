import React, { useRef, useEffect } from 'react'
import './SpikySphere.scss'

import App from 'apps/SpikySphere'

const SpikySphere: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current as HTMLDivElement

    const app = new App(root)
    app.init()

    return () => {
      app.dispose()
    }
  }, [])

  return <div className="spiky-sphere" ref={rootRef}></div>
}

export default SpikySphere
