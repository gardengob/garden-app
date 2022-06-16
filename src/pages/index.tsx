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
import Link from 'next/link'

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Bienvenue</h1>
          <p
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span>
              Créez, découvrez, apprenez et participez à la vie culinaire de
              votre famille
            </span>
            <span>
              avec FineBouche ! Partagez vos recettes, conseils et bien plus
              dans cette
            </span>
            <span>
              expérience entièrement familiale conçue pour chaque génération.
            </span>
          </p>
          <Link href="family">
            <a
              style={{
                padding: ' 12px 24px',
                marginTop: '24px',
                borderRadius: '6px',
                backgroundColor: '#75a37d',
                color: 'white',
              }}
            >
              Commencer
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}
