import Image from 'next/image'
import css from './RecipeCard.module.scss'

export default function RecipeCard(recipe: any) {
  return (
    <div className={css.root}>
      {recipe.recipe && (
        <div>
          <h2 className={css.title}>{recipe.recipe.name}</h2>
          <div className={css.details}>
            <Image
              className={css.image}
              src={recipe.recipe.image_url}
              alt={recipe.recipe.name}
              unoptimized={true}
              width={500}
              height={200}
            />
            <p className={css.detail}>
              <label>Personnes:</label> {recipe.recipe.people_amount}
            </p>
            <p className={css.detail}>
              <label>Temps de préparation:</label>{' '}
              {recipe.recipe.preparation_time}
            </p>
            <p className={css.detail}>
              <label>Temps de cuisson:</label> {recipe.recipe.cooking_time}
            </p>
          </div>

          <div className={css.ingredients}>
            <label>Ingrédients</label>
            {recipe.recipe.ingredients.map(function (item, i) {
              return <li key={i}>{item.name}{item.amount}{item.unit}</li>
            })}
          </div>

          <div className={css.instructions}>
            <label>Étapes</label>
            {recipe.recipe.instructions.map(function (item, i) {
              return <li key={i}>{item}</li>
            })}
          </div>
        </div>
      )}
    </div>
  )
}
