/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import css from './RecipeInstructionsStep.module.scss'
import { useEffect, useRef, useState } from 'react'
import { merge } from '../../utils/arrayUtils'

export default function RecipeInstructionsStep({
  instructions,
  instructionsChange,
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const recognitionRef = useRef(null)

  const [onAir, setOnAir] = useState<boolean>(false)
  const [fullText, setFullText] = useState<string>('')
  const [onGoingTextRecog, setOnGoingTextRecog] = useState({
    text: '',
    final: false,
  })

  useEffect(() => {
    // @ts-ignore
    let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'fr-FR'

    recognitionRef.current.onresult = (event) => {
      /* récupère le mot ou la phrase */
      let sentence = event.results[event.resultIndex][0].transcript

      /* Ajoute la phrase à la zone texte en ajoutant une majuscule et un point */
      setOnGoingTextRecog({
        text: sentence,
        final: event.results[event.resultIndex].isFinal,
      })
    }

    recognitionRef.current.onerror = () => {
      recognitionRef.current.start()
    }

    recognitionRef.current.onstart = () => {
      setOnAir(true)
    }

    recognitionRef.current.onend = () => {
      setOnAir(false)
    }
  }, [])

  useEffect(() => {
    if (onGoingTextRecog.final) {
      setFullText(`${fullText} ${onGoingTextRecog.text}`)
      setOnGoingTextRecog({ text: '', final: false })
    } else {
      inputRef.current.value = fullText + ' ' + onGoingTextRecog.text
    }
  }, [onGoingTextRecog])

  // -------------------------- METHODS

  const startRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }
  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const addInstructionHandler = (instruction: string) => {
    if (instruction === '' || instruction.trim().length === 0) return

    instructionsChange((instructions) => [...instructions, instruction])
    setFullText('')
    setOnGoingTextRecog({ text: '', final: false })
    inputRef.current.value = ''
  }

  const removeInstructionHandler = (i: number) => {
    instructionsChange(
      instructions.slice(0, i).concat(instructions.slice(i + 1))
    )
  }

  return (
    <div className={css.root}>
      <h3 className={css.title}>Étapes</h3>

      <div className={css.entry}>
        <textarea
          className={css.input}
          ref={inputRef}
          id="instruction"
          placeholder="Étape à ajouter"
          maxLength={100}
          onChange={(e) => {
            setFullText(e.target.value)
            recognitionRef.current.stop()
          }}
        ></textarea>

        <div className={css.control}>
          <button
            className={merge([
              css.button,
              css['button-speech'],
              onAir ? css['button-onair'] : '',
            ])}
            onClick={onAir ? stopRecognition : startRecognition}
          >
            {onAir ? 'Stop' : 'Start'}
          </button>

          <button
            className={css.button}
            onClick={() => addInstructionHandler(inputRef.current.value)}
          >
            Ajouter l'étape
          </button>
        </div>
      </div>

      <div className={css.instructions}>
        {instructions.map(function (inst, i) {
          return (
            <div
              className={css.instruction}
              key={i}
              onClick={() => removeInstructionHandler(i)}
            >
              Étape {i + 1} {inst}
            </div>
          )
        })}
      </div>
    </div>
  )
}
