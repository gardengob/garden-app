import { useState, useEffect } from 'react'
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

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [session])

  return (
    <div className={css.root}>
      {/* <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          UserService.updateProfile({ username, avatar_url: url })
        }}
      /> */}

      <label>Familles</label>
      {families.map(function (item, i) {
        return <li className={css.family} key={i} onClick={() => FamilyService.store(item.family.name)}>{item.family.name}</li>
      })}

      {/* <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div> */}
      {/* <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <button
        className="button block primary"
        onClick={() => UserService.updateProfile({ username, avatar_url })}
      >
        Update
      </button>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div> */}
    </div>
  )
}
