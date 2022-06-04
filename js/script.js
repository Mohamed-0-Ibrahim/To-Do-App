(function Application() {
  // Collect all the variables used in the application
  let $input = document.querySelector(".form input");
  let $addTask = document.querySelector(".form .add");

  let $search = document.querySelector(".app-filter .search");
  let $filterAll = document.querySelector(".btn-all");
  let $filterPending = document.querySelector(".btn-pending");
  let $filterdone = document.querySelector(".btn-done");

  let $appTask = document.querySelector(".app-tasks");

  let $doneAllTasks = document.querySelector(".all-done");
  let $deleteDone = document.querySelector(".delete-done");
  let $deleteAll = document.querySelector(".delete-all");

  let $Data = [];

  // Check data in Local Storage
  if (localStorage.getItem("item")) {
    $Data = JSON.parse(localStorage.getItem("item"));
  }

  // Check the entry to add the task
  $addTask.addEventListener("click", function () {
    // If a value is entered
    if ($input.value !== "") {
      // Activate the task add function
      taskApp($input.value);
      // Clear the field value again
      $input.value = "";
    }
  });

  // Function Task
  function taskApp(valueAdded) {
    const theTask = {
      id: Date.now(),
      content: valueAdded,
      status: false,
    };
    // Push Task To $Data Array
    $Data.push(theTask);
    // Function Task Buld HTML
    taskBuld($Data);
  }

  // Function Task Buld HTML Syntax;
  function taskBuld($Data) {
    $appTask.innerHTML = "";

    // Buld App HTML
    $Data.forEach((item) => {
      let task = document.createElement("div");
      task.className = "task";
      task.id = item.id;

      let taskText = document.createElement("div");
      let taskText_P = document.createElement("p");
      taskText.className = "task-text";
      taskText_P.textContent = `${item.content}`;
      taskText.appendChild(taskText_P);

      task.appendChild(taskText);

      let taskButtons = document.createElement("div");
      let taskButtons_done = document.createElement("div");
      let taskButtons_delete = document.createElement("div");
      taskButtons.className = "task-buttons";
      taskButtons_done.className = "done";
      taskButtons_delete.className = "delete";

      // Add Calss Checked And Done To Task
      if (item.status === true) {
        taskButtons_done.classList.add("checked");
        taskText_P.classList.add("done");
      }

      taskButtons_delete.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      taskButtons.appendChild(taskButtons_done);
      taskButtons.appendChild(taskButtons_delete);

      task.appendChild(taskButtons);

      $appTask.appendChild(task);
    });
    // Send Data To Locale Storage
    setDataToLocalStorage($Data);
    doneBtn();
    deleteBtn();
  }

  // Send Data To Locale Storage
  function setDataToLocalStorage($Data) {
    window.localStorage.setItem("item", JSON.stringify($Data));
  }

  // Get Data From Locale Storage
  function getDataFromStorage() {
    let data = JSON.parse(localStorage.getItem("item"));
    if (data) {
      taskBuld(data);
    }
  }
  getDataFromStorage();

  // Function Add Class Done chick Button True Or False
  function doneBtn() {
    let doneButtons = document.querySelectorAll(".done");
    let taskId;
    doneButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        taskId = Number(btn.parentElement.parentElement.getAttribute("id"));
        $Data.forEach((task) => {
          if (task.id === taskId) {
            task.status = true;
          }
        });
        setDataToLocalStorage($Data);
        taskBuld($Data);
      });
    });
  }

  // Function Add Calss Delete Remove Task Select
  function deleteBtn() {
    let deleteButtons = document.querySelectorAll(".delete");
    let taskId;

    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        taskId = Number(btn.parentElement.parentElement.getAttribute("id"));
        btn.parentElement.parentElement.remove();
        $Data = $Data.filter((task) => {
          return task.id !== taskId;
        });
        setDataToLocalStorage($Data);
      });
    });
  }

  // Search for a task within the task list
  $search.addEventListener("keyup", function () {
    let list_p = Array.from(document.querySelectorAll(".task-text p"));

    list_p.forEach((p) => {
      if ($search.value === "") {
        p.parentElement.parentElement.style.display = "flex";
      } else if ($search.value[0] === p.textContent.charAt(0).toLowerCase()) {
        p.parentElement.parentElement.style.display = "flex";
      } else if ($search.value[0] === p.textContent.charAt(0).toUpperCase()) {
        p.parentElement.parentElement.style.display = "flex";
      } else {
        p.parentElement.parentElement.style.display = "none";
      }
    });
  });

  // Find the Pending task
  $filterPending.addEventListener("click", function () {
    let taskBox = document.querySelectorAll(".task-text p");

    $Data.filter((ele) => {
      if (ele.status == false) {
        taskBox.forEach((box) => {
          if (box.classList.contains("done")) {
            box.parentElement.parentElement.style.display = "none";
          } else {
            box.parentElement.parentElement.style.display = "flex";
          }
        });
      }
    });
  });

  // Find the finished task
  $filterdone.addEventListener("click", function () {
    let taskBox = document.querySelectorAll(".task-text p");

    $Data.filter((ele) => {
      if (ele.status == true) {
        taskBox.forEach((box) => {
          if (box.classList.contains("done")) {
            box.parentElement.parentElement.style.display = "flex";
          } else {
            box.parentElement.parentElement.style.display = "none";
          }
        });
      }
    });
  });

  let taskBox = document.querySelectorAll(".task");

  // Show All Task From Filter
  $filterAll.addEventListener("click", function () {
    taskBox.forEach((task) => {
      task.style.display = "flex";
    });
  });

  let donebox = document.querySelectorAll(".done");

  // Function Done All Tasks
  $doneAllTasks.addEventListener("click", function () {
    donebox.forEach((box) => {
      box.classList.add("checked");
    });
    $Data.forEach((data) => {
      data.status = true;
    });
    taskBuld($Data);
  });

  // Delete All Task With Done Class
  $deleteDone.addEventListener("click", function () {
    $Data = $Data.filter((data) => {
      if (data.status === false) {
        return data;
      }
    });
    taskBuld($Data);
  });

  // Delete All
  $deleteAll.addEventListener("click", function () {
    $Data = [];
    localStorage.clear();
    taskBuld($Data);
  });
})();


/*
    Created By Mohamed Ibrahim 6/4/2022
*/