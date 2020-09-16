const meals = document.getElementById('meals')

async function getRandomMeal() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')

    const data = await response.json()
    const randomMeal = data.meals[0]

    console.log(randomMeal)

    addMeal(randomMeal, true)
}

async function getMealById(id) {
    const idMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
}

async function getMealsBySearch(term) {
    const searchMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
}

addMeal(mealData, (random = false))
