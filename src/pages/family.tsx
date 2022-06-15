import { useEffect, useLayoutEffect, useState } from 'react'
import AddFamily from '../components/addFamily/AddFamily'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { merge } from '../utils/arrayUtils'
import { supabase } from '../utils/supabaseClient'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'
import css from './family.module.scss'

export default function Family() {
  const CAMERA_POSITION: Component3dName = 'portal'

  useEffect(() => {
    localStorage.setItem('display3D', 'true')
  }, [])

  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
  }, [])

  return (
    <div className={merge([css.root, 'garden-ui'])} style={{ padding: '100px 50px' }}>
      <AddFamily />
    </div>
  )
}
