import { useState, useEffect, useRef } from 'react'

export default function Recorder() {
  const textAreaRef = useRef(null)
  const finalTextRef = useRef(null)

  const [fullText, setFullText] = useState('Eh')
  const [onGoingTextRecog, setOnGoingTextRecog] = useState({
    text: 'Oh',
    final: false,
  })
  const [onAir, setOnAir] = useState<boolean>(false)

  let recognition

  // -------------------------- USE

  useEffect(() => {
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'fr-FR'

    recognition.onresult = function (event) {
      /* récupère le mot ou la phrase */
      let sentence = event.results[event.resultIndex][0].transcript
      // console.log('e', event)
      console.log('Resultat : ' + sentence + '.')

      /* Ajoute la phrase à la zone texte en ajoutant une majuscule et un point */
      setOnGoingTextRecog({
        text: sentence,
        final: event.results[event.resultIndex].isFinal,
      })
    }
    recognition.onerror = function (event) {
      console.log('Erreur : ' + event.error)
      setFullText(fullText + 'ERROR !!!')
      recognition.start()
    }

    recognition.onend = function (event) {
      console.log('End : ' + event.error)
      setFullText(fullText + ' END !!!')
    }

    recognition.onsoundstart = function (event) {
      setOnAir(true)
    }

    recognition.onsoundend = function (event) {
      setFullText(fullText + 'SOUND END !!!')
      setOnAir(false)
    }

    /* Français de France */
    /* Lorsque une voix est détectée */
  }, [])

  useEffect(() => {
    if (!onGoingTextRecog.final) {
      // finalTextRef.current.innerHTML = fullText
      // textAreaRef.current.value = fullText + ' ' + onGoingTextRecog.text
    }
  }, [fullText, onGoingTextRecog])

  useEffect(() => {
    if (onGoingTextRecog.final) {
      console.log('FINAL')
      setFullText(`${fullText} ${onGoingTextRecog.text}`)
      setOnGoingTextRecog({ text: '', final: false })
    }
  }, [onGoingTextRecog])

  // -------------------------- METHODS

  const startRecognition = () => {
    if (recognition) {
      recognition.start()
    }
  }
  const stopRecognition = () => {
    if (recognition) {
      recognition.stop()
    }
  }

  // -------------------------- HANDLERS

  const onRecognitionResultHandler = (e) => {}

  return (
    <div style={{ padding: '50px 0 100px 0', marginTop: '200px' }}>
      <button onClick={startRecognition}>Ecouter</button>
      <button onClick={stopRecognition}>Stop</button>
      <p ref={finalTextRef} id="text-zone" style={{ color: 'red' }}>
        {fullText}{' '}
        <span style={{ color: 'lime' }}>{onGoingTextRecog.text}</span>
      </p>
      <textarea ref={textAreaRef} id="text-zone"></textarea>
      <p>{onAir ? 'onAir' : 'nosound'}</p>
    </div>
  )
}
