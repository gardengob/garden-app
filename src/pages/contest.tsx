import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import ContestService from '../services/ContestService'
import RoutingCameraService from '../services/events/RoutingCameraService'
import UserService from '../services/UserService'
import { IContestEntry, IFamilyContest } from '../types/contest'
import { supabase } from '../utils/supabaseClient'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'
import css from './contest.module.scss'
import Image from 'next/image'

export default function Contest() {
  const timerRef = useRef(null)
  const [currentContest, setCurrentContest] =
    useState<IFamilyContest>(undefined)
  const [contestSubject, setcontestSubject] = useState<any>(undefined)
  const [contestEntries, setcontestEntries] =
    useState<IContestEntry[]>(undefined)

  const CAMERA_POSITION: Component3dName = 'contest'
  const startTimer = (start, duration) => {
    let startingDate = new Date(start)
    let now = Date.now()
    let remainingTime = startingDate.getTime() / 1000 + duration - now / 1000
    console.log(startingDate.getTime())
    let timer = remainingTime,
      days,
      hours,
      minutes,
      seconds
    const timerInterval = setInterval(() => {
      days = Math.floor(timer / 60 / 60 / 24)
      hours = Math.floor((timer / 60 / 60) % 24)
      minutes = Math.floor((timer / 60) % 60)
      seconds = Math.floor(timer % 60)

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      timerRef.current.textContent =
        days + 'j ' + hours + 'h ' + minutes + 'min ' + seconds + 'sec '

      if (--timer < 0) {
        timer = remainingTime
      }
    }, 1000)

    return timerInterval
  }

  const router = useRouter()
  useEffect(() => {
    localStorage.setItem('display3D', 'true')
    localStorage.setItem('lockScroll', 'true')
  }, [])

  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
  }, [])

  useEffect(() => {
    let timerInt

    ContestService.getCurrentContest().then((data) => {
      console.log('get', data)

      ContestService.getEntries(data.id).then((data) => {
        console.log('data', data)

        setcontestEntries(data)
      })

      ContestService.getContestSubject(data).then((subject) => {
        setcontestSubject(subject)
      })

      setCurrentContest(data)
      timerInt = startTimer(data.created_at, 604800)
    })
    return () => {
      clearInterval(timerInt)
    }
  }, [])
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: 'auto',
          right: '175px',
          height: '752px',
          width: '512px',
          backgroundColor: 'white',
        }}
      >
        <button
          onClick={() => {
            router.push('garden')
          }}
        >
          X
        </button>
        <div className={css.content}>
          {currentContest && (
            <>
              <p className={css.contestName}>{currentContest.name}</p>
              {contestSubject.id !== null ? (
                <button
                  className={css.contestSubject}
                  onClick={() => {
                    router.push(`${contestSubject.path}/${contestSubject.id}`)
                  }}
                >
                  voir {contestSubject.particle + ' ' + contestSubject.label}
                </button>
              ) : (
                <div>{contestSubject.label}</div>
              )}
              <p className={css.contestInstruction}>
                {currentContest.instruction}
              </p>
              <div className={css.contestTimerHolder}>
                <span>Il reste enore</span>
                <p className={css.contestTimer} ref={timerRef}></p>
              </div>
              <button className={css.contestSubject}>Participer</button>

              <div>
                {contestEntries &&
                  contestEntries.map((entry, index) => {
                    return (
                      <div key={index}>
                        {entry.family_user_id}
                        <div className={css.image}>
                          <img
                            src={entry.image}
                            alt={entry.id}
                            width={200}
                            height={200}
                            // objectFit={'cover'}
                            // layout={'responsive'}
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </>
          )}
        </div>
        {/* <button
          onClick={() => {
            ContestService.add({
              family_id: localStorage.getItem('family_id'),
              name: 'test-contest',
              type_id: '64b6ab23-2f4f-453a-8406-8d911bfcbf49',
              instruction: 'apapapapapapap',
            })
          }}
        >
          add test
        </button>
        <button
          onClick={async () => {
            ContestService.participate({
              family_contest_id: '0b139438-f413-4215-a699-bcfe2bee5ad8',
              family_user_id: await UserService.getUserFamilyId(),
            })
          }}
        >
          participate test
        </button> */}
      </div>
    </div>
  )
}
