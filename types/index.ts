import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { ReactElement, ReactNode } from 'react'

export type cardType = {
  id?: number
  cardTitle: string
  description: string
  icon: React.ReactNode
}

export type navbarLinkType = {
  id?: number
  link: string
  linkName: string
}

export type progressBarType = {
  id?: number
  skillName: string
  width: number
}

export type educationCardType = {
  id?: number
  cardTitle: string
  place: string
  startDate: string
  endDate: string
  cardDescription: string
}

export type experienceCardType = {
  id?: number
  cardTitle: string
  startDate: string
  endDate: string
  responsibility: string[]
}

export type Anchor = 'top' | 'left' | 'bottom' | 'right'

export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout<T> = AppProps & {
  Component: NextPageWithLayout<T>
}

export type MovieData = {
  key?: number | string
  adult: boolean
  backdrop_path?: string
  id?: number
  original_language?: string
  original_title?: string
  overview: string
  popularity: number
  poster_path: string
  release_data?: string
  title: string
  video?: boolean
}

export type MoviesProp = {
  movieData: {
    page: number
    results: MovieData[]
  }
}

export type registerInputType = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type inputErrorHelperType = {
  param: string
  msg: string
}

export type loginInputType = {
  email: string
  password: string
}

export type UserType = {
  userId: string
  name: string
  email: string
  avatar: string
  accessToken: string | null
} | null

export type ProductType = {
  _id: string
  img: string
  title: string
  mrp: number
  price: number
  details: string
}
