

const search = document.querySelector('.map__search-top');
const searchMap = document.querySelector('.map__search')
search.addEventListener('click', () => {
  searchMap.classList.toggle('active')
})

const searchItems = document.querySelectorAll('.map__search-drop-item');


searchItems.forEach(el => {
  el.addEventListener('click', () => {
    search.querySelector('span').innerHTML = el.querySelector("span").innerHTML;
    search.querySelector('img').src = el.querySelector("img").src;
    search.querySelector('img').style.display = "block";
    search.classList.add('checked')
    searchMap.classList.remove('active')
  })
})


