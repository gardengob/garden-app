/* eslint-disable @next/next/no-img-element */
import css from './RecipeQuantitiesStep.module.scss'
import { ECookingUnit, IIngredient, IRecipe } from '../../types/recipe'

export default function RecipeQuantitiesStep({
  ingredients,
  ingredientsQuantitiesChange,
}) {
  const changeIngredientAmountHandler = (e, i: number) => {
    ingredientsQuantitiesChange([
      ...ingredients.slice(0, i),
      {
        ...ingredients[i],
        amount: e.target.value,
      },
      ...ingredients.slice(i + 1),
    ])
  }

  const changeIngredientCookingUnitHandler = (e, i: number) => {
    ingredientsQuantitiesChange([
      ...ingredients.slice(0, i),
      {
        ...ingredients[i],
        unit: e.target.value,
      },
      ...ingredients.slice(i + 1),
    ])
  }

  const removeIngredientHandler = (i: number) => {
    ingredientsQuantitiesChange(
      ingredients.slice(0, i).concat(ingredients.slice(i + 1))
    )
  }

  return (
    <div className={css.root}>
      <h3 className={css.title}>Quantités</h3>
      <div className={css.ingredients}>
        {ingredients.map(function (item: IIngredient, i) {
          return (
            <div className={css.ingredient} key={i}>
              <p className={css.name}>{item.name}</p>
              <div className={css.quantity}>
                <input
                  className={css.value}
                  name="ingredientAmount"
                  id="ingredientAmount"
                  type="number"
                  value={item.amount}
                  onChange={(e) => changeIngredientAmountHandler(e, i)}
                />
                <select
                  className={css.drop}
                  name="ingredientCookingUnit"
                  id="ingredientCookingUnit"
                  value={item.unit}
                  onChange={(e) => changeIngredientCookingUnitHandler(e, i)}
                >
                  {(
                    Object.keys(ECookingUnit) as Array<
                      keyof typeof ECookingUnit
                    >
                  ).map((key, i) => {
                    return (
                      <option key={i} value={ECookingUnit[key]}>
                        {ECookingUnit[key]}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div
                className={css.delete}
                onClick={() => removeIngredientHandler(i)}
              >
                <img
                  className={css.icon}
                  src={`/images/icons/cross.svg`}
                  alt=""
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
