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
                  Épinards
                </span>
              </div>
            </div>
            <div className={css.category}>
              <h4 className={css.subtitle}>Plats que j'adore</h4>
              <div className={css.dishes}>
                <span className={merge([css.dish, css['dish-love']])}>
                  Pâtes au beurre
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
                {/* // oignons, choux, carottes, mangue, cerises,
//  artichaut, asperge, potiron, concombre , aubergine, brocoli, endive, 
//  asperge,abrivot, pêche, litchi, ananas, fenouil, radis , lentilles, comcombre */}
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Oignons
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Choux
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Carottes
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Mangue
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Cerises
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Artichaut
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Asperge
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Potiron
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Concombre
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Aubergine
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Brocoli
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Endive
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Abricot
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Pêche
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Litchi
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Ananas
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Fenouil
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Radis
                </span>
                <span
                  className={merge([css.ingredient, css['ingredient-avoid']])}
                >
                  Lentilles
                </span>
              </div>
            </div>
            <div className={css.category}>
              <h4 className={css.subtitle}>Plats dont je ne suis pas fan</h4>
              <div className={css.dishes}>
                <span className={merge([css.dish, css['dish-avoid']])}>
                  Salade de concombre
                </span>
                <span className={merge([css.dish, css['dish-avoid']])}>
                  Clafouti cerise
                </span>
                <span className={merge([css.dish, css['dish-avoid']])}>
                  Gratin au brocoli
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
