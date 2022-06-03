import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import RoutingCameraService from '../services/events/RoutingCameraService'
import SpaceEntryService from '../services/events/SpaceEntryService'

const Garden3d = dynamic(import('../components/garden3d/Garden3d'), {
  ssr: false,
})

export default function Garden() {
  const [intro, setIntro] = useState<boolean>(false)
  const CAMERA_POSITION = 'start'
  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)

    SpaceEntryService.gardenEntrySignal.on(() => {
      setIntro(true)
    })
  }, [])
  return (
    <>
      {!intro && (
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
      {/* <Garden3d /> */}
    </>
  )
}
