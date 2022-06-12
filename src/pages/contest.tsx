import { useEffect, useRef } from 'react'
import ContestService from '../services/ContestService'
import UserService from '../services/UserService'

export default function Contest() {
  const timerRef = useRef(null)
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
    setInterval(() => {
      days = Math.floor(timer / 60 / 60 / 24)
      hours = Math.floor((timer / 60 / 60) % 24)
      minutes = Math.floor((timer / 60) % 60)
      seconds = Math.floor(timer % 60)

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      timerRef.current.textContent =
        days + 'j ' + hours + 'h ' + minutes + ':' + seconds

      if (--timer < 0) {
        timer = remainingTime
      }
    }, 1000)
  }
  useEffect(() => {
    const test = ContestService.getAll().then((data) => {
      console.log('getall', data)
    })
    const testGet = ContestService.getLastFinishedContest().then((data) => {
      console.log('get', data)
      startTimer(data.created_at, 604800)
    })
  }, [])
  return (
    <div style={{ marginTop: '100px' }}>
      contest
      <button
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
      </button>
      <div>
        timer
        <p ref={timerRef}></p>
      </div>
    </div>
  )
}
