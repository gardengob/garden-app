/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { merge } from '../../utils/arrayUtils'
import MemberDetailsTabs from '../memberDetailsTabs/MemberDetailsTabs'
import css from './MemberDetailsModal.module.scss'

export default function MemberDetailsModal({ member, closeHandler }) {
  const [memberImageUrl, setMemberImageUrl] = useState(null)

  useEffect(() => {}, [member])

  return (
    <div className={css.root}>
      <div className={css.filter} onClick={closeHandler} />
      {member && (
        <div className={css.container}>
          <div className={css.close} onClick={closeHandler}>
            {/* <img className={css.icon} src={`/images/icons/cross.svg`} alt="" /> */}
            <Image
              className={css.icon}
              src={`/images/icons/cross.svg`}
              alt={'close'}
              width={24}
              height={24}
            />
          </div>
          <div className={css.head}>
            <div className={css.image}>
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={100}
                height={100}
                objectFit={'cover'}
                layout={'responsive'}
              />
            </div>
            <div className={css.about}>
              <h1 className={css.name}>{member.name}</h1>
              <div className={css.tags}>
                <span className={css.tag}>12 avril 1978</span>
                <span className={merge([css.tag, css['tag-diet']])}>
                  Régime : Végétarien
                </span>
              </div>
            </div>
          </div>
          <MemberDetailsTabs />
        </div>
      )}
    </div>
  )
}
