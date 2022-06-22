/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { merge } from '../../utils/arrayUtils'
import css from './IngredientDisplay.module.scss'

export default function IngredientDisplay({ ingredient, backHandler }) {
  const [isRotated, setIsRotated] = useState(false)

  const containerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 60, autoAlpha: 0 },
      { y: 0, autoAlpha: 1 }
    )
  }, [])

  return (
    <div className={css.root}>
      <div className={css.background}></div>
      <div className={merge([css.card])} ref={containerRef}>
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
                <img src="/images/icons/love.svg" alt="" />
                <p>Adoré par :</p>
                <div className={css.users}>
                  <div className={css.avatarcontainer}>
                    <Image
                      className={css.avatar}
                      src={'/images/avatars/raph.png'}
                      alt={''}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className={css.avatarcontainer}>
                    <Image
                      className={css.avatar}
                      src={'/images/avatars/papa.png'}
                      alt={''}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className={css.avatarcontainer}>
                    <Image
                      className={css.avatar}
                      src={'/images/avatars/carine.png'}
                      alt={''}
                      width={32}
                      height={32}
                    />
                  </div>
                </div>
              </div>
              <div className={css.relation}>
                <img src="/images/icons/avoid.svg" alt="" />
                <p>Pas au goût de :</p>
              </div>
              <div className={css.relation}>
                <img src="/images/icons/allergies.svg" alt="" />
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
                    className={css.avatar}
                    src={'/images/avatars/carine.png'}
                    alt={''}
                    width={32}
                    height={32}
                  />
                </div>
                <p className={css.comment}>
                  Alors après plusieurs essais et quelques coupures j'ai réussi
                  à en découper un corrrectement ! Coupez le chapeau et le bas
                  de l'ananas. Débarrassez l'ananas de son écorce un peu comme
                  si vous épluchiez une pomme : tournez autour du fruit avec le
                  couteau !
                </p>
              </div>
              <div className={css.note}>
                <div className={css.user}>
                  <Image
                    className={css.avatar}
                    src={'/images/avatars/papa.png'}
                    alt={''}
                    width={32}
                    height={32}
                  />
                </div>
                <p className={css.comment}>
                  La semaine dernière on a roti des tranches au barbecue et
                  c'était pas mal du tout ! Un peu de vanille et de miel, du
                  rhum même pour les plus braves
                </p>
              </div>
              <div className={css.note}>
                <div className={css.user}>
                  <Image
                    className={css.avatar}
                    src={'/images/avatars/raph.png'}
                    alt={''}
                    width={32}
                    height={32}
                  />
                </div>
                <p className={css.comment}>
                  Truc tout bête mais si vous tirez sur les feuilles et qu'elles
                  partent facilement c'est qu'il est mûr !
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
