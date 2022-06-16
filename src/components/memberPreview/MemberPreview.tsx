import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import css from './MemberPreview.module.scss'

export default function MemberPreview({ member }) {
  const [memberImageUrl, setMemberImageUrl] = useState(null)

  useEffect(() => {
    if (member) {
      downloadUserImage(member.avatar_url)
    }
  }, [member])

  async function downloadUserImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setMemberImageUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  return (
    <div className={css.root}>
      {member && (
        <>
          <div className={css.details}>
            <div className={css.image}>
              {memberImageUrl && (
                <Image
                  src={memberImageUrl}
                  alt={member.username}
                  width={100}
                  height={100}
                  objectFit={'cover'}
                  layout={'responsive'}
                />
              )}
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

            <h3 className={css.label}>{member.username}</h3>
          </div>
        </>
      )}
    </div>
  )
}
