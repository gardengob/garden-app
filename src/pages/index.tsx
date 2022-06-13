import css from './index.module.scss'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/auth/Auth'
import Account from '../components/account/Account'
import { useRouter } from 'next/router'
import UserService from '../services/UserService'
import RoutingCameraService from '../services/events/RoutingCameraService'
import UiService from '../services/events/UiService'

export default function Home() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    RoutingCameraService.toggle3D(false)
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
    <div className={css.container} style={{ padding: '100px 50px' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  )
}
