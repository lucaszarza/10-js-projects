const meals = document.getElementById('meals')

getRandomMeal()

async function getRandomMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')

  const data = await response.json()
  const randomMeal = data.meals[0]

  // console.log(randomMeal)

  addMeal(randomMeal, true)
}

async function getMealById(id) {
  const idMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
}

async function getMealsBySearch(term) {
  const searchMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
}

function addMeal(mealData, random = false) {
  const meal = document.createElement('div')
  meal.classList.add('meal')

  meal.innerHTML = `<div class="meal-header">

    ${random ? '<span class="random">Random Meal</span>' : ''}

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

  meal.querySelector('.meal-body .fav-button').addEventListener('click', () => {
    
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
  })
  meals.appendChild(meal)
}

function addMealLS(mealId) {
  const mealIds = getMealsLS();
  
  localStorage.setItem('mealIds',JSON.stringify([...mealIds, mealId]))
  
  // localStorage.setItem('mealIds',JSON.stringify(mealIds.push(mealId)))
}

function removeMealLS(mealId){
  const mealIds = getMealsLS();
  
  localStorage.setItem('mealIds',JSON.stringify(mealIds.filter((id)=> id !== mealId)));
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealIds')) || []
  console.log(mealIds)
  // listFavMeals()
  return mealIds
}

function listFavMeals(){
  const mealIds = getMealsLS();

  for (id of mealIds) {
    console.log(id)
  }
}