import css from './index.module.scss'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/auth/Auth'
import Account from '../components/account/Account'
import { useRouter } from 'next/router'
import UserService from '../services/UserService'
import RoutingCameraService from '../services/events/RoutingCameraService'
import UiService from '../services/events/UiService'
import { merge } from '../utils/arrayUtils'

export default function Home() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    localStorage.setItem('display3D', 'false')
    localStorage.setItem('lockScroll', 'true')
    localStorage.setItem('initiated', 'false')
  }, [])

  useEffect(() => {
    setSession(supabase.auth.session())
    console.log('fart')
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (session) {
      UserService.getProfile().then((profile) => {
        setUsername(profile.username)
      })
    }
  }, [session])

  return (
    <div
      className={merge([css.container, 'garden-ui'])}
      style={{ padding: '100px 50px' }}
    >
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  )
}
