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
import Multiselect from 'multiselect-react-dropdown'

export default function Recipes() {
  const CAMERA_POSITION: Component3dName = 'kitchen'

  const router = useRouter()
  const [recipes, setRecipes] = useState([])

  const [dishes, setDishes] = useState([])
  const [diets, setDiets] = useState([])

  const [people, setPeople] = useState([])
  const [members, setMembers] = useState([])

  const [dishFilters, setDishFilters] = useState<(ITag | string)[]>([
    'noFilters',
  ])
  const [dietFilters, setDietFilters] = useState<(ITag | string)[]>([
    'noFilters',
  ])
  // const [displayUI, setDisplayUI] = useState<boolean>(false)

  useEffect(() => console.log('PEOPLE', people), [people])
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
      setDiets(data)
    })
    TagService.getDishes().then((data) => {
      setDishes(data)
    })

    FamilyService.getUsers(localStorage.getItem('familyId')).then((data) => {
      console.log('DATAAAA', data)
      data.map((d, i) => {
        console.log('DATAAAA', d.user)
        setMembers((m) => [...m, d.user])
      })
    })

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

  const debounce = (func, timeout = 300) => {
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

  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedItem)
    setPeople([...people, selectedItem])
  }

  const onRemove = (selectedList, removedItem) => {
    console.log(removedItem)
    setPeople(
      people.filter((item) => {
        return item !== removedItem
      })
    )
  }

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
      <div className={css.filters}>
        <div className={css.search}>
          <input
            placeholder="Rechercher..."
            type="text"
            onChange={(e: ChangeEvent) => {
              processChange(e)
            }}
          />
          <img className={css.icon} src="/images/icons/search.svg" alt="" />
        </div>

        <div className={css.filter}>
          <select
            className={css.select}
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
            <option value="noFilters">Types</option>
            {dishes &&
              dishes.map((diet, index) => {
                return (
                  <option key={index} value={diet.id}>
                    {diet.label}
                  </option>
                )
              })}
          </select>
          <img className={css.icon} src="/images/icons/cooking.svg" alt="" />
        </div>

        <div className={css.filter}>
          <select
            className={css.select}
            onChange={(e) => {
              if (e.target.value == 'noFilters') {
                setDietFilters(['noFilters'])
              } else {
                RecipeService.getTagRecipe(e.target.value).then((data) => {
                  setDietFilters(data)
                })
              }
            }}
          >
            <option value="noFilters">Régimes</option>
            {diets &&
              diets.map((diet, index) => {
                return (
                  <option key={index} value={diet.id}>
                    {diet.label}
                  </option>
                )
              })}
          </select>
          <img className={css.icon} src="/images/icons/regime.svg" alt="" />
        </div>

        <div className={css.filter}>
          <Multiselect
            className={css.select}
            hideSelectedList
            showCheckbox
            placeholder="Membres"
            options={members} // Options to display in the dropdown
            selectedValues={people} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="username" // Property name to display in the dropdown options
          />

          {/* <select
            className={css.select}
            multiple
            // onChange={(e) => {
            //   if (e.target.value == 'noFilters') {
            //     setDishFilters(['noFilters'])
            //   } else {
            //     RecipeService.getTagRecipe(e.target.value).then((data) => {
            //       console.log('datazzzzzzzzzzzzzzz', data)
            //       setDishFilters(data)
            //     })
            //   }
            // }}
          > */}
          {/* <option value="noFilters">Membres</option>
            {members &&
              members.map((member, index) => {
                return (
                  <option
                    key={index}
                    value={member.user_id}
                    onClick={() => console.log('ADD', member.user_id)}
                  >
                    {member.user_id}
                  </option>
                )
              })}
          </select> */}
          <img className={css.icon} src="/images/icons/user.svg" alt="" />
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
                  return recipe.dislikes
                    ? recipe.dislikes.find((dislike) => {
                        return dislike.user_id === user.id
                      })
                    : false
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
