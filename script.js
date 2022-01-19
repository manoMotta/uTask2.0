const nav = document.querySelector('#header nav');
const btn = document.querySelector('nav .config');
const over = document.querySelector('.overlay');

btn.addEventListener('click', function () {
  nav.classList.add('show');
});

over.addEventListener('click', function () {
  nav.classList.remove('show');
});
