import Image from 'next/image'
import React, { useState, useEffect, useContext } from 'react'
import OnlineUsers from './OnlineUsers'
import debounce from 'lodash.debounce'
import { Search } from '@mui/icons-material'
import { TextField, InputAdornment, IconButton, Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { IOnlineUsers } from '../../interfaces'
import { AuthContext } from '../../context/AuthContext'
import { AlertContext } from '../../context/AlertContext'
import { useRouter } from 'next/router'
import axios from 'axios'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

interface IProps {
  selectedUser: { username: string; avatar: string; email: string }
  handleUserClick: (username: string, avatar: string, email: string) => void
  onlineUsers: IOnlineUsers[]
  getUnseenMsgs: (receiver: string) => number
}

const OnlineScreen: React.FC<IProps> = (props) => {
  const { selectedUser, handleUserClick, onlineUsers, getUnseenMsgs } = props
  const [search, setSearch] = useState<string>('')
  const [filterdUsers, setFilteredUsers] = useState<IOnlineUsers[]>([])
  const { user, setUser, setAuth } = useContext(AuthContext)
  const { setShow, setSeverity, setMessage } = useContext(AlertContext)
  const router = useRouter()

  useEffect(() => {
    let willUnmount = false
    if (willUnmount === false) {
      const filteredItems = getFilterdSearch(search, onlineUsers)
      setFilteredUsers([...filteredItems])
    }
    return () => {
      willUnmount = true
    }
  }, [search, onlineUsers])

  const getFilterdSearch = (
    search: string,
    onlineUsers: IOnlineUsers[]
  ): IOnlineUsers[] => {
    return onlineUsers.filter((user) =>
      user.name.toLowerCase().includes(search.trim().toLowerCase())
    )
  }

  //search field handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim())
  }

  const optimisedSearch = debounce(handleSearch, 500)

  //logout handler
  const handleLogout = async () => {
    console.log('clicked')
    try {
      const axiosRes = await axios.get('/api/logout', { withCredentials: true })
      setAuth(axiosRes.data.auth)
      setUser(null)
      setMessage(axiosRes.data.message)
      setSeverity('success')
      setShow(true)
      router.replace('/chat')
    } catch (e: any) {
      const errorMsg = e?.response?.data?.error?.message ?? e?.message
      setMessage(errorMsg)
      setSeverity('error')
      setShow(true)
    }
  }

  return (
    <div className="bg-gray-800 h-screen p-3 md:border-r-2 md:border-gray-200 md:col-start-1 md:col-end-4 flex flex-col">
      {/* --- search box area ---  */}
      <ThemeProvider theme={darkTheme}>
        <TextField
          id="search"
          name="search"
          type="text"
          variant="outlined"
          placeholder="Search..."
          onChange={optimisedSearch}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ThemeProvider>

      {/* --- online users list --- */}
      <ul className="mt-4 text-white overflow-x-hidded overflow-y-auto">
        {filterdUsers.length > 0 ? (
          filterdUsers.map((user) => {
            return (
              <OnlineUsers
                key={user.id}
                name={user.name}
                avatar={user.avatar}
                email={user.email}
                selectedUser={selectedUser}
                handleUserClick={handleUserClick}
                getUnseenMsgs={getUnseenMsgs}
              />
            )
          })
        ) : (
          <div className="flex justify-center items-center mt-4 text-gray-200 font-semibold tracking-wider">
            No Active Users
          </div>
        )}
      </ul>

      {/*--- user profile ---*/}
      {user && (
        <div className="mt-auto text-white flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2 py-2">
            <Image
              src={user.avatar}
              alt="profile image"
              height={34}
              width={34}
              className="aspect-square rounded-full"
            />
            <p>{user.name}</p>
          </div>
          <Button
            variant="contained"
            size="small"
            aria-label="logout-btn"
            className="bg-blue-500 capitalize"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}

export default OnlineScreen
