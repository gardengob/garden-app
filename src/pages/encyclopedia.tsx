import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'

export default function Encyclopedia() {
  const CAMERA_POSITION: Component3dName = 'vegetable_garden'

  const router = useRouter()
  useEffect(() => {
    localStorage.setItem('display3D', 'true')
  }, [])
  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
  }, [])
}
