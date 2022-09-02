const loadCatagory = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayMenuBar(data.data))
        .catch(error => console.log(error));
}

const displayMenuBar = (data) => {
    
    const menuContainer = document.getElementById("menu-Container")
    data.news_category.forEach(menu => {
        console.log(menu)
        const ulList = document.createElement('ul')
        ulList.classList.add('nav')
        ulList.innerHTML = `
            <li onclick="loadNewsDisplay()" class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">${menu.category_name}</a>
            </li>
        `
        menuContainer.appendChild(ulList)
    })

}

const loadNewsDisplay = (category_id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data => console.log(data));
}




loadCatagory()