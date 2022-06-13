/* eslint-disable @next/next/no-img-element */
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
          className={css.name}
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
        <div className={css.amount}>
          <button
            className={css.btn}
            disabled={inputPeopleAmount <= 0}
            onClick={() => {
              setInputPeopleAmount(inputPeopleAmount - 1)
            }}
          >
            <img className={css.icon} src={`/images/icons/minus.svg`} alt="" />
          </button>
          <input
            className={css.value}
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
            className={css.btn}
            onClick={() => {
              setInputPeopleAmount(inputPeopleAmount + 1)
            }}
          >
            <img className={css.icon} src={`/images/icons/plus.svg`} alt="" />
          </button>
        </div>
      </div>

      <div className={css.group}>
        <label htmlFor="preparationTimeAmount">Temps de préparation</label>
        <div className={css.prep}>
          <input
            className={css.value}
            name="preparationTimeAmount"
            id="preparationTimeAmount"
            type="number"
            value={preparationTime.amount}
            onChange={preparationTimeAmountChange}
          />
          <select
            className={css.drop}
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
      </div>

      <div className={css.group}>
        <label htmlFor="cookingTimeAmount">Temps de cuisson</label>
        <div className={css.cook}>
          <input
            className={css.value}
            name="cookingTimeAmount"
            id="cookingTimeAmount"
            type="number"
            value={cookingTime.amount}
            onChange={cookingTimeAmountChange}
          />
          <select
            className={css.drop}
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
      </div>
      <RecipeImageUploader
        url={imageUrl}
        onUpload={(url) => {
          imageUrlChange(url)
        }}
      />
    </div>
  )
}
