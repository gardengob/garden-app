/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { merge } from '../../utils/arrayUtils'
import css from './IngredientDisplay.module.scss'

export default function IngredientDisplay({ ingredient, backHandler }) {
  const [isRotated, setIsRotated] = useState(false)
  return (
    <div className={css.root}>
      <div className={css.background}></div>
      <div className={merge([css.card])}>
        <div
          className={merge([css.inner, isRotated ? css['inner-rotated'] : ''])}
        >
          <div className={css['card-front']}>
            <div className={css.head}>
              <div className={css.title}>
                <h3 className={css.name} onClick={backHandler}>
                  {ingredient.name}
                </h3>
                <p className={css.type}>{ingredient.type}</p>
              </div>

              <div className={css.image}>
                <Image
                  src={ingredient.imageUrl}
                  alt={''}
                  width={150}
                  height={150}
                />
              </div>
            </div>
            <div className={css.details}>
              <div className={css.detail}>
                <p>Semance</p>
                <p className={css.value}>{ingredient.semance}</p>
              </div>
              <div className={css.detail}>
                <p>Saisonalité</p>
                <p className={css.value}>{ingredient.season}</p>
              </div>
              <div className={css.detail}>
                <p>Origine</p>
                <p className={css.value}>{ingredient.origin}</p>
              </div>
            </div>
            <div className={css.relations}>
              <div className={css.relation}>
                <p>Adoré par :</p>
              </div>
              <div className={css.relation}>
                <p>Pas au goût de :</p>
              </div>
              <div className={css.relation}>
                <p>Allergie :</p>
              </div>
            </div>
          </div>
          <div className={css['card-back']}>
            <h3 className={css.name} onClick={backHandler}>
              {ingredient.name}
            </h3>
            <div className={css.notes}>
              <div className={css.note}>
                <div className={css.user}>
                  <Image
                    src={'/images/user.png'}
                    alt={''}
                    width={32}
                    height={32}
                  />
                </div>
                <p className={css.comment}>
                  Mamie adore les artichauts depuis qu'elle en a gouté avec la
                  recette de Marion. Elle en mange assez rarement !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.rotate} onClick={() => setIsRotated(!isRotated)}>
        <Image
          className={css.icon}
          src={`/images/icons/rotate.svg`}
          alt={'close'}
          width={24}
          height={24}
        />
      </div>
    </div>
  )
}
