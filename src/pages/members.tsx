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
import FamilyService from '../services/FamilyService'

export default function Members() {
  const CAMERA_POSITION: Component3dName = 'tree'
  const router = useRouter()
  const [members, setMembers] = useState([])
  const [currentMember, setCurrentMember] = useState(null)

  useEffect(() => {
    FamilyService.getUsers(localStorage.getItem('familyId')).then((users) =>
      setMembers(users)
    )
  }, [])

  useEffect(() => {
    WebglService.disable3D()
    RoutingCameraService.goTo(CAMERA_POSITION)
    localStorage.setItem('lockScroll', 'true')
    localStorage.setItem('display3D', 'false')
  }, [])

  const closeModalHandler = () => {
    setCurrentMember(null)
  }

  return (
    <div className={merge([css.root, 'garden-ui'])}>
      <div className={css.head}>
        <div className={css.back} onClick={() => router.push('garden')}>
          <img
            className={css.icon}
            src={`/images/icons/back-white.svg`}
            alt=""
          />
        </div>
      </div>

      <div className={css.members}>
        {members.map((member, i) => {
          return (
            <div
              className={css.member}
              key={i}
              onClick={() => setCurrentMember(member.user)}
            >
              <MemberPreview member={member.user} />
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
