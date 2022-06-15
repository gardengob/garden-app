/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { merge } from '../../utils/arrayUtils'
import css from './MemberDetailsTabs.module.scss'

enum EMemberTabs {
  LOVE = "Ce que j'aime",
  AVOID = 'À éviter',
  ALLERGIES = 'Allergies',
  CONTESTS = 'Concours',
}

export default function MemberDetailsTabs({}) {
  const [tab, setTab] = useState<EMemberTabs>(EMemberTabs.LOVE)

  return (
    <div className={css.root}>
      <div className={css.tabs}>
        {(Object.keys(EMemberTabs) as Array<keyof typeof EMemberTabs>).map(
          (key) => {
            return (
              <h3
                key={key}
                className={merge([
                  css.tab,
                  EMemberTabs[key] === tab ? css['tab-active'] : '',
                ])}
                onClick={() => setTab(EMemberTabs[key])}
              >
                <img
                  className={css.icon}
                  src={`/images/icons/${key}.svg`}
                  alt=""
                />{' '}
                {EMemberTabs[key]}
              </h3>
            )
          }
        )}
      </div>

      <div className={css.content}>
        {tab === EMemberTabs.LOVE && (
          <>
            {/* {ingredients.map(function (item, i) {
              return (
                <li className={css.ingredient} key={i}>
                  {item.name} {item.amount} {item.unit}
                </li>
              )
            })} */}
            <div className={css.category}>
              <h4 className={css.subtitle}>Aliments préférés</h4>
              <div className={css.ingredients}>
                <span
                  className={merge([css.ingredient, css['ingredient-love']])}
                >
                  Poireau
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-love']])}
                >
                  Carotte
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-love']])}
                >
                  Artichaut
                </span>
              </div>
            </div>
            <div className={css.category}>
              <h4 className={css.subtitle}>Plats que j'adore</h4>
              <div className={css.dishes}>
                <span className={merge([css.dish, css['dish-love']])}>
                  Lasagnes
                </span>
                <span className={merge([css.dish, css['dish-love']])}>
                  Quiche Lorraine
                </span>
                <span className={merge([css.dish, css['dish-love']])}>
                  Wrap au saumon
                </span>
              </div>
            </div>
          </>
        )}
        {tab === EMemberTabs.AVOID && (
          <>
            <div className={css.category}>
              <h4 className={css.subtitle}>Aliments que je n'aime pas</h4>
              <div className={css.ingredients}>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Poireau
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Carotte
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Artichaut
                </span>
              </div>
            </div>
            <div className={css.category}>
              <h4 className={css.subtitle}>Plats dont je ne suis pas fan</h4>
              <div className={css.dishes}>
                <span className={merge([css.dish, css['dish-avoid']])}>
                  Lasagnes
                </span>
                <span className={merge([css.dish, css['dish-avoid']])}>
                  Quiche Lorraine
                </span>
                <span className={merge([css.dish, css['dish-avoid']])}>
                  Wrap au saumon
                </span>
              </div>
            </div>
          </>
        )}
        {tab === EMemberTabs.ALLERGIES && (
          <div className={css.ingredients}>
            <span
              className={merge([css.ingredient, css['ingredient-allergy']])}
            >
              Poireau
            </span>
            <span
              className={merge([css.ingredient, css['ingredient-allergy']])}
            >
              Carotte
            </span>
            <span
              className={merge([css.ingredient, css['ingredient-allergy']])}
            >
              Artichaut
            </span>
          </div>
        )}
        {tab === EMemberTabs.CONTESTS && (
          <div className={css.contests}>
            <span className={css.contest}>
              <p>Défi devine mon plat</p>
              <p>Le 11/04/2022</p>
            </span>
            <span className={css.contest}>
              <p>Concours carotte</p> <p>Le 11/04/2022</p>
            </span>
            <span className={css.contest}>
              <p>Concours lasagnes</p>
              <p>Le 11/04/2022</p>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
