/* eslint-disable @next/next/no-img-element */
import css from './index.module.scss'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/auth/Auth'
import Account from '../components/account/Account'
import { useRouter } from 'next/router'
import UserService from '../services/UserService'
import RoutingCameraService from '../services/events/RoutingCameraService'
import UiService from '../services/events/UiService'
import { merge } from '../utils/arrayUtils'
import Link from 'next/link'
import RippedPaper from '../components/rippedPaper/RippedPaper'

import Lottie from 'lottie-web'
import condomJson from '../lotties/anim-onboarding.json'

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
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    console.log('session', session)
    if (session) {
      UserService.getProfile().then((profile) => {
        setUsername(profile.username)
      })
    }
  }, [session])

  return (
    <div
      className={merge([css.root, 'garden-ui'])}
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
          <img
            className={css.plants}
            src="/images/ui/decors_plantes.png"
            alt=""
          />
          <img className={css.logo} src="/images/ui/logotype.png" alt="" />
          <h1 className={css.title}>Bienvenue cher visiteur,</h1>
          <p className={css.description}>
            <span>
              Finebouche est encore en phase de développement.
            </span>
            <span>
              Le projet est très prometteur mais nécessite encore un peu de maturation.
            </span>
            <span>
              Un peu comme une bonne marinade finalement.
            </span>
          </p>
        </div>
      )}
      <div className={css.ripped}>
        <RippedPaper />
      </div>
    </div>
  )
}
