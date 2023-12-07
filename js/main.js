



document.querySelector(".reg .replace__form").addEventListener('click', () => {
  document.querySelector(".reg").style.display = "none";
  document.querySelector(".sing").style.display = "flex";
})
document.querySelector(".sing .replace__form").addEventListener('click', () => {
  document.querySelector(".sing").style.display = "none";
  document.querySelector(".reg").style.display = "flex";
})
const user = document.querySelector('.user__btn');
user.addEventListener('click', () => {
  document.querySelector('.user__form').classList.toggle('active');
  document.querySelector('.header').classList.toggle('vis');
})
document.querySelector('.user__form-overlay').addEventListener('click', () => {
  document.querySelector('.user__form').classList.remove('active');
  document.querySelector('.header').classList.remove('vis')
})