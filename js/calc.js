const city = document.querySelector('.city');
const cityDrop = document.querySelector('.country__dropdown');

//Выпадающее меню с городами в заголовке
city.addEventListener('click', () => {
  cityDrop.classList.add('active');
})


const allCountry = document.querySelectorAll('.country__dropdown-item');


allCountry.forEach(el => {
  el.addEventListener('click', () => {

    city.innerHTML = "в " + el.querySelector('span').innerHTML;
    document.querySelector('.country > img').src = el.querySelector('img').src;
    cityDrop.classList.remove('active');

  })
})

const calcLeft = document.querySelector('.calc-body-left');
const calcRight = document.querySelector('.calc-body-right');

const leftItems = document.querySelectorAll('.calc-body-left .calc-widget-drop-item');
const rightItems = document.querySelectorAll('.calc-body-right .calc-widget-drop-item');


function Wrap(item) {
  item.querySelector('.calc-widget-top').addEventListener('click', () => {
    item.querySelector('.calc-widget-drop-wrap').classList.toggle('active');
    item.querySelector('.calc-widget-top').classList.toggle('active');

  })
}
Wrap(calcLeft)
Wrap(calcRight)

leftItems.forEach(el => {
  el.addEventListener('click', () => {
    calcLeft.querySelector('span').innerHTML = el.querySelector('span').innerHTML;
    calcLeft.querySelector('img').src = el.querySelector('img').src;
    document.querySelector('.calc-body-left .calc-widget-drop-wrap').classList.remove('active');
  })
})
rightItems.forEach(el => {
  el.addEventListener('click', () => {
    calcRight.querySelector('span').innerHTML = el.querySelector('span').innerHTML;
    calcRight.querySelector('img').src = el.querySelector('img').src;
    document.querySelector('.calc-body-right .calc-widget-drop-wrap').classList.remove('active');
  })
})

const replace = document.querySelector('.replace');

replace.addEventListener('click', () => {
  const lastImg = calcLeft.querySelector('img').src;
  const lastSpan = calcLeft.querySelector('span').innerHTML;
  calcLeft.querySelector('span').innerHTML = calcRight.querySelector('span').innerHTML;
  calcLeft.querySelector('img').src = calcRight.querySelector('img').src;
  calcRight.querySelector('span').innerHTML = lastSpan;
  calcRight.querySelector('img').src = lastImg;
})

if (window.screen.width < 1080) {
  const about = document.querySelector('.info-wrapper');
  document.querySelector('.info__title').addEventListener('click', () => {
    about.classList.toggle('active')
  })
}