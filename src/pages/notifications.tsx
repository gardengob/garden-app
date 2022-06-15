import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'
import css from './notifications.module.scss'

export default function Notifications() {
  const CAMERA_POSITION: Component3dName = 'mail_box'

  const router = useRouter()

  useEffect(() => {
    localStorage.setItem('display3D', 'true')
  }, [])

  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
    localStorage.setItem('lockScroll', 'true')
  }, [])

  return (
    <div className={css.root}>
      Notifications
    </div>
  )
}
