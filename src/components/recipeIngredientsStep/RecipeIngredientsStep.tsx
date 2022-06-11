import css from './RecipeIngredientsStep.module.scss'
import { useEffect, useRef, useState } from 'react'

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
    ingredientsChange(ingredients.slice(0,i).concat(ingredients.slice(i+1)))
  }

  return (
    <div className={css.root}>
      <h3 className={css.title}>Ingrédients</h3>

      <div className={css.ingredients}>
        {ingredients.map(function (item, i) {
          return (
            <li key={i} onClick={() => removeIngredientHandler(i)}>
              {item.name}
            </li>
          )
        })}
      </div>

      <div className={css.combo}>
        <input
          id="ingredient"
          type="text"
          placeholder="Ingrédient à ajouter"
          ref={inputRef}
        />
        <button
          className={css.button}
          onClick={() => addIngredientHandler(inputRef.current.value)}
        >
          Ajouter ingrédient
        </button>
      </div>
    </div>
  )
}
