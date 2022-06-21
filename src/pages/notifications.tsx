/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import gsap from 'gsap'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'
import css from './notifications.module.scss'

export default function Notifications() {
  const CAMERA_POSITION: Component3dName = 'mail_box'

  const router = useRouter()

  const containerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 60, autoAlpha: 0 },
      { y: 0, autoAlpha: 1 }
    )
  }, [])

  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
    localStorage.setItem('lockScroll', 'true')
    localStorage.setItem('display3D', 'true')
  }, [])

  return (
    <div className={css.root}>
      <div className={css.container} ref={containerRef}>
        <div
          className={css.close}
          onClick={() => {
            router.push('garden')
          }}
        >
          <div className={css.background}></div>
          <Image
            className={css.icon}
            src={`/images/icons/cross.svg`}
            alt={'close'}
            width={24}
            height={24}
          />
        </div>
        <div className={css.head}>
          <img
            className={css.header}
            src="/images/ui/notification-header.png"
            alt=""
          />
          <p className={css.title}>Infos !</p>
        </div>

        <div className={css.notifications}>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-user.svg"
                alt=""
              />
              Carla a rejoint l'aventure !
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-recipe.svg"
                alt=""
              />
              Adrien a ajouté la nouvelle recette Croziflette
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-time.svg"
                alt=""
              />
              Plus que 37h avant la fin du concours en cours !
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-note.svg"
                alt=""
              />
              Laura a ajouté une note sur la recette : Boeuf bourguignon à la
              dijonnaise
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-recipe.svg"
                alt=""
              />
              Amélie a ajouté la nouvelle recette Lasagnes
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-user.svg"
                alt=""
              />
              Amélie a rejoint l'aventure !
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-winner.svg"
                alt=""
              />
              <b>Eva</b> a gagné le concours avec le thème Asie
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-time.svg"
                alt=""
              />
              Le concours avec le thème Asie est terminé
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-user.svg"
                alt=""
              />
              Killian a rejoint l'aventure !
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>

          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-user.svg"
                alt=""
              />
              Laura a ajouté une note sur la recette : Salade quinoa mangue
              avocat
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-recipe.svg"
                alt=""
              />
              Camille a ajouté la nouvelle recette Pizzananas
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
          <div className={css.notification}>
            <p className={css.label}>
              <img
                className={css.icon}
                src="/images/icons/notif-winner.svg"
                alt=""
              />
              Théo a gagné le défi Devine mon plat
            </p>
            <img
              className={css.separator}
              src="/images/ui/separator.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
