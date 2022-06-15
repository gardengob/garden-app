import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RoutingCameraService from '../services/events/RoutingCameraService'
import SpaceEntryService from '../services/events/SpaceEntryService'
import WebglService from '../services/events/WebglService'
import { AppManager } from '../webGL/webGLArchitecture/Classes/AppManager/AppManager'

export default function Garden() {
  const [intro, setIntro] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    WebglService.enable3D()
    console.log('gardenInit')
    localStorage.setItem(
      'lockScroll',
      router.query.withIntro ? 'true' : 'false'
    )
    localStorage.setItem('display3D', 'true')

    SpaceEntryService.gardenEntrySignal.on(() => {
      setIntro(true)
    })
  }, [])
  return (
    <>
      {!intro && router.query.withIntro && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '33%',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px 20px',
              color: 'black',
              backgroundColor: 'white',
              borderRadius: '32px',
            }}
          >
            Jardin machin bidule
          </div>
          <button
            style={{
              position: 'absolute',
              top: '66%',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px 20px',
              color: 'black',
              backgroundColor: 'white',
              borderRadius: '32px',
            }}
            onClick={() => {
              SpaceEntryService.enterGarden()
            }}
          >
            Entrer
          </button>
        </>
      )}
    </>
  )
}
