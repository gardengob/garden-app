import css from './RecipeTagsStep.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { ITag } from '../../types/recipe'
import { supabase } from '../../utils/supabaseClient'
import TagService from '../../services/TagService'
import { merge } from '../../utils/arrayUtils'

export default function RecipeTagsStep({
  difficulty,
  difficultyChange,
  diet,
  dietChange,
  dish,
  dishChange,
  tags,
  tagsChange,
}) {
  const [availableDifficulties, setAvailableDifficulties] = useState<ITag[]>([])
  const [availableDiets, setAvailableDiets] = useState<ITag[]>([])
  const [availableDishes, setAvailableDishes] = useState<ITag[]>([])
  const [availableTags, setAvailableTags] = useState<ITag[]>([])

  useEffect(() => {
    TagService.getDifficulties().then((difficultyTags) =>
      setAvailableDifficulties(difficultyTags)
    )
    TagService.getDiets().then((dietTags) => setAvailableDiets(dietTags))
    TagService.getDishes().then((dishTags) => setAvailableDishes(dishTags))
    TagService.getAll().then((tags) => setAvailableTags(tags))

    const subscription = supabase
      .from('tag')
      .on('*', (payload) => {
        TagService.getAll().then((tags) => setAvailableTags(tags))
      })
      .subscribe()

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  const toggleTagHandler = (e, tag: ITag) => {
    e.target.checked
      ? tagsChange((tags) => [...tags, tag])
      : tagsChange((tags) => tags.filter((t) => t.id != tag.id))
  }

  return (
    <div className={css.root}>
      <h2 className={css.title}>Informations</h2>
      <div className={merge([css.group, css['group-difficulty']])}>
        <h3 className={css.label}>Niveau de difficulté</h3>

        <div className={css.container}>
          <span>Facile</span>
          <div className={css.levels}>
            {availableDifficulties.map(function (item, i) {
              return (
                <React.Fragment key={i}>
                  <input
                    id={item.label}
                    className={css.level}
                    type="radio"
                    name="difficulty"
                    value={item.id}
                    onChange={() => difficultyChange(item)}
                    checked={difficulty.id === item.id}
                  />
                </React.Fragment>
              )
            })}
          </div>
          <span>Difficile</span>
        </div>
      </div>

      <div className={css.group}>
        <h3 className={css.label}>Type de plat</h3>

        <div className={css.container}>
          {availableDishes.map(function (item, i) {
            return (
              <React.Fragment key={i}>
                <input
                  id={item.label}
                  className={css.checkbox}
                  type="radio"
                  name="dish"
                  value={item.id}
                  onChange={() => dishChange(item)}
                  checked={dish.id === item.id}
                />
                <label className={css.tag} htmlFor={item.label}>
                  {item.label}
                </label>
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <div className={css.group}>
        <h3 className={css.label}>Régime alimentaire</h3>

        <div className={css.container}>
          {availableDiets.map(function (item, i) {
            return (
              <React.Fragment key={i}>
                <input
                  id={item.label}
                  className={css.checkbox}
                  type="radio"
                  name="diet"
                  value={item.id}
                  onChange={() => dietChange(item)}
                  checked={diet.id === item.id}
                />
                <label className={css.tag} htmlFor={item.label}>
                  {item.label}
                </label>
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <div className={css.group}>
        <h3 className={css.label}>Autres tags</h3>

        <div className={css.container}>
          {availableTags.map(function (item, i) {
            return (
              <React.Fragment key={i}>
                <input
                  id={item.label}
                  className={css.checkbox}
                  type="checkbox"
                  name={item.label}
                  value={item.id}
                  onChange={(e) => toggleTagHandler(e, item)}
                  checked={tags.some((e) => e.id === item.id)}
                />
                <label className={css.tag} htmlFor={item.label}>
                  {item.label}
                </label>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
