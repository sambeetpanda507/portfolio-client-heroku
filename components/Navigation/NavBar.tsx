import React, { FC, useEffect, useRef } from 'react'
import { navbarLinkType } from '../../types'
import { NavLinks } from './NavLinks'
import { MobileNav } from './MobileNav'

const navLinks: navbarLinkType[] = [
  {
    id: 1,
    link: '/',
    linkName: 'Home',
  },
  {
    id: 2,
    link: '/#about',
    linkName: 'About',
  },
  {
    id: 3,
    link: '/#skills',
    linkName: 'Skills',
  },
  {
    id: 5,
    link: '/#projects',
    linkName: 'Projects',
  },
  {
    id: 4,
    link: '/#experiences',
    linkName: 'Experiences',
  },
  {
    id: 6,
    link: '/#contacts',
    linkName: 'Contacts',
  },
]

const NavBar: FC = () => {
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        navRef.current?.classList.add('shadow-md')
      } else {
        navRef.current?.classList.remove('shadow-md')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="px-5 md:pt-7 md:pb-5 sticky top-0 left-0 w-full bg-white z-10"
    >
      {/* desktop nav */}
      <ul className="hidden justify-center gap-12 text-lg font-semibold text-gray-800  md:flex">
        {navLinks.map((value) => {
          return (
            <NavLinks
              key={value.id}
              link={value.link}
              linkName={value.linkName}
            />
          )
        })}
      </ul>

      {/* mobile navigation drawer */}
      <MobileNav />
    </nav>
  )
}

export default NavBar
