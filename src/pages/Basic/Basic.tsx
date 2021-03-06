import React, { useRef, useEffect } from 'react'

import App from 'apps/Basic'

const Basic: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current

    if (!root) return

    const app = new App(root)
    app.init()

    return () => {
      app.dispose()
    }
  }, [])

  return <div className="canvas-root" ref={rootRef}></div>
}

export default Basic
