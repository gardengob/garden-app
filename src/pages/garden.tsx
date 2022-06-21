/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RoutingCameraService from '../services/events/RoutingCameraService'
import SpaceEntryService from '../services/events/SpaceEntryService'
import WebglService from '../services/events/WebglService'
import FamilyService from '../services/FamilyService'
import { AppManager } from '../webGL/webGLArchitecture/Classes/AppManager/AppManager'
import css from './garden.module.scss'

export default function Garden() {
  const [intro, setIntro] = useState<boolean>(false)
  const [gardenName, setGardenName] = useState<string>()
  const router = useRouter()
  useEffect(() => {
    FamilyService.getFamilyName().then((name) => setGardenName(name))
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
          <img
            className={css.decors}
            src="/images/ui/decors_plantes-big.png"
            alt=""
          />
          <div
            className={css.garden}
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <img
              className={css.scotch}
              src="/images/ui/behind-garden.png"
              alt=""
            />
            <p className={css.name}>Jardin {gardenName}</p>
          </div>
          <button
            className={css.enter}
            onClick={() => {
              SpaceEntryService.enterGarden()
            }}
          ></button>
        </>
      )}
    </>
  )
}
