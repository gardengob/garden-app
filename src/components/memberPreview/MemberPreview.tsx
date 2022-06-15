import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import css from './MemberPreview.module.scss'

export default function MemberPreview({ member }) {
  const [memberImageUrl, setMemberImageUrl] = useState(null)

  useEffect(() => {}, [member])

  return (
    <div className={css.root}>
      {member && (
        <>
          <div className={css.details}>
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
          </div>
          <div className={css.name}>
            <div className={css.scotch}>
              <Image
                src={'/images/ui/scotch.svg'}
                alt={member.name}
                width={170}
                height={40}
              />
            </div>

            <h3 className={css.label}>{member.name}</h3>
          </div>
        </>
      )}
    </div>
  )
}
