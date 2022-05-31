import { useEffect } from 'react'
import ContestService from '../services/ContestService'

export default function Contest() {
  useEffect(() => {
    const test = ContestService.getAll().then((data) => {
      console.log('getall', data)
    })
  }, [])
  return <div style={{ marginTop: '100px' }}>contest</div>
}
