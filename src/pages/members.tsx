/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { useEffect, useState } from 'react'
import RecipePreview from '../components/recipePreview/RecipePreview'
import RippedPaper from '../components/rippedPaper/RippedPaper'
import FamilyService from '../services/FamilyService'
import { supabase } from '../utils/supabaseClient'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'
import css from './members.module.scss'
import Image from 'next/image'
import MemberPreview from '../components/memberPreview/MemberPreview'
import MemberDetailsModal from '../components/memberDetailsModal/MemberDetailsModal'

export default function Members() {
  const user = supabase.auth.user()
  const [members, setMembers] = useState([
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Lou',
      imageUrl: '/images/user.png',
    },
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Adrien',
      imageUrl: '/images/user.png',
    },
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Oriane',
      imageUrl: '/images/user.png',
    },
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Alban',
      imageUrl: '/images/user.png',
    },
  ])
  const [currentMember, setCurrentMember] = useState(null)

  useEffect(() => {}, [])

  const closeModalHandler = () => {
    setCurrentMember(null)
  }

  return (
    <div className={css.root}>
      <div className={css.head}></div>

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
      {currentMember && <MemberDetailsModal member={currentMember} closeHandler={() => closeModalHandler()} />}
    </div>
  )
}
