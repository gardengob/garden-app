export interface IRecipe {
  name: string
  peopleAmount: number
  preparationTime: IMeasurable
  cookingTime: IMeasurable
  ingredients: IIngredient[]
  instructions: string[]
  imageUrl: string
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

export enum ETimeUnit {
    MINUTES = "minutes",
    HOURS = "heures",
}

export enum ECookingUnit {
    NONE = "-",
    TEASPOON = "càc",
    TABLESPOON = "càs",
    CUP = "tass",
    GLASS = "verre",
    MILLILITER = "ml",
    CENTILITER = "cl",
    LITER = "l",
    GRAM = "g",
    KILOGRAM = "kg",
}
