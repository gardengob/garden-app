import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import RoutingCameraService from '../services/events/RoutingCameraService'
import UiService from '../services/events/UiService'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'

export default function Profils() {
  const CAMERA_POSITION: Component3dName = 'tree'
  const [displayUI, setDisplayUI] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    console.log('tree useEffect Triggered')
    RoutingCameraService.goTo(CAMERA_POSITION)
    UiService.displayUisignal.on((uiTodisplay) => {
      setDisplayUI(true)
      RoutingCameraService.toggle3D(false)
    })
  }, [])
  return (
    displayUI && (
      <div style={{ position: 'relative', zIndex: '10' }}>
        testpoii
        <div>testpoii</div>
        <div>testpoii</div>
        <div>testpoii</div>
        <div>testpoii</div>
        <div>testpoii</div>
        <div>testpoii</div>
        <div>testpoii</div>
        <div>testpoii</div>
        <button
          onClick={() => {
            RoutingCameraService.toggle3D(true)
            router.push('garden')
          }}
        >
          quitter
        </button>
      </div>
    )
  )
}
