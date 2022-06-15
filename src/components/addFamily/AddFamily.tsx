import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FamilyService from '../../services/FamilyService'
import { merge } from '../../utils/arrayUtils'
import css from './AddFamily.module.scss'

interface IProps {
  className?: string
}

export default function AddFamily(props: IProps) {
  const [code, setCode] = useState(null)
  const [name, setName] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const router = useRouter()

  const resetComponentState = () => {
    setIsCreating(false)
    setIsJoining(false)
  }

  const getCurrentAction = (): string => {
      if (isCreating) return "Créer"
      if (isJoining) return "Rejoindre"
      return "Ajouter"
  }

  return (
    <div className={merge([css.root, props.className])}>
      <div className={css.head}>
        {(isCreating || isJoining) && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={merge([css.icon, css['icon-back']])}
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#4b6659"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => resetComponentState()}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
          </svg>
        )}

        <h2 className={css.title}>{ getCurrentAction() } une famille</h2>
      </div>

      {!(isCreating || isJoining) && (
        <div className={css.wrapper}>
          <button
            className={css.button}
            onClick={() => setIsCreating(!isCreating)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={merge([css.icon, css['icon-action']])}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#4b6659"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="12" y1="9" x2="12" y2="15" />
            </svg>
            Créer une famille
          </button>
          <button
            className={css.button}
            onClick={() => setIsJoining(!isJoining)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={merge([css.icon, css['icon-action']])}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#4b6659"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
              <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
            </svg>
            Rejoindre une famille
          </button>
        </div>
      )}

      <div className={css.action}>
        {isCreating && (
          <div className={css.combo}>
            <input
              id="code"
              type="text"
              placeholder="Nom de votre famille"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className={css.button}
              onClick={() => FamilyService.create(name, () => {
                router.push("/")
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={''}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#4b6659"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="15" y1="16" x2="19" y2="12" />
                <line x1="15" y1="8" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        )}
        {isJoining && (
          <div className={css.combo}>
            <input
              id="code"
              type="text"
              placeholder="Code de votre famille"
              value={code || ''}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              className={css.button}
              onClick={() => FamilyService.join(code, () => {
                router.push("/profile")
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={''}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#4b6659"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="15" y1="16" x2="19" y2="12" />
                <line x1="15" y1="8" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
