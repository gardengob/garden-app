import { useEffect, useState } from 'react'
import css from './RecipeDisplay.module.scss'

export default function IngredientDisplay({ ingredient }) {
  return (
    <div className={css.root}>
      <h3>Display{ingredient.name}</h3>
    </div>
  )
}
