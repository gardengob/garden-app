/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import RoutingCameraService from '../../services/events/RoutingCameraService'
import SpaceEntryService from '../../services/events/SpaceEntryService'
import WebglService from '../../services/events/WebglService'
import FamilyService from '../../services/FamilyService'
import UserService from '../../services/UserService'
import { supabase } from '../../utils/supabaseClient'
import AddFamily from '../addFamily/AddFamily'
import Avatar from '../avatar/Avatar'
import css from './Account.module.scss'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [families, setFamilies] = useState([])
  const router = useRouter()

  useEffect(() => {
    const subscription = supabase
      .from('user_family')
      .on('*', (payload) => {
        UserService.getFamilies().then((families) => setFamilies(families))
      })
      .subscribe()

    UserService.getProfile().then((profile) => {
      setUser(profile)
      setUsername(profile.username)
      setAvatarUrl(profile.avatar_url)
    })
    UserService.getFamilies().then((families) => setFamilies(families))

    RoutingCameraService.goTo('start')
    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [session])

  return (
    <div className={`${css.root} garden-ui`}>
      <div className={css.families}>
        {families.map(function (item, i) {
          return (
            <div
              className={css.family}
              key={i}
              onClick={() => {
                FamilyService.store(item.family.name)
                localStorage.setItem('display3D', 'true')
                WebglService.enable3D()
                router.replace(
                  {
                    pathname: '/garden',
                    query: {
                      withIntro: true,
                    },
                  },
                  null,
                  { shallow: true }
                )
                localStorage.setItem('intro', 'running')
              }}
            >
              <img className={css.image} src="/images/family.png" alt="" />
              <p className={css.name}>{item.family.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
