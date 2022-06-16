/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'
import css from './members.module.scss'
import MemberPreview from '../components/memberPreview/MemberPreview'
import MemberDetailsModal from '../components/memberDetailsModal/MemberDetailsModal'
import WebglService from '../services/events/WebglService'
import { merge } from '../utils/arrayUtils'

export default function Members() {
  const CAMERA_POSITION: Component3dName = 'tree'
  const user = supabase.auth.user()
  const router = useRouter()
  const [members, setMembers] = useState([
    {
      name: 'Lou',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Adrien',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Florian',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Théo',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Mélanie',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Oriane',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Baptiste',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Camille',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Emeline',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Romain',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Sandra',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Aurélie',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Naël',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Amélie',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Léa',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Carla',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Laura',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Killian',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Yoan',
      imageUrl: '/images/user.png',
    },
    {
      name: 'Eva',
      imageUrl: '/images/user.png',
    },
  ])
  const [currentMember, setCurrentMember] = useState(null)

  useEffect(() => {
    WebglService.disable3D()
    console.log('tree useEffect Triggered')
    RoutingCameraService.goTo(CAMERA_POSITION)
    localStorage.setItem('lockScroll', 'true')
    localStorage.setItem('display3D', 'false')
  }, [])

  const closeModalHandler = () => {
    setCurrentMember(null)
  }

  return (
    <div className={merge([css.root, 'garden-ui'])}>
      <div
        className={css.head}
        onClick={() => {
          router.push('garden')
        }}
      ></div>

      <div className={css.members}>
        {members.map((member, i) => {
          return (
            <div
              className={css.member}
              key={i}
              onClick={() => setCurrentMember(member)}
            >
              <MemberPreview member={member} />
            </div>
          )
        })}
      </div>
      {currentMember && (
        <MemberDetailsModal
          member={currentMember}
          closeHandler={() => closeModalHandler()}
        />
      )}
    </div>
  )
}
