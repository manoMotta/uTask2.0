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
const input = document.querySelector('#task');
const add = document.querySelector('.add-icon');
const todoList = document.querySelector('.todo ul');

add.addEventListener('click', () => {
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

    input.value = '';
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

  //To do -> Doing
  const move = document.querySelectorAll('.arrowTodo');
  const doingList = document.querySelector('.doing ul');

  for (let i = 0; i < move.length; i++) {
    move[i].addEventListener('click', () => {
      task = move[i].parentElement;
      move[i].parentElement.style.opacity = 0;
      setTimeout(() => {
        move[i].parentElement.style.opacity = 1;
      }, 200);
      doingList.appendChild(task);

      const arrowTodo = document.querySelector('.doing .arrowTodo');
      arrowTodo.classList.add('arrowDoing');
      arrowTodo.classList.remove('arrowTodo');

      //Doing -> Done
      const moveDone = document.querySelectorAll('.arrowDoing');
      const doneList = document.querySelector('.done ul');

      for (let i = 0; i < moveDone.length; i++) {
        moveDone[i].addEventListener('click', () => {
          taskDoing = moveDone[i].parentElement;
          moveDone[i].src = 'imgs/Return.svg';
          doneList.appendChild(taskDoing);

          const arrowDoing = document.querySelector('.done .arrowDoing');
          arrowDoing.classList.add('arrowDone');
          arrowDoing.classList.remove('arrowDoing');

          //Done -> To do
          const moveTodo = document.querySelectorAll('.arrowDone');

          for (let i = 0; i < moveTodo.length; i++) {
            moveTodo[i].addEventListener('click', () => {
              taskDone = moveTodo[i].parentElement;
              todoList.appendChild(taskDone);
              moveTodo[i].src = 'imgs/Arrow Right.svg';

              const arrowDone = document.querySelector('.todo .arrowDone');
              arrowDone.classList.add('arrowTodo');
              arrowDone.classList.remove('arrowDone');

              add.click();
            });
          }
        });
      }
    });
  }
});
