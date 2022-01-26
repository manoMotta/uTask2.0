//Menu Toggle
const nav = document.querySelector('#header nav');
const eng = document.querySelector('nav .config');
const over = document.querySelector('.overlay');

eng.addEventListener('click', function () {
  nav.classList.add('show');
  console.log(tasksTodo);
  console.log(tasksDoing);
  console.log(tasksDone);
});

over.addEventListener('click', function () {
  nav.classList.remove('show');
});

//Dark Mode
const switcher = document.querySelector('.check');
const body = document.querySelector('body');
const addIcon = document.querySelector('.add-icon img');
const add = document.querySelector('.add-icon');
add.style.marginTop = '2px';

switcher.addEventListener('click', function () {
  body.classList.toggle('dark');

  if (document.body.classList == 'dark') {
    addIcon.src = 'imgs/dark-mode/Add-blue.svg';
    add.style.marginTop = '0';
    setCookie('mode', 'dark', 30);
  } else {
    addIcon.src = 'imgs/Add-black.svg';
    add.style.marginTop = '2px';
    setCookie('mode', 'normal', 30);
  }
});

//Change Background
const backgroundUrl = document.getElementById('url-background');
const submit = document.querySelector('btn-primary');

function change() {
  const background = document.getElementById('url-background').value;
  if (background != '') {
    document.body.style.background = 'url(' + background + ')';
    document.body.style.backgroundSize = '100%';
    setCookie('background', background, 30);
  }
}

backgroundUrl.addEventListener('keypress', event => {
  if (event.key == 'Enter') {
    event.preventDefault();
    change();
  }
});

//Reset Background
function reset() {
  document.body.style.background = '';
  backgroundUrl.value = '';
  setCookie('background', '', 30);
}

//Add Task
const input = document.getElementById('task');
const todoList = document.querySelector('.todo ul');

add.addEventListener('click', () => {
  if (input.value != '') {
    addTask(input.value, todoList);
  }

  //Remove Task
  const remove = document.querySelectorAll('.remove');

  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', () => {
      remove[i].parentElement.style.opacity = 0;
      setTimeout(() => {
        remove[i].parentElement.style.display = 'none';
        remove[i].parentElement.remove();
        add.click();
      }, 500);
    });
  }

  //To do -> Doing
  const move = document.querySelectorAll('.arrowTodo');
  const doingList = document.querySelector('.doing ul');

  for (let i = 0; i < move.length; i++) {
    move[i].addEventListener('click', () => {
      task = move[i].parentElement;
      move[i].src = 'imgs/Check.svg';

      move[i].parentElement.style.opacity = 0;
      setTimeout(() => {
        move[i].parentElement.style.opacity = 1;
      }, 200);
      doingList.appendChild(task);

      const arrowTodo = document.querySelector('.doing .arrowTodo');
      arrowTodo.classList.add('arrowDoing');
      arrowTodo.classList.remove('arrowTodo');
      add.click();

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
          add.click();

          //Done -> To do
          const moveTodo = document.querySelectorAll('.arrowDone');

          for (let i = 0; i < moveTodo.length; i++) {
            moveTodo[i].addEventListener('click', () => {
              taskDone = moveTodo[i].parentElement;
              todoList.appendChild(taskDone);
              moveTodo[i].src = 'imgs/Arrow.svg';

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

  //Tasks Cookies
  var listTodo = document.querySelector('.listTodo').getElementsByTagName('li'),
    listDoing = document.querySelector('.listDoing').getElementsByTagName('li'),
    listDone = document.querySelector('.listDone').getElementsByTagName('li');

  tasksTodo = string(map(listTodo, getText));
  tasksDoing = string(map(listDoing, getText));
  tasksDone = string(map(listDone, getText));

  setCookie('tasksTodo', tasksTodo, 30);
  setCookie('tasksDoing', tasksDoing, 30);
  setCookie('tasksDone', tasksDone, 30);
});

//Add with Enter key
input.addEventListener('keypress', event => {
  if (event.key == 'Enter') {
    event.preventDefault();
    add.click();
  }
});

function string(array) {
  return JSON.stringify(array);
}

//Add Task Function
function addTask(taskName, list) {
  const li = document.createElement('li');
  li.innerHTML = taskName;
  li.style.opacity = 0;
  setTimeout(() => {
    li.style.opacity = 1;
  }, 200);
  list.appendChild(li);

  const removeIcon = document.createElement('img');
  removeIcon.classList.add('remove');
  removeIcon.src = 'imgs/Minus.svg';
  li.appendChild(removeIcon);

  const arrow = document.createElement('img');

  if (list.classList.contains('listTodo')) {
    arrow.classList.add('arrowTodo');
    arrow.src = 'imgs/Arrow.svg';
  }

  if (list.classList.contains('listDoing')) {
    arrow.classList.add('arrowDoing');
    arrow.src = 'imgs/Check.svg';
  }

  if (list.classList.contains('listDone')) {
    arrow.classList.add('arrowDone');
    arrow.src = 'imgs/Return.svg';
  }

  li.appendChild(arrow);

  input.value = '';
}

//Set Cookies
function setCookie(cname, cValue, days) {
  if (concent) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cValue + ';' + expires + ';path=/';
  }
}

//Get Cookies
function getCookie(cname) {
  if (concent) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}

//Check Cookies
function checkCookie() {
  if (concent) {
    //Check Mode
    let mode = getCookie('mode');
    if (mode == 'dark') {
      body.classList.add('dark');
      check.checked = true;
      addIcon.src = 'imgs/dark-mode/Add-blue.svg';
      add.style.marginTop = '0';
    } else {
      body.classList.remove('dark');
      check.checked = false;
      addIcon.src = 'imgs/Add-black.svg';
      add.style.marginTop = '2px';
    }

    //Check Background Image
    let backImage = getCookie('background');
    if (backImage != '') {
      document.body.style.background = 'url(' + backImage + ')';
      document.body.style.backgroundSize = '100%';
      document.getElementById('url-background').value = backImage;
    }

    //Check Tasks
    let getTodo = JSON.parse(getCookie('tasksTodo'));
    let getDoing = JSON.parse(getCookie('tasksDoing'));
    let getDone = JSON.parse(getCookie('tasksDone'));

    if (getTodo != '') {
      for (let i = 0; i < getTodo.length; i++) {
        input.value = getTodo[i];
        add.click();
      }
    }

    if (getDoing != '') {
      for (let i = 0; i < getDoing.length; i++) {
        addTask(getDoing[i], document.querySelector('.doing ul'));
        add.click();
      }
    }

    if (getDone != '') {
      for (let i = 0; i < getDone.length; i++) {
        addTask(getDone[i], document.querySelector('.done ul'));
        add.click();
      }
    }
    resetAdd();
  }
}

//Reset Function
function resetAdd() {
  const li = document.createElement('li');
  document.querySelector('.todo ul').appendChild(li);

  const div = document.createElement('div');
  div.classList.add('arrowTodo');
  div.classList.add('arrowDoing');
  div.classList.add('arrowDone');
  div.classList.add('reset');

  li.appendChild(div);
  add.click();
  const reset = document.querySelector('.reset');
  reset.click();
  reset.click();
  reset.parentElement.remove();
  add.click();
}

//List to String Functions
function map(arrayLike, fn) {
  var ret = [],
    i = -1,
    len = arrayLike.length;
  while (++i < len) ret[i] = fn(arrayLike[i]);
  return ret;
}

function getText(node) {
  if (node.nodeType === 3) return node.data;
  var txt = '';
  if ((node = node.firstChild))
    do {
      txt += getText(node);
    } while ((node = node.nextSibling));
  return txt;
}

//Cookies Consent
cookieMessage = () => {
  if (!getCookie('cookie')) {
    cookiesPopup.style.display = 'block';
  }
};

window.addEventListener('load', cookieMessage);

//Cookies Pop-up
const agreeBtn = document.getElementById('agree');
const dAgreeBtn = document.getElementById('d-agree');
const closeBtn = document.getElementById('x');
const cookiesPopup = document.querySelector('#cookies');

agreeBtn.addEventListener('click', () => {
  cookiesPopup.style.display = 'none';
  const d = new Date();
  d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = 'cookie' + '=' + true + ';' + expires + ';path=/';

  concent = getConcent('cookie');
});

dAgreeBtn.addEventListener('click', () => {
  cookiesPopup.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  cookiesPopup.style.display = 'none';
});

function getConcent(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

var concent = getConcent('cookie');
