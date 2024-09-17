document.getElementById('search').addEventListener('submit', async (e) => {
    e.preventDefault()

    const searchValue = document.getElementById('search-input').value
    document.querySelector('.loading').style.display = 'block'
    document.querySelector('.search-result').innerHTML = ''
    document.querySelector('.container').classList.add('blurContainer')

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=ce1b4faa&s=${searchValue}`)
        const data = await response.json()

        if (response.ok && data.Search) {
            displayFilm(data)
            hideSearch()
            hideContainer()

            document.querySelector('.search-result').style.display = 'block'
            document.querySelector('.result').style.display = 'flex'
            document.querySelector('.result').classList.add('displayResult')
            document.getElementById('search-input').value = ''
        } else {
            displayMessage(data.Error, false)
            displayContainer()

            document.getElementById('search-input').value = ''
            document.querySelector('.result').classList.remove('displayResult')
        }
        
    } catch (err) {
        console.log(err)
    } finally {
        document.querySelector('.loading').style.display = 'none'
        document.querySelector('.container').classList.remove('blurContainer')
    }
})

function hideSearch() {
    document.querySelector('.result button').addEventListener('click', () => {
        document.querySelector('.search-result').style.display = 'none'
        document.querySelector('.result').style.display = 'none'
        displayContainer()
    })
}

function hideContainer() {
    document.querySelector('.container-film1').style.display = 'none'
    document.querySelector('.container-film2').style.display = 'none'
    document.querySelector('.container-film3').style.display = 'none'
    const headers = document.querySelectorAll('.container span:not(.footer span, .result span)')
    headers.forEach(header => {
        header.style.display = 'none'
    })
}

function displayContainer() {
    document.querySelector('.container-film1').style.display = 'flex'
    document.querySelector('.container-film2').style.display = 'flex'
    document.querySelector('.container-film3').style.display = 'flex'
    const headers = document.querySelectorAll('.container span:not(.footer span, .result span)')
    headers.forEach(header => {
        header.style.display = 'block'
    })
}

function displayMessage(message, succes = true) {
    const alert = document.querySelector('.alert')
    const alertContainer = document.querySelector('.alert-container')

    alert.textContent = message
    alert.style.color = succes ? 'green':'red'
    alertContainer.style.display = 'block'
    
    setTimeout(() => {
        alertContainer.style.display = 'none'
    }, 1500)   
}

function displayFilm(data) {
    let container = document.querySelector('.search-result')
    container.innerHTML = ''

    data.Search.map(film => {
        container.innerHTML += `
        <div class="item-film2">
            <img src="${film.Poster}" alt="${film.Title}">
        </div>`
    })
}

async function getFilm(page, type) {
    document.querySelector('.loading').style.display = 'block'
    document.querySelector('.container').classList.add('blurContainer')

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=ce1b4faa&s=${type}&page=${page}`)
        const data = await response.json()

        if (response.ok && data.Search) {
            return data
        } else {
            displayMessage(data.Error, false)
        }

    } catch (err) {
        console.log(err)
    } finally {
        document.querySelector('.loading').style.display = 'none'
        document.querySelector('.container').classList.remove('blurContainer')
    }
}

getFilm(1, 'movie').then(data => {
    let container1 = document.querySelector('.container-film1')

    data.Search.map(film => {
        container1.innerHTML += `
        <div class="item-film1">
            <img src="${film.Poster}" alt="${film.Title}">
        </div>`
    })
})

getFilm(1, 'series').then(data => {
    let container2 = document.querySelector('.container-film2')

    data.Search.map(film => {
        container2.innerHTML += `
        <div class="item-film1">
            <img src="${film.Poster}" alt="${film.Title}">
        </div>`
    })
})

getFilm(1, 'episode').then(data => {
    let container3 = document.querySelector('.container-film3')

    data.Search.map(film => {
        container3.innerHTML += `
        <div class="item-film1">
            <img src="${film.Poster}" alt="${film.Title}">
        </div>`
    })
})

document.querySelector('.btn-dropdown').addEventListener('click', () => {
    document.querySelector('.dropdown').classList.toggle('displayDropdown')
})
