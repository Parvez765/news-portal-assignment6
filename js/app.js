const loadCatagory = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayMenuBar(data.data))
        .catch(error => console.log(error));
}


const displayMenuBar = (data) => {
    
    const menuContainer = document.getElementById("menu-Container")
    
    data.news_category.forEach(menu => {
        
        const ulList = document.createElement('ul')
        ulList.classList.add('nav')
        ulList.innerHTML = `
        
        <li onclick="loadNewsByCategory(${menu.category_id})" class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">${menu.category_name}</a>
        </li>
        `
        menuContainer.appendChild(ulList)
    })
    
}

const loadNewsByCategory = (category_id) => {
    let categoryId = category_id
    if (categoryId > 0  && categoryId < 10) {
        categoryId = "0" + categoryId
    }
    loadSpinner(true)
    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
        .then(res => res.json())
        .then(data => displayNewsByCatagory(data))
        .catch(error => console.log(error));
}

const displayNewsByCatagory = (menu) => {
    menu.data.forEach(eachMenu => {
        console.log(eachMenu)
        const newsContainer = document.getElementById("displayNewsContainer")
        const newsDiv = document.createElement('div')
        newsDiv.classList.add('col')
        newsDiv.innerHTML = `
        <div class="card mb-5">
        <img src="${eachMenu.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${eachMenu.title}</h5>
        <p class="card-text">${eachMenu.details.slice(0, 200)}.</p>
        </div>
        <div>
        <img class="author-image" src="${eachMenu.author.img}" class="card-img-top" alt="...">
        <p class="card-text">${eachMenu.author.name}.</p>
        </div>
        <p>Total View: ${eachMenu.total_view}</p>
        <button class="btn btn-primary w-25 d-block mx-auto mb-5">Show Details</button>
        `
        
        newsContainer.appendChild(newsDiv)
       
        
    })

    loadSpinner(false)

   
    
}

const loadSpinner = (isLoading) => {
    const spinner = document.getElementById('loadSpinner')
    if (isLoading) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}





loadCatagory()