import { FC } from 'react'
import { RouteProps } from 'react-router-dom'

export interface NavConfig extends RouteProps {
  title: string
  itemId?: string
  component?: FC
  subNav?: NavConfig[]
}

export type Navs = NavConfig[]

export interface RouteConfig extends Omit<NavConfig, 'title' | 'subNav'> {
  itemId: string
}

export type Routes = RouteConfig[]
