/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import css from './RecipeIngredientsStep.module.scss'
import { useRef } from 'react'

export default function RecipeIngredientsStep({
  ingredients,
  ingredientsChange,
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const addIngredientHandler = (name: string) => {
    if (name === '' || name.trim().length === 0) return

    ingredientsChange((ingredients) => [
      ...ingredients,
      { name: name, amount: '', unit: '' },
    ])
    inputRef.current.value = ''
  }

  const removeIngredientHandler = (i: number) => {
    ingredientsChange(ingredients.slice(0, i).concat(ingredients.slice(i + 1)))
  }

  return (
    <div className={css.root}>
      <h3 className={css.title}>Ingrédients</h3>

      <div className={css.combo}>
        <input
          className={css.input}
          id="ingredient"
          type="text"
          placeholder="Ingrédient à ajouter"
          ref={inputRef}
        />
        <button
          className={css.button}
          onClick={() => addIngredientHandler(inputRef.current.value)}
        >
          Ajouter l'ingrédient
        </button>
      </div>

      <div className={css.ingredients}>
        {ingredients.map(function (item, i) {
          return (
            <div
              className={css.ingredient}
              key={i}
              onClick={() => removeIngredientHandler(i)}
            >
              <div className={css.delete}>
                <img
                  className={css.icon}
                  src={`/images/icons/cross.svg`}
                  alt=""
                />
              </div>
              <span>{item.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
