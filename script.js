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

//Functions Add Task
const input = document.querySelector('#task');
const add = document.querySelector('.add-icon');
const todoList = document.querySelector('.todo ul');

add.addEventListener('click', e => {
  if (input.value != '') {
    const li = document.createElement('li');
    li.innerHTML = input.value;
    todoList.appendChild(li);

    const removeIcon = document.createElement('img');
    removeIcon.classList.add('remove');
    removeIcon.src = 'imgs/Minus.svg';
    li.appendChild(removeIcon);

    const arrow = document.createElement('img');
    arrow.classList.add('arrowTodo');
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

  //To do -> Doing
  const move = document.querySelectorAll('.arrowTodo');
  const doingList = document.querySelector('.doing ul');

  for (let i = 0; i < move.length; i++) {
    move[i].addEventListener('click', () => {
      task = move[i].parentElement;
      doingList.appendChild(task);

      const arrowDoing = document.querySelector('.doing .arrowTodo');
      arrowDoing.classList.add('arrowDoing');
      arrowDoing.classList.remove('arrowTodo');

      //Doing -> Done
      const moveDone = document.querySelectorAll('.arrowDoing');
      const doneList = document.querySelector('.done ul');

      for (let i = 0; i < moveDone.length; i++) {
        moveDone[i].addEventListener('click', () => {
          taskDoing = moveDone[i].parentElement;
          doneList.appendChild(taskDoing);
        });
      }
    });
  }
});
