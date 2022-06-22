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
          <div className={css.content}>
            <h1 className={css.title}>Bienvenue {username},</h1>
            <p className={css.description}>
              <span>
                Créez, découvrez, apprenez et participez à la vie culinaire de
                votre famille
              </span>
              <span>
                avec Finebouche ! Partagez vos recettes, conseils et bien plus
                dans cette
              </span>
              <span>
                expérience entièrement familiale conçue pour chaque génération.
              </span>
            </p>
            <Link href="family">
              <a className={css.button}>Commencer</a>
            </Link>
          </div>
        </div>
      )}
      <div className={css.ripped}>
        <RippedPaper />
      </div>
    </div>
  )
}
