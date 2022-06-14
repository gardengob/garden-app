import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'

export default function Media() {
  const CAMERA_POSITION: Component3dName = 'memories'

  const router = useRouter()

  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
  }, [])
}
