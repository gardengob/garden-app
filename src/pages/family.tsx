/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useState } from 'react'
import Account from '../components/account/Account'
import AddFamily from '../components/addFamily/AddFamily'
import RippedPaper from '../components/rippedPaper/RippedPaper'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { merge } from '../utils/arrayUtils'
import { supabase } from '../utils/supabaseClient'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'
import css from './family.module.scss'

export default function Family() {
  const CAMERA_POSITION: Component3dName = 'portal'
  const [session, setSession] = useState(null)
  useEffect(() => {
    localStorage.setItem('display3D', 'false')
    localStorage.setItem('lockScroll', 'true')
    localStorage.setItem('initiated', 'false')

    setSession(supabase.auth.session())
  }, [])

  return (
    <div
      className={merge([css.root, 'garden-ui'])}
      style={{ padding: '100px 50px' }}
    >
      <h1 className={css.title}>Rejoindre un jardin</h1>
      {session && <Account key={session.user.id} session={session} />}

      <button className={css.add}>
        <img className={css.icon} src={`/images/icons/plus.svg`} alt="" />
        Ajouter une famille
      </button>

      <div className={css.ripped}>
        <RippedPaper />
      </div>
    </div>
  )
}
