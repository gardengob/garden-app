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
    ingredientsQuantitiesChange((ingredients) => ingredients.splice(0, i))
  }

  return (
    <div className={css.root}>
      <h3 className={css.title}>Quantités</h3>
      <div className={css.ingredients}>
        {ingredients.map(function (item: IIngredient, i) {
          return (
            <li key={i}>
              <p onClick={() => removeIngredientHandler(i)}>{item.name}</p>
              <div className={css.quantity}>
                <input
                  name="ingredientAmount"
                  id="ingredientAmount"
                  type="number"
                  value={item.amount}
                  onChange={(e) => changeIngredientAmountHandler(e, i)}
                />
                <select
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
            </li>
          )
        })}
      </div>
    </div>
  )
}
