//Menu Toggle
const nav = document.querySelector('#header nav');
const eng = document.querySelector('nav .config');
const over = document.querySelector('.overlay');

eng.addEventListener('click', function () {
  nav.classList.add('show');
});

over.addEventListener('click', function () {
  nav.classList.remove('show');
});

//Add Task
const tasks = document.querySelector('.tasks');
const input = document.querySelector('#task');
const add = document.querySelector('.add-icon');
const list = document.querySelector('.todo ul');

add.addEventListener('click', e => {
  if (input.value != '') {
    const li = document.createElement('li');
    li.innerHTML = input.value;
    list.appendChild(li);

    const removeIcon = document.createElement('img');
    removeIcon.classList.add('remove');
    removeIcon.src = 'imgs/Minus.svg';
    li.appendChild(removeIcon);

    const arrow = document.createElement('img');
    arrow.classList.add('arrow');
    arrow.src = 'imgs/Arrow Right.svg';
    li.appendChild(arrow);
  }

  //Remove Task
  const remove = document.querySelectorAll('.remove');

  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', () => {
      remove[i].parentElement.style.opacity = 0;
      setTimeout(() => {
        remove[i].parentElement.style.display = 'none';
        remove[i].parentElement.remove();
      }, 500);
    });
  }
  input.value = '';
});
