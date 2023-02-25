
const loadFood = (foodName) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => displayFood(data.meals.slice(0, 6)))
        .catch(error => {
            alert(error);
            return;
        })
};
const loadFood2 = async () => {
    try {
        const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
        const res = await fetch(URL);
        const data = await res.json();
        displayFood(data);
    }
    catch (error) {
        alert('error');
        return;
    }
};
// display food
const displayFood = (meals) => {
    const cardParent = document.getElementById('card_parent');
    cardParent.innerHTML = '';
    meals.forEach(meal => {
        const { strMeal, strInstructions, strMealThumb } = meal;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border lg:card-side bg-base-100 shadow-2xl lg:h-64">
            <figure class="w-full h-56 lg:h-full"><img src="${strMealThumb}" alt="foods" class="h-full w-full" /></figure>
            <div class="card-body px-2">
                <h2 class="card-title ">${strMeal}</h2>
                <p>${strInstructions.slice(0, 120) + '...'}</p>
                <div class="card-actions justify-center mt-4">
                    <button class=" btn btn-warning btn-sm  hover:bg-yellow-600 font-bold">Details</button>
                </div>
            </div>
        </div>
       `;
        cardParent.appendChild(div);
    });
};
// search food
const searchFood = () => {
    const searchInput = document.getElementById("search_input");
    const search = searchInput.value;
    if (search == '') {
        alert("please enter a food name");
        return;
    }
    loadFood(search);
    searchInput.value = '';

}
// click show all
const showAllFood = ()=>{

}
loadFood('chicken');
