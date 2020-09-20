const mealsEl = document.getElementById('meals')
const favoriteContainer = document.getElementById('fav-meals')

const mealModal = document.getElementById('meal-modal')
const modalCloseBtn = document.getElementById('close-modal')
const mealInfoEl = document.getElementById('meal-info')

const searchTerm = document.getElementById('search-term')
const searchBtn = document.getElementById('search')

getRandomMeal()
showFavMeals()

async function getRandomMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')

  const data = await response.json()
  const randomMeal = data.meals[0]

  addMeal(randomMeal, true)
}

async function getMealById(id) {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)

  const respData = await resp.json()
  const meal = respData.meals[0]

  return meal
}

async function getMealsBySearch(term) {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term)

  const respData = await resp.json()

  const meals = await respData.meals

  return meals
}

function addMeal(mealData, random = false) {
  const meal = document.createElement('div')
  meal.classList.add('meal')

  meal.innerHTML = `<div class="meal-header">

    ${random ? '<span class="random">Random Recipe</span>' : ''}

    <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
    />
  </div>
  <div class="meal-body">
    <h4>${mealData.strMeal}</h4>
    <button class="fav-button">
      <i class="far fa-heart"></i>
    </button>
  </div>`

  const btn = meal.querySelector('.meal-body .fav-button')

  btn.addEventListener('click', () => {
    const icon = meal.querySelector('i')
    icon.classList.toggle('active')

    if (icon.classList.contains('active')) {
      icon.classList.replace('far', 'fas')
      // console.log('liked')
      addMealLS(mealData.idMeal)
    } else {
      icon.classList.replace('fas', 'far')
      // console.log('desliked')
      removeMealLS(mealData.idMeal)
    }

    favoriteContainer.innerHTML = ''
    showFavMeals()
  })

  meal.addEventListener('click', () => {
    showMealInfo(mealData)
  })

  mealsEl.appendChild(meal)
}

function addMealLS(mealId) {
  const mealIds = getMealsLS()
  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS()

  localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)))
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealIds')) || []

  return mealIds
}

async function showFavMeals() {
  // clean the container
  favoriteContainer.innerHTML = ''

  const mealIds = getMealsLS()

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i]
    meal = await getMealById(mealId)

    addMealFav(meal)
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement('li')

  favMeal.innerHTML = `
    <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
    /><span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-times-circle"></i></button>
  `
  const btn = favMeal.querySelector('.clear')

  btn.addEventListener('click', function () {
    removeMealLS(mealData.idMeal)

    showFavMeals()
  })

  favMeal.addEventListener('click', () => {
    showMealInfo(mealData)
  })

  favoriteContainer.appendChild(favMeal)
}

function showMealInfo(mealData) {
  const mealEl = document.createElement('div')

  mealInfoEl.innerHTML = ''

  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    if (mealData['strIngredient' + i]) {
      ingredients.push(`${mealData['strIngredient' + i]} - ${mealData['strMeasure' + i]}`)
      console.log(ingredients)
    } else {
      break
    }
  }

  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
    />
    <p class="modal-text">
      ${mealData.strInstructions}
    </p>
    <h3>Ingredients</h3>
    <ul>
      ${ingredients
        .map(
          (ing) => `
      <li>${ing}</li>
      `
        )
        .join('')}
    </ul>
    
    `

  //   <ul>
  //   <li>ing 1 / measure</li>
  //   <li>ing 2 / measure</li>
  //   <li>ing 3 / measure</li>
  // </ul>

  mealInfoEl.appendChild(mealEl)

  mealModal.classList.remove('hidden')
}

searchBtn.addEventListener('click', async function () {
  mealsEl.innerHTML = ''
  const search = searchTerm.value
  const meals = await getMealsBySearch(search)

  if (meals) {
    for (meal of meals) {
      addMeal(meal)
    }
  } else {
    alert('No results found')
  }
})

modalCloseBtn.addEventListener('click', () => {
  mealModal.classList.add('hidden')
})
