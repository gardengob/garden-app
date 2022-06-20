/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { ChangeEvent, useEffect, useState } from 'react'
import RecipePreview from '../components/recipePreview/RecipePreview'
import RippedPaper from '../components/rippedPaper/RippedPaper'
import FamilyService from '../services/FamilyService'
import { supabase } from '../utils/supabaseClient'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'
import css from './recipes.module.scss'
import { merge } from '../utils/arrayUtils'
import UiService from '../services/events/UiService'
import WebglService from '../services/events/WebglService'
import RecipeService from '../services/RecipeService'
import TagService from '../services/TagService'
import { ITag } from '../types/recipe'

export default function Recipes() {
  const CAMERA_POSITION: Component3dName = 'kitchen'

  const router = useRouter()
  const [recipes, setRecipes] = useState([])

  const [dishes, setDishes] = useState([])
  const [diets, setDiets] = useState([])
  const [people, setPeople] = useState([])

  const [dishFilters, setDishFilters] = useState<(ITag | string)[]>([
    'noFilters',
  ])
  const [dietFilters, setDietFilters] = useState<(ITag | string)[]>([
    'noFilters',
  ])
  // const [displayUI, setDisplayUI] = useState<boolean>(false)
  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
    WebglService.disable3D()

    localStorage.setItem('display3D', 'false')
  }, [])

  useEffect(() => {
    const subscription = supabase
      .from('user_family')
      .on('*', (payload) => {
        FamilyService.getRecipes(localStorage.getItem('familyId')).then(
          (families) => setRecipes(families)
        )
      })
      .subscribe()

    FamilyService.getRecipes(localStorage.getItem('familyId')).then(
      (familyRecipes) => setRecipes(familyRecipes)
    )

    TagService.getDiets().then((data) => {
      console.log('got test', data)

      setDiets(data)
    })
    TagService.getDishes().then((data) => {
      console.log('got test', data)

      setDishes(data)
    })
    setPeople([
      { user_id: 'f682af07-c306-4fac-be6f-7049ced85ec8', avatar_url: '' },
      // { user_id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5', avatar_url: '' },
    ])

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  // useEffect(() => {
  //   setRecipes(
  //     recipes.filter((recipe) => {
  //       console.log('recipe', recipe)

  //       return recipe.dish.id == dishFilters
  //     })
  //   )
  // }, [dishFilters, dishFilters])

  function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }

  const processChange = debounce((e) => {
    RecipeService.searchRecipe(e.target.value).then((data) => {
      setRecipes(data)
    })
  })

  return (
    <div className={merge([css.root, 'garden-ui'])}>
      <div className={css.head}>
        <Link href={`/garden`}>
          <a className={css.back}>
            <img className={css.icon} src={`/images/icons/back.svg`} alt="" />
          </a>
        </Link>
        <h1 className={css.title}>Les recettes de la famille</h1>
        <Link href={`/add-recipe`}>
          <a className={css.add}>
            <img className={css.icon} src={`/images/icons/plus.svg`} alt="" />
          </a>
        </Link>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <div>
          <input
            className={css.searchInput}
            style={{
              padding: '16px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '6px',
              marginRight: '16px',
            }}
            placeholder="Rechercher..."
            type="text"
            onChange={(e: ChangeEvent) => {
              processChange(e)
            }}
          />
        </div>
        <div>
          <select
            style={{
              padding: '16px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '6px',
              marginRight: '16px',
            }}
            onChange={(e) => {
              console.log(e.target.value)
              if (e.target.value == 'noFilters') {
                setDietFilters(['noFilters'])
              } else {
                RecipeService.getTagRecipe(e.target.value).then((data) => {
                  console.log('datazzzzzzzzzzzzzzz', data)
                  setDietFilters(data)
                })
              }
            }}
          >
            <option value="noFilters">Régime</option>
            {diets &&
              diets.map((diet, index) => {
                console.log('diet', diets)
                return (
                  <option key={index} value={diet.id}>
                    {diet.label}
                  </option>
                )
              })}
          </select>
        </div>

        <div>
          <select
            style={{
              padding: '16px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '6px',
              marginRight: '16px',
            }}
            onChange={(e) => {
              console.log(e.target.value)
              if (e.target.value == 'noFilters') {
                setDishFilters(['noFilters'])
              } else {
                RecipeService.getTagRecipe(e.target.value).then((data) => {
                  console.log('datazzzzzzzzzzzzzzz', data)
                  setDishFilters(data)
                })
              }
            }}
          >
            <option value="noFilters">Type de Plat</option>
            {dishes &&
              dishes.map((diet, index) => {
                console.log('diet', dishes)
                return (
                  <option key={index} value={diet.id}>
                    {diet.label}
                  </option>
                )
              })}
          </select>
        </div>
      </div>
      <div className={css.recipes}>
        {recipes
          .filter((recipe) => {
            return dishFilters !== null && dishFilters[0] !== 'noFilters'
              ? dishFilters.find((tag) => {
                  return (tag as any).recipe_id == recipe.id
                })
              : true
          })
          .filter((recipe) => {
            return people !== null && people[0] !== 'noFilters'
              ? !people.find((user) => {
                  console.log('user', user)
                  console.log('recipe.dislikes', recipe.dislikes)
                  return recipe.dislikes.find((dislike) => {
                    return dislike.user_id === user.user_id
                  })
                })
              : true
          })
          .filter((recipe) => {
            return dietFilters !== null && dietFilters[0] !== 'noFilters'
              ? dietFilters.find((tag) => {
                  return (tag as any).recipe_id == recipe.id
                })
              : true
          })
          .map(function (recipe, i) {
            return (
              <div className={css.recipe} key={i}>
                <RecipePreview recipe={recipe} />
              </div>
            )
          })}
      </div>

      <div className={css.ripped}>
        <RippedPaper />
      </div>
    </div>
  )
}
