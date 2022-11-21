/*
유저가 값을 입력하고 + 버튼 누르면 할일 추가 
삭제 버튼 누르면 할일 삭제 
체크버튼 누르면 완료 처리되면서 밑줄 생기게 
진행중, 완료 탭을 누르면 언더바가 이동해서 강조 되게끔 
완료탭은 완료된것만, 진행중은 진행중인 것만 보이게
전체탭을 누르면 모두 보이게

isDone이 false 면 그대로 냅두고 true면 밑줄 생기게
*/

let taskInput = document.getElementById("task_input"); //id가  task_input인 input태그 갖고오기 (input__area 내부에 있음)
let addButton = document.getElementById("btn_add"); // 추가버튼 갖고오기

let taskList = []; // 빈 배열... 유저의 입력값이 들어갈 예정

addButton.addEventListener("click", addTask); // 클릭이벤트 발생시 addTask 함수 실행
addButton.addEventListener("click", render); // 클릭이벤트 발생시 render 함수 실행

function addTask() {
  // 클릭 이벤트시 유저가 입력한 값을 빈 배열에 넣어주는 함수
  let task = {
    // 유저가 입력한 값을 task (객체)에 넣기
    id: randomId(), // 랜덤 id값을 생성하는 함수가 실행 되면서 랜덤한 id값이 들어감
    taskContent: taskInput.value,
    isDone: false, // isDone은 리스트의 값의 미완, 완료 구분 해줌
  };
  taskList.push(task); // .push를 통하여 빈 배열에 값 넣어주기
  console.log(taskList);
}

function render() {
  // taskList를 보여주는 함수
  let resultHtml = "";
  for (let i = 0; i < taskList.length; i++) {
    // 배열 안에 있는 아이템을 꺼내기

    if (taskList[i].isDone == true) {
      // isDone이 true가 되면 task_done 이라는 class가 부여되고, css가 적용되며 밑줄이 그어짐
      resultHtml += `<div class="task">
        <div class="task_done">${taskList[i].taskContent}</div> 
        <div>
            <button onclick="toggleCheck('${taskList[i].id}')">확인</button>
            <button onclick="deleteTask()">삭제</button>
        </div>
    </div>`;
    } else {
      resultHtml += `
    <div class="task">
    <div>${taskList[i].taskContent}</div> 
    <div class="Btn__container">
        <button onclick="toggleCheck('${taskList[i].id}')">확인</button>
        <button onclick="deleteTask()">삭제</button>
    </div>
</div>`;
    }
  }

  document.getElementById("task_board").innerHTML = resultHtml; // task_board에 resultHtml 입히기
}

function toggleCheck(id) {
  /* 확인 버튼 누르면 동작하는 함수 
  "toggleCheck('${taskList[i].id}')" 부분을 통해 id 값을 받아옴. 
*/
  for (let i = 0; i < taskList.length; i++) {
    // 확인 버튼을 누르면 id를 통해 id가 있는 객체의 idDone 값을 true로 변경
    if (taskList[i].id == id) {
      taskList[i].isDone = !taskList[i].isDone;
      /* false 일 경우 true를 넣어주고, true 일 경우 false를 넣어줌 ( 스위치 같은 느낌 ) */
      break;
    }
  }
  render();
  console.log(taskList);
}

function randomId() {
  // random id값 생성하는 함수
  return "_" + Math.random().toString(36).substring(2, 9);
}

function deleteTask() {
  resultHtml = "";
}

// abcd
