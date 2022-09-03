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


// News Details Card Code


const displayNewsByCatagory = (menu) => {
    

     const counter = document.getElementById("counter")
        counter.innerText = menu.data.length
        let newsContainer = document.getElementById("displayNewsContainer")
        newsContainer.innerHTML = ""
        menu.data.forEach(eachMenu => {
        const newsDiv = document.createElement('div')
        console.log(eachMenu._id)
        
        
        newsDiv.classList.add('col')
        newsDiv.innerHTML = `
        <div class="card mb-5">
        <img src="${eachMenu.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${eachMenu.title}</h5>
        <p class="card-text">${eachMenu.details.slice(0, 200)}...</p>
        </div>
        <div>
        <img class="author-image" src="${eachMenu.author.img}" class="card-img-top" alt="...">
        <p class="card-text">${eachMenu.author? eachMenu.author.name : "No Author Information Found"}.</p>
        </div>
        <p>Total View: ${eachMenu ? eachMenu.total_view : "No Information Found"}</p>
        <button onclick="loadModalDetails('${eachMenu._id}')" class="btn btn-primary w-25 d-block mx-auto mb-5" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show Details</button>
        `
        
       
        // newsContainer = ""
        newsContainer.appendChild(newsDiv)
       
    })
    

    loadSpinner(false)
}


// Spinner Section Code

const loadSpinner = (isLoading) => {
    const spinner = document.getElementById('loadSpinner')
    if (isLoading) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}

// Modal Section Code

const loadModalDetails = (news_id) => {
    console.log("This is News Id", news_id)
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => loadModal(data.data[0]))
        .catch(error => console.log(error));
}

const loadModal = (data) => {
    const modalTitle = document.getElementById("modal-title")
    modalTitle.innerText = `${data.title}`
    const modalBody = document.getElementById("modalBody")
    modalBody.innerHTML = `
        <img src="${data.thumbnail_url}" class="card-img-top" alt="...">
    
    `
}



loadCatagory()