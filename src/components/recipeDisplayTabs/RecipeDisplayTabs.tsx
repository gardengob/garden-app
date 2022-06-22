/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { merge } from '../../utils/arrayUtils'
import css from './RecipeDisplayTabs.module.scss'

enum ERecipeTabs {
  INGREDIENTS = 'Ingrédients',
  INSTRUCTIONS = 'Instructions',
  NOTES = 'Notes',
}

export default function RecipeDisplayTabs({
  ingredients,
  instructions,
  notes,
}) {
  const [tab, setTab] = useState<ERecipeTabs>(ERecipeTabs.INGREDIENTS)
  return (
    <div className={css.root}>
      <div className={css.tabs}>
        {(Object.keys(ERecipeTabs) as Array<keyof typeof ERecipeTabs>).map(
          (key) => {
            return (
              <h3
                key={key}
                className={merge([
                  css.tab,
                  ERecipeTabs[key] === tab ? css['tab-active'] : '',
                ])}
                onClick={() => setTab(ERecipeTabs[key])}
              >
                <img
                  className={css.icon}
                  src={`/images/icons/${key.toLowerCase()}.svg`}
                  alt=""
                />{' '}
                {ERecipeTabs[key]}
              </h3>
            )
          }
        )}
      </div>

      <div className={css.content}>
        {tab === ERecipeTabs.INGREDIENTS && (
          <>
            {ingredients.map(function (item, i) {
              return (
                <li className={css.ingredient} key={i}>
                  {item.name} {item.amount} {item.unit}
                </li>
              )
            })}
          </>
        )}
        {tab === ERecipeTabs.INSTRUCTIONS && (
          <>
            {instructions.map(function (item, i) {
              return (
                <li className={css.instruction} key={i}>
                  <p className={css.step}>Étape {i + 1}</p>
                  <p className={css.text}>{item}</p>
                </li>
              )
            })}
          </>
        )}
        {tab === ERecipeTabs.NOTES && <p>Work in progress 🚧</p>}
      </div>
    </div>
  )
}
