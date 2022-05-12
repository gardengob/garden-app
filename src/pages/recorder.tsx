import { useState, useEffect, useRef } from 'react'

export default function Recorder() {
  const textAreaRef = useRef(null)
  const finalTextRef = useRef(null)
  const recognitionRef = useRef(null)

  const [fullText, setFullText] = useState('Eh')
  const [onGoingTextRecog, setOnGoingTextRecog] = useState({
    text: 'Oh',
    final: false,
  })
  const [onAir, setOnAir] = useState<boolean>(false)

  // -------------------------- USE

  useEffect(() => {
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'fr-FR'

    recognitionRef.current.onresult = function (event) {
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
    recognitionRef.current.onerror = function (event) {
      console.log('Erreur : ' + event.error)
      // setFullText(fullText + 'ERROR !!!')
      recognitionRef.current.start()
    }

    recognitionRef.current.onend = function (event) {
      console.log('End : ' + event.error)
      // setFullText(fullText + ' END !!!')
    }

    recognitionRef.current.onsoundstart = function (event) {
      setOnAir(true)
    }

    recognitionRef.current.onsoundend = function (event) {
      // setFullText(fullText + 'SOUND END !!!')
      setOnAir(false)
    }

    /* Français de France */
    /* Lorsque une voix est détectée */
  }, [])

  useEffect(() => {
    if (!onGoingTextRecog.final) {
      // textAreaRef.current.innerHTML = fullText
      textAreaRef.current.value = fullText + ' ' + onGoingTextRecog.text
    }
  }, [onGoingTextRecog])

  useEffect(() => {
    if (onGoingTextRecog.final) {
      console.log('FINAL')
      setFullText(`${fullText} ${onGoingTextRecog.text}`)
      setOnGoingTextRecog({ text: '', final: false })
    }
  }, [onGoingTextRecog])

  // -------------------------- METHODS

  const startRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }
  const stopRecognition = () => {
    console.log(recognitionRef.current)
    if (recognitionRef.current) {
      console.log('stoppppp')
      recognitionRef.current.stop()
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
      <textarea
        ref={textAreaRef}
        id="text-zone"
        onChange={(e) => {
          console.log('changed')
          setFullText(e.target.value)
          recognitionRef.current.stop()
        }}
      ></textarea>
      <p>{onAir ? 'onAir' : 'nosound'}</p>
    </div>
  )
}
