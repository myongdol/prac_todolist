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
let underLine = document.getElementById("under__line") // 밑줄 긋기 위해 가져오기 
let taskList = []; // 빈 배열... 유저의 입력값이 들어갈 예정

let tabs = document.querySelectorAll(".task__tabs div") // tabs 에 있는 모든 div태그 가져오기 
let mode = 'all';
let filterList = [];  // 진행중 목록 관리할 빈 배열 


for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event){
    filter(event)
  });
} // 탭들의 클릭 이벤트 

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
  render();
}

function render() {
  let list = [];
  if(mode == "all"){ // 어느탭 보여줄지 
    list = taskList;
  } else if(mode == 'ing' || mode == "finished") {
    list = filterList
  }
  // taskList를 보여주는 함수
  let resultHtml = "";
  for (let i = 0; i < list.length; i++) {
    // 배열 안에 있는 아이템을 꺼내기

    if (list[i].isDone == true) {
      // isDone이 true가 되면 task_done 이라는 class가 부여되고, css가 적용되며 밑줄이 그어짐
      resultHtml += `<div class="task">
        <div class="task_done">${list[i].taskContent}</div> 
        <div>
            <button onclick="toggleCheck('${list[i].id}')"><i class="fa-solid fa-check"></i>확인</button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-sharp fa-solid fa-trash"></i>삭제</button>
        </div>
    </div>`;
    } else {
      resultHtml += `
    <div class="task">
    <div>${list[i].taskContent}</div> 
    <div class="Btn__container">
        <button onclick="toggleCheck('${list[i].id}')"><i class="fa-solid fa-check"></i>확인</button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa-sharp fa-solid fa-trash"></i>삭제</button>
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

function deleteTask(id) {
   for(let i = 0; i < taskList.length; i++) {
    if(taskList[i].id == id) { // taskList에서 i번째 id가 내가 클릭한 것의 id와 값이 같다면 삭제 
      taskList.splice(i, 1)
      break;
    }
   }
   render()
   // 위에서 값을 업데이트 하였기 때문에 UI도 업데이트 해야함
}

function filter(e) { // 탭 클릭 이벤트 함수 
  // mode = event.target.id; // 어떤 탭을 클릭 했는지 저장 해줌.
  // filterList = [];  // 진행중 목록 관리할 빈 배열 

  if(e) { // 메뉴에서 유저가 고른 탭으로 밑줄 옮기기 
    mode = event.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }
  filterList = [];
  if(mode == "all") { // 모두 보기는 그냥 렌더링해서 보여주면 끝
    render()
  } else if(mode == "ing") { // 진행중 이라면 
    for(let i = 0; i < taskList.length; i++) {
      if(taskList[i].isDone == false) { // false인 아이템들을 필터리스트에 넣기 
        filterList.push(taskList[i])
      }
    } 
    render();
  } else if(mode == "finished") { // 완료 탭 관리
    for (let i = 0; i < taskList.length; i++) {
      if(taskList[i].isDone == true) {
        filterList.push(taskList[i]);
      }
    }
    render()
  } 
  console.log(filterList) //확인용 
}

