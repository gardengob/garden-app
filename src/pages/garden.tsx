import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import RoutingCameraService from '../services/events/RoutingCameraService'

const Garden3d = dynamic(import('../components/garden3d/Garden3d'), {
  ssr: false,
})

export default function Garden() {
  const CAMERA_POSITION = 'start'
  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
  }, [])
  return (
    <>
      <div>test</div>
      {/* <Garden3d /> */}
    </>
  )
}
