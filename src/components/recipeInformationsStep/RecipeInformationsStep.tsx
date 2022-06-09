import css from './RecipeInformationsStep.module.scss'
import { useEffect, useRef, useState } from 'react'
import { ETimeUnit, IMeasurable } from '../../types/recipe'
import RecipeImageUploader from '../recipeImageUploader/RecipeImageUploader'

type Props = {
  name: string
  nameChange: (e) => void
  peopleAmount: number
  peopleAmountChange: (e) => void
  preparationTime: IMeasurable
  preparationTimeAmountChange: (e) => void
  preparationTimeUnitChange: (e) => void
  cookingTime: IMeasurable
  cookingTimeAmountChange: (e) => void
  cookingTimeUnitChange: (e) => void
  imageUrl: string
  imageUrlChange: (string) => void
}

export default function RecipeInformationsStep({
  name,
  nameChange,
  peopleAmount,
  peopleAmountChange,
  preparationTime,
  preparationTimeAmountChange,
  preparationTimeUnitChange,
  cookingTime,
  cookingTimeAmountChange,
  cookingTimeUnitChange,
  imageUrl,
  imageUrlChange,
}: Props) {
  const peopleInputRef = useRef(null)
  const [inputPeopleAmount, setInputPeopleAmount] =
    useState<number>(peopleAmount)
  const changeEvent = new Event('change')

  useEffect(() => {
    peopleInputRef.current.addEventListener('change', (e) => {
      peopleAmountChange(parseInt(e.target.value))
    })
  }, [])

  useEffect(() => {
    peopleInputRef.current.dispatchEvent(changeEvent)
  }, [inputPeopleAmount])

  return (
    <div className={css.root}>
      <h3 className={css.title}>Information</h3>

      <div className={css.group}>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Nom de la recette"
          value={name}
          onChange={nameChange}
        />
      </div>

      {/* Update amount state when input is changing */}
      <div className={css.group}>
        <label htmlFor="people">Nombre de personnes</label>
        <button
          disabled={inputPeopleAmount <= 0}
          onClick={() => {
            setInputPeopleAmount(inputPeopleAmount - 1)
          }}
        >
          -
        </button>
        <input
          ref={peopleInputRef}
          name="people"
          id="people"
          type="number"
          placeholder="Nombre de personnes"
          value={inputPeopleAmount}
          readOnly
          onChange={(e) => peopleAmountChange(parseInt(e.target.value))}
        />
        <button
          onClick={() => {
            setInputPeopleAmount(inputPeopleAmount + 1)
          }}
        >
          +
        </button>
      </div>

      <div className={css.group}>
        <label htmlFor="preparationTimeAmount">Temps de préparation</label>
        <input
          name="preparationTimeAmount"
          id="preparationTimeAmount"
          type="number"
          value={preparationTime.amount}
          onChange={preparationTimeAmountChange}
        />
        <select
          name="preparationTimeUnit"
          id="preparationTimeUnit"
          value={preparationTime.unit}
          onChange={preparationTimeUnitChange}
        >
          {(Object.keys(ETimeUnit) as Array<keyof typeof ETimeUnit>).map(
            (key, i) => {
              return (
                <option key={i} value={ETimeUnit[key]}>
                  {ETimeUnit[key]}
                </option>
              )
            }
          )}
        </select>
      </div>

      <div className={css.group}>
        <label htmlFor="cookingTimeAmount">Temps de cuisson</label>
        <input
          name="cookingTimeAmount"
          id="cookingTimeAmount"
          type="number"
          value={cookingTime.amount}
          onChange={cookingTimeAmountChange}
        />
        <select
          name="cookingTimeType"
          id="cookingTimeType"
          onChange={cookingTimeUnitChange}
          value={cookingTime.unit}
        >
          {(Object.keys(ETimeUnit) as Array<keyof typeof ETimeUnit>).map(
            (key, i) => {
              return (
                <option key={i} value={ETimeUnit[key]}>
                  {ETimeUnit[key]}
                </option>
              )
            }
          )}
        </select>
      </div>
      <RecipeImageUploader
        url={imageUrl}
        size={150}
        onUpload={(url) => {
          imageUrlChange(url)
        }}
      />
    </div>
  )
}
