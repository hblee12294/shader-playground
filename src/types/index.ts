import { FC } from 'react'
import { RouteProps } from 'react-router-dom'

export interface RouteConfig extends RouteProps {
  path: string
  title: string
  page: FC
}

export type Routes = RouteConfig[]
