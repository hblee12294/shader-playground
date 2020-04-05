import React, { useState, useEffect } from 'react'
import './Layout.scss'
import { Navigation } from 'baseui/side-navigation'
import { useHistory, useLocation } from 'react-router-dom'

import { navs } from 'configs'

const Layout: React.FC = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  const [activeItemId, setActiveItemId] = useState('')

  useEffect(() => {
    setActiveItemId(location.pathname)
  }, [location])

  return (
    <div className="layout">
      <div className="nav">
        <Navigation
          items={navs}
          activeItemId={activeItemId}
          onChange={({ event, item }) => {
            event.preventDefault()

            history.push(item.itemId)

            setActiveItemId(item.itemId)
          }}
        />
      </div>
      <main className="main">{children}</main>
    </div>
  )
}

export default Layout
