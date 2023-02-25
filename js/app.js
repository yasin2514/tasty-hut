// load food
const loadFood = (foodName) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => displayFood(data.meals.slice(0, 6)))
        .catch(error => {
            document.getElementById("search_input").value = '';
            alert(error);
            return;
        })
};
loadFood('chicken');
// display food
const displayFood = (meals) => {
    const cardParent = document.getElementById('card_parent');
    cardParent.innerHTML = '';
    meals.forEach(meal => {
        const { strMeal, strInstructions, strMealThumb, idMeal } = meal;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border lg:card-side bg-base-100 shadow-2xl lg:h-64">
            <figure class="w-full h-56 lg:h-full"><img src="${strMealThumb}" alt="foods" class="h-full w-full" /></figure>
            <div class="card-body px-3">
                <h2 class="card-title ">${strMeal}</h2>
                <p>${strInstructions.slice(0, 120) + '...'}</p>
                <div class="card-actions justify-center mt-4">
                <label for="my-modal-5" class=" btn btn-warning btn-sm  hover:bg-yellow-600 font-bold" onclick="loadFoodDetails(${idMeal})">Details</label>
                </div>
            </div>
        </div>
       `;
        cardParent.appendChild(div);
    });
};

const loadAllFood = async (foodName) => {
    try {
        const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
        const res = await fetch(URL);
        const data = await res.json();
        displayFood(data.meals);
    }
    catch (error) {
        alert('error');
        return;
    }
};


// search food
const searchFood = () => {
    const searchInput = document.getElementById("search_input");
    let search = searchInput.value;
    if (search == '') {
        loadFood('chicken');
    }
    else {
        loadFood(search);
    }
    return search;
}
// click show all
const showAllFood = () => {
    const search = searchFood();
    const showAllBtn = document.getElementById('show_all_btn');
    const btnText = showAllBtn.innerText;
    if (btnText === 'SHOW ALL') {
        if (search === '') {
            loadAllFood('chicken');
        }
        else {
            loadAllFood(search);
        }
        loadAllFood('chicken');
        showAllBtn.innerText = "SHOW LESS";
    }
    else {
        if (search === '') {
            loadFood('chicken');
        }
        else {
            loadFood(search);
        }
        loadFood('chicken');
        showAllBtn.innerText = "SHOW ALL";
    }
}
// load one food details
const loadFoodDetails = id => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => showFoodDetails(data.meals[0]))
        .catch(error => {
            alert(error);
            return;
        })

};

// modal
const showFoodDetails = food => {
    const modalContainer = document.getElementById('modal_container');
    const { strMeal, strInstructions, strMealThumb,strCategory,strYoutube,strArea } = food;
    modalContainer.innerHTML = `
    <div class="card lg:card-side  lg:h-64">
            <figure class="w-full h-56 lg:h-full"><img src="${strMealThumb}" alt="foods" class="h-full w-full" /></figure>
            <div class="card-body px-2">
                <h2 class="card-title ">${strMeal}</h2>
                <p>Category: ${strCategory}</p>
                <p>${strArea} food</p>
                <p>${strInstructions.slice(0, 240) + '...'}</p>
                <a class="text-red-500" title="click here" href="${strYoutube}">View Food On Youtube</a>

            </div>
        </div>
    `
}


