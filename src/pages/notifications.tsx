/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
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
      <div className={css.container}>
        <div
          className={css.close}
          onClick={() => {
            router.push('garden')
          }}
        >
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
          <p className={css.notification}>Carla a rejoint l'aventure !</p>
          <p className={css.notification}>
            Adrien vient d'ajouter une nouvelle recette
          </p>
          <p className={css.notification}>
            Plus que 37h avant la fin du concours en cours !
          </p>
          <p className={css.notification}>Laura a ajouté une note sur la recette Salade quinoa mangue avocat</p>
          <p className={css.notification}>Adrien a ajouté l'ingrédient yaourt</p>
          <p className={css.notification}>Amélie a rejoint l'aventure !</p>
          <p className={css.notification}>Le concours sur le thème Asie est terminé</p>
          <p className={css.notification}>Killian a rejoint l'aventure !</p>
          <p className={css.notification}>Théo a gagné le défi Devine mon plat</p>
          <p className={css.notification}>Laura a ajouté une note sur la recette Salade quinoa mangue avocat</p>
          <p className={css.notification}>Adrien a ajouté l'ingrédient yaourt</p>
          <p className={css.notification}>Amélie a rejoint l'aventure !</p>
          <p className={css.notification}>Le concours sur le thème Asie est terminé</p>
        </div>
      </div>
    </div>
  )
}
