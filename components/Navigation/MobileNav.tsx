import React, { FC, useState } from 'react'
import Link from 'next/link'
import MobileMenu from '../Icons/MobileMenu'
import { navbarLinkType } from '../../types'
import {
  Box,
  SwipeableDrawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material'
import { WorkspacesRounded } from '@mui/icons-material'

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

const MobileLinks: React.FC<navbarLinkType> = ({ link, linkName }) => {
  return (
    <Link href={link}>
      <a>
        <ListItem button key={linkName}>
          <ListItemIcon>
            <WorkspacesRounded />
          </ListItemIcon>
          <ListItemText primary={linkName} />
        </ListItem>
      </a>
    </Link>
  )
}

export const MobileNav: FC = () => {
  const [state, setState] = useState({
    right: false,
  })

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ right: open })
    }

  const list = () => {
    return (
      <Box
        sx={{ width: 220 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {navLinks.map((link) => {
            return (
              <MobileLinks
                key={link.id}
                link={link.link}
                linkName={link.linkName}
              />
            )
          })}
        </List>
      </Box>
    )
  }

  return (
    <React.Fragment key={'right'}>
      {/* mobile nav */}
      <div className="text-right flex justify-end p-1 md:hidden">
        <IconButton onClick={toggleDrawer(true)}>
          <MobileMenu />
        </IconButton>
      </div>
      <SwipeableDrawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  )
}
