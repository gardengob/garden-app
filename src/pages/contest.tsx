/* eslint-disable @next/next/no-img-element */
import gsap from 'gsap'
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
  const [currentContest, setCurrentContest] =
    useState<IFamilyContest>(undefined)
  const [contestSubject, setcontestSubject] = useState<any>(undefined)
  const [contestEntries, setcontestEntries] =
    useState<IContestEntry[]>(undefined)
    const [currentTimer, setCurrentTimer] = useState<string>(null)

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

      setCurrentTimer(` ${days}j ${hours}h ${minutes}min ${seconds}sec`)

      if (--timer < 0) {
        timer = remainingTime
      }
    }, 1000)

    return timerInterval
  }

  const router = useRouter()

  const containerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 60, autoAlpha: 0 },
      { y: 0, autoAlpha: 1 }
    )
  }, [])

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
      if (data) {
        ContestService.getEntries(data.id).then((data) => {
          console.log('data', data)

          setcontestEntries(data)
        })

        ContestService.getContestSubject(data).then((subject) => {
          setcontestSubject(subject)
        })

        setCurrentContest(data)
        timerInt = startTimer(data.created_at, 604800)
      }
    })
    return () => {
      clearInterval(timerInt)
    }
  }, [])
  return (
    <div className={css.root}>
      <div className={css.container} ref={containerRef}>
        <div
          className={css.close}
          onClick={() => {
            router.push('garden')
          }}
        >
          <div className={css.background}></div>
          <Image
            className={css.icon}
            src={`/images/icons/cross.svg`}
            alt={'close'}
            width={24}
            height={24}
          />
        </div>
        <div className={css.head}>
          <img
            className={css.header}
            src="/images/ui/notification-header.png"
            alt=""
          />
          <p className={css.title}>Concours cuisine</p>
        </div>
        <div className={css.content}>
          {currentContest && (
            <>
              <div className={css.contest}>
                <p className={css.contestName}>{currentContest.name}</p>
                <p className={css.contestInstruction}>
                  {currentContest.instruction}
                </p>
                {contestSubject.id !== null ? (
                  <button
                    className={css.contestSubject}
                    onClick={() => {
                      router.push(`${contestSubject.path}/${contestSubject.id}`)
                    }}
                  >
                    Voir {contestSubject.particle + ' ' + contestSubject.label}
                  </button>
                ) : (
                  <div>{contestSubject.label}</div>
                )}
              </div>

              <div className={css.contestTimerHolder}>
                <span style={{ textAlign: 'center' }}>Il reste encore</span>
                <p className={css.contestTimer}>{currentTimer ? currentTimer : "-j -h -min -s"}</p>
              </div>
              <button className={css.contestSubject}>Participer</button>

              <div
                style={{
                  display: 'flex',
                  overflowY: 'hidden',
                  justifyContent: 'space-evenly',
                }}
              >
                {contestEntries &&
                  contestEntries.map((entry, index) => {
                    return (
                      <div key={index}>
                        <div className={css.image}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            style={{ objectFit: 'cover' }}
                            src={entry.image}
                            alt={entry.id}
                            width={100}
                            height={100}
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
          {!currentContest && (
            <div
              style={{
                height: '85%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Pas de concours en cours</span>
            </div>
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
