export interface IRecipe {
  id?: string
  familyId: string
  authorId: string
  name: string
  peopleAmount: number
  preparationTime: IMeasurable
  cookingTime: IMeasurable
  ingredients: IIngredient[]
  instructions: string[]
  imageUrl: string
  difficulty: ITag
  diet: ITag
  dish: ITag
  tags: ITag[]
  likes?: { user_id: string; avatar_url: string }[]
  dislikes?: { user_id: string; avatar_url: string }[]
}

export interface ITag {
  id: string
  label: string
  type_id: string
  family_id: string
}

export interface IRecipeTag {
  recipe_id: string
  tag_id: string
}

export interface IIngredient {
  name: string
  amount: number
  unit: string
}

export interface IMeasurable {
  amount: number
  unit: ETimeUnit | ECookingUnit
}

export enum EDifficulty {
  EASY = '62577fca-67aa-42e7-b8ee-e50927f87175',
  MEDIUM = '10170810-c338-4aea-83e4-70b32c0c2add',
  HARD = 'ab7f3f15-7736-4a52-8739-42ffa00468b0',
}

export enum ETimeUnit {
  MINUTES = 'min',
  HOURS = 'h',
}

export enum ECookingUnit {
  PIECE = 'p',
  TEASPOON = 'càc',
  TABLESPOON = 'càs',
  CUP = 'tass',
  GLASS = 'verre',
  MILLILITER = 'ml',
  CENTILITER = 'cl',
  LITER = 'l',
  GRAM = 'g',
  KILOGRAM = 'kg',
}
