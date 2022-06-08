import css from './RecipeTagsStep.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { EDifficulty, ITag } from '../../types/recipe'
import { supabase } from '../../utils/supabaseClient'
import TagService from '../../services/TagService'

export default function RecipeTagsStep({
  difficulty,
  difficultyChange,
  diet,
  dietChange,
  tags,
  tagsChange,
}) {
  const [availableDifficulties, setAvailableDifficulties] = useState<ITag[]>([])
  const [availableDiets, setAvailableDiets] = useState<ITag[]>([])
  const [availableTags, setAvailableTags] = useState<ITag[]>([])

  useEffect(() => {
    TagService.getDifficulties().then((difficultyTags) =>
      setAvailableDifficulties(difficultyTags)
    )
    TagService.getDiets().then((dietTags) => setAvailableDiets(dietTags))
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
      : tagsChange((tags) => tags.filter(t => t.id != tag.id))
  }

  return (
    <div className={css.root}>
      <h3 className={css.title}>Tags</h3>
      <div className={css.group}>
        <label htmlFor="difficulty">Difficulté</label>
        {availableDifficulties.map(function (item, i) {
          return (
            <React.Fragment key={i}>
              <span>{item.label}</span>
              <input
                type="radio"
                className="radio"
                value={item.id}
                name="difficulty"
                checked={difficulty.id === item.id}
                onChange={() => difficultyChange(item)}
              />
            </React.Fragment>
          )
        })}
      </div>
      <div className={css.group}>
        <label htmlFor="diet" onClick={() => TagService.getDiets()}>
          Régime alimentaire
        </label>
        {availableDiets.map(function (item, i) {
          return (
            <React.Fragment key={i}>
              <span>{item.label}</span>
              <input
                key={i}
                type="radio"
                className="radio"
                value={item.id}
                name="diet"
                checked={diet.id === item.id}
                onChange={() => dietChange(item)}
              />
            </React.Fragment>
          )
        })}
      </div>
      <div className={css.group}>
        <label>Tags</label>
        {availableTags.map(function (item, i) {
          return (
            <React.Fragment key={i}>
              <span>{item.label}</span>
              <input
                key={i}
                type="checkbox"
                className="radio"
                value={item.id}
                name={item.label}
                checked={tags.some((e) => e.id === item.id)}
                onChange={(e) => toggleTagHandler(e, item)}
              />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
