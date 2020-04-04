import React, { useState } from 'react'
import './Layout.scss'

import { Navigation } from 'baseui/side-navigation'

const Layout: React.FC = ({ children }) => {
  const [activeItemId, setActiveItemId] = useState('#SpikySphere')

  return (
    <div className="layout">
      <div className="nav">
        <Navigation
          items={[
            {
              title: 'Spiky Sphere',
              itemId: '#SpikySphere',
            },
          ]}
          activeItemId={activeItemId}
          onChange={({ item }) => setActiveItemId(item.itemId)}
        />
      </div>
      <main className="main">{children}</main>
    </div>
  )
}

export default Layout
