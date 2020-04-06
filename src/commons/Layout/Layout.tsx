import React, { useState, useEffect } from 'react'
import './Layout.scss'
import { withStyle } from 'baseui'
import { Navigation, StyledNavItem } from 'baseui/side-navigation'
import { useHistory, useLocation } from 'react-router-dom'

import { navs } from 'configs'

const CustomStyledNavItem = withStyle(StyledNavItem, ({ $theme, $level }: any) => ({
  paddingTop: $theme.sizing.scale300,
  paddingBottom: $theme.sizing.scale300,
  paddingRight: $theme.sizing.scale900,
  // ...(!$hasItemId || $level === 1
  ...($level === 1
    ? {
        textTransform: 'uppercase',
        ...$theme.typography.font350,
      }
    : {
        ...$theme.typography.font250,
      }),
}))

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

            if (location.pathname === item.itemId) return

            history.push(item.itemId)
            setActiveItemId(item.itemId)
          }}
          overrides={{
            NavItem: CustomStyledNavItem,
          }}
        />
      </div>
      <main className="main">{children}</main>
    </div>
  )
}

export default Layout
