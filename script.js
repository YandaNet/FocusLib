

let issuanceHistory = [];
let pages = document.querySelectorAll(".page");
let navLinks = document.querySelectorAll("#sidebar nav a");

function showPage(pageId) {
  for (let i = 0; i < pages.length; i++)
  {
    pages[i].classList.remove("active");
  }

  for (let i = 0; i < navLinks.length; i++) 
  {
    navLinks[i].classList.remove("active");
  }
  document.getElementById("page-" + pageId).classList.add("active");
  document.getElementById("nav-" + pageId).classList.add("active");
}
showPage("books");



document.getElementById("nav-books").addEventListener("click", function () {
  showPage("books");
});

document.getElementById("nav-visitors").addEventListener("click", function () {
  showPage("visitors");
});

document.getElementById("nav-issuance").addEventListener("click", function () {
  showPage("issuance");
});

document.getElementById("nav-stats").addEventListener("click", function () {
  showPage("stats");
});






//  МОДАЛКИ

function openModal(modalId) 
{
  document.getElementById(modalId).classList.add("open");
}
function closeModal(modalId)
{
  document.getElementById(modalId).classList.remove("open");
}





// КНОПКИ 

document.getElementById("btn-add-book").addEventListener("click", function () { openModal("book-modal"); });

document.getElementById("btn-add-visitor").addEventListener("click", function () { openModal("visitor-modal"); });

document.getElementById("btn-issue-book").addEventListener("click", function () { openModal("issue-modal"); });


//КНИГИ 

let bookForm = document.getElementById("book-form");
let booksTable = document.getElementById("books-tbody");

bookForm.addEventListener("submit", function (event) {

  event.preventDefault();

  let title = document.getElementById("b-title").value.trim();
  let author = document.getElementById("b-author").value.trim();
  let publisher = document.getElementById("b-publisher").value.trim();
  let year = document.getElementById("b-year").value.trim();
  let count = document.getElementById("b-count").value.trim();




  // ПОМИЛКИ 

  if (title === "" || author === "" || year === "" || count === "" || Number(count) <= 0) {
    alert("Заповніть всі поля правильно!");
    return;
  }





  // ДОДАВАННЯ КНИГИ 

  let row = document.createElement("tr");

  row.innerHTML = `
    <td>${title}</td>
    <td>${author}</td>
    <td>${publisher}</td>
    <td>${year}</td>
    <td>${count}</td>
    <td class="available">${count}</td>
    <td>
      <button class="btn btn-danger btn-sm delete-book">
        Видалити
      </button>
    </td>
  `;

  booksTable.appendChild(row);


  //SELECT 

  let option = document.createElement("option");

  option.value = title;
  option.textContent = title;

  document.getElementById("issue-book").appendChild(option);






  // СТАТИСТИКА 

  let totalBooks = document.querySelectorAll("#books-tbody tr").length;

  document.getElementById("stat-books-total").innerText = totalBooks;

  document.getElementById("stats-books").innerText = totalBooks;


  //  ОЧИЩЕННЯ 
  bookForm.reset();

  closeModal("book-modal");
});


//ВИДАЛЕННЯ КНИГ 

booksTable.addEventListener("click", function (event) {

  if (event.target.classList.contains("delete-book")) 
  {
    let row = event.target.closest("tr");

    let title = row.children[0].innerText;

    // перевірка чи книга видана
    let available = Number(
      row.querySelector(".available").innerText
    );

    let total = Number(row.children[4].innerText);

    if (available < total) {
      alert("Не можна видалити книгу поки її не повернуть!");
      return;
    }

    // видаляємо option із select
    let options = document.querySelectorAll("#issue-book option");

    for (let i = 0; i < options.length; i++) {

      if (options[i].value === title) {
        options[i].remove();
      }
    }

    // видаляємо рядок
    row.remove();

    // статистика
    let totalBooks = document.querySelectorAll("#books-tbody tr").length;

    document.getElementById("stat-books-total").innerText = totalBooks;

    document.getElementById("stats-books").innerText = totalBooks;
  }
});


// ВІДВІДУВАЧІ
let visitorForm = document.getElementById("visitor-form");
let visitorsTable = document.getElementById("visitors-tbody");

visitorForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let lastname = document.getElementById("v-lastname").value.trim();
  let firstname = document.getElementById("v-firstname").value.trim();
  let middlename = document.getElementById("v-middlename").value.trim();
  let phone = document.getElementById("v-phone").value.trim();
  let address = document.getElementById("v-address").value.trim();

  //  ПОМИЛКИ 

  if (lastname === "" || firstname === "" || phone === "") {
    alert("Заповніть обов'язкові поля!");
    return;
  }

  // ДОДАВАННЯ 

  let fullName = lastname + " " + firstname + " " + middlename;
    let row = document.createElement("tr");

  row.innerHTML = `
    <td>${lastname} ${firstname} ${middlename}</td>
    <td>${phone}</td>
    <td>${address}</td>
    <td class="hands">0</td>
    <td>
      <button class="btn btn-danger btn-sm delete-visitor">
        Видалити
      </button>
    </td>
  `;

  visitorsTable.appendChild(row);


  //  SELECT 

  let option = document.createElement("option");

  option.value = fullName;
  option.textContent = fullName;

  document.getElementById("issue-visitor").appendChild(option);


  // СТАТИСТИКА

  let totalVisitors = document.querySelectorAll("#visitors-tbody tr").length;

  document.getElementById("stat-visitors-total").innerText = totalVisitors;

  document.getElementById("stats-visitors").innerText = totalVisitors;


  visitorForm.reset();

  closeModal("visitor-modal");
});



// ВИДАЛЕННЯ ЧИТАЧІВ

visitorsTable.addEventListener("click", function (event) {

  if (event.target.classList.contains("delete-visitor")) {

    let row = event.target.closest("tr");

    // перевірка книг на руках
    let hands = Number(
      row.querySelector(".hands").innerText
    );

    if (hands > 0) {
      alert("Не можна видалити читача поки він не поверне книги!");
      return;
    }

    let fullname = row.children[0].innerText;

    // видаляємо option із select
    let options = document.querySelectorAll("#issue-visitor option");

    for (let i = 0; i < options.length; i++) {

      if (options[i].value === fullname) {
        options[i].remove();
      }
    }

    // видаляємо рядок
    row.remove();

    // статистика
    let totalVisitors = document.querySelectorAll("#visitors-tbody tr").length;

    document.getElementById("stat-visitors-total").innerText = totalVisitors;

    document.getElementById("stats-visitors").innerText = totalVisitors;
  }
});


//  ПОШУК КНИГ 

document.getElementById("book-search").addEventListener("input", function () {
    let value = this.value.toLowerCase();

    let rows = document.querySelectorAll("#books-tbody tr");

    for (let i = 0; i < rows.length; i++) 
      {
      let text = rows[i].innerText.toLowerCase();
      if (text.includes(value)) 
      {
        rows[i].style.display = "";
      }
      else
      {
        rows[i].style.display = "none";
      }
    }
  });


//  ПОШУК ЧИТАЧІВ 

document.getElementById("visitor-search").addEventListener("input", function () 
  {
    let value = this.value.toLowerCase();
    let rows = document.querySelectorAll("#visitors-tbody tr");

    for (let i = 0; i < rows.length; i++) {

      let text = rows[i].innerText.toLowerCase();

      if (text.includes(value)) {
        rows[i].style.display = "";
      }
      else {
        rows[i].style.display = "none";
      }
    }
  });


// СОРТУВАННЯ КНИГ 

document.getElementById("book-sort").addEventListener("change", sortBooks);
document.getElementById("book-sort-dir").addEventListener("change", sortBooks);

function sortBooks() 
{
  let sortBy = document.getElementById("book-sort").value;
  let dir = document.getElementById("book-sort-dir").value;
  let rows = Array.from(document.querySelectorAll("#books-tbody tr"));

  let index = 0;

  if (sortBy === "title") {
    index = 0;
  }

  if (sortBy === "author") {
    index = 1;
  }

  if (sortBy === "count") {
    index = 4;
  }

  rows.sort(function (a, b) {

    let aText = a.children[index].innerText;

    let bText = b.children[index].innerText;

    if (sortBy === "count") {

      aText = Number(aText);
      bText = Number(bText);

      if (dir === "asc") {
        return aText - bText;
      }
      else {
        return bText - aText;
      }
    }

    if (dir === "asc") {
      return aText.localeCompare(bText);
    }
    else {
      return bText.localeCompare(aText);
    }
  });

  for (let i = 0; i < rows.length; i++) {
    booksTable.appendChild(rows[i]);
  }
}




//  СОРТУВАННЯ ЧИТАЧІВ 

document.getElementById("visitor-sort").addEventListener("change", sortVisitors);

document.getElementById("visitor-sort-dir").addEventListener("change", sortVisitors);

function sortVisitors() {
  let dir = document.getElementById("visitor-sort-dir").value;

  let rows = Array.from(document.querySelectorAll("#visitors-tbody tr"));

  rows.sort(function (a, b) {

    let aText = a.children[0].innerText;
    let bText = b.children[0].innerText;

    if (dir === "asc") {
      return aText.localeCompare(bText);
    }
    else {
      return bText.localeCompare(aText);
    }
  });

  for (let i = 0; i < rows.length; i++) {
    visitorsTable.appendChild(rows[i]);
  }
}


// ВИДАЧА КНИГ

let issueForm = document.getElementById("issue-form");

let issueTable = document.getElementById("issuance-tbody-active");

issueForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let visitor = document.getElementById("issue-visitor").value;
  let book = document.getElementById("issue-book").value;
  let issueDate = document.getElementById("issue-date").value;
  let dueDate = document.getElementById("issue-due").value;




  // ПЕРЕВІРКА

  if (visitor === "" || book === "" || issueDate === "" || dueDate === "") {
    alert("Заповніть всі поля!");
    return;
  }
  let issue = new Date(issueDate);
  let due = new Date(dueDate);

  if (due < issue) {
    alert("Дата повернення не може бути раніше дати видачі!");
    return;
  }



  // ПЕРЕВІРКА КІЛЬКОСТІ

  let rows = document.querySelectorAll("#books-tbody tr");

  let available = 0;

  for (let i = 0; i < rows.length; i++) {

    let title = rows[i].children[0].innerText;

    if (title === book) {
      available = Number(rows[i].querySelector(".available").innerText);

      if (available > 0) {
        rows[i].querySelector(".available").innerText = available - 1;
      }
    }
  }

  if (available <= 0) {
    alert("Немає доступних книг!");
    return;
  }




  // КНИГ НА РУКАХ

  let visitorRows = document.querySelectorAll("#visitors-tbody tr");

  for (let i = 0; i < visitorRows.length; i++) {

    let name = visitorRows[i].children[0].innerText;

    if (name.includes(visitor)) {
      let hands = Number(visitorRows[i].querySelector(".hands").innerText);
      visitorRows[i].querySelector(".hands").innerText = hands + 1;
    }
  }


  // ДОДАВАННЯ В ТАБЛИЦЮ

  let status = isOverdue(dueDate) ? "Прострочена" : "Активна";

  let row = document.createElement("tr");

  row.innerHTML = `
  <td>${visitor}</td>
  <td>${book}</td>
  <td>${issueDate}</td>
  <td>${dueDate}</td>
  <td class="status">${status}</td>
  <td>
    <button class="return-book">Повернути</button>
  </td>
`;

  document.getElementById("issuance-tbody-active").appendChild(row);
  issuanceHistory.push({
    visitor: visitor,
    book: book
  });

  // СТАТИСТИКА

  let total = document.querySelectorAll("#issuance-tbody-active tr").length;

  document.getElementById("stats-issuances").innerText = total;
  updateOverdueStats();
  updateTopStats();


  issueForm.reset();

  closeModal("issue-modal");
});




// ПОВЕРНЕННЯ КНИГ

issueTable.addEventListener("click", function (event) {

  if (event.target.classList.contains("return-book")) {

    let row = event.target.closest("tr");

    let visitor = row.children[0].innerText;

    let book = row.children[1].innerText;

    // ПОВЕРТАЄМО КНИГУ
    let books = document.querySelectorAll("#books-tbody tr");

    for (let i = 0; i < books.length; i++) {

      let title = books[i].children[0].innerText;

      if (title === book) {

        let available = Number(
          books[i].querySelector(".available").innerText
        );

        books[i].querySelector(".available").innerText = available + 1;
      }
    }

    // МІНУС КНИГА У ЧИТАЧА
    let visitors = document.querySelectorAll("#visitors-tbody tr");

    for (let i = 0; i < visitors.length; i++) {

      let name = visitors[i].children[0].innerText;

      if (name.includes(visitor)) {

        let hands = Number(
          visitors[i].querySelector(".hands").innerText
        );

        visitors[i].querySelector(".hands").innerText = hands - 1;
      }
    }

    // ВИДАЛЯЄМО РЯДОК
    row.remove();

    // ОНОВЛЕННЯ СТАТИСТИКИ
    let total = document.querySelectorAll(
      "#issuance-tbody-active tr"
    ).length;

    document.getElementById("stats-issuances").innerText = total;

    updateOverdueStats();

    updateTopStats();
  }
});




function updateTopStats() {

  let topBooksList = document.getElementById("top-books-list");
  let topVisitorsList = document.getElementById("top-visitors-list");

  topBooksList.innerHTML = "";
  topVisitorsList.innerHTML = "";

  let books = [];
  let visitors = [];

  let rows = issuanceHistory;

  // ЗБІР ДАНИХ
  for (let i = 0; i < rows.length; i++) {

    let visitor = rows[i].visitor;
    let book = rows[i].book;

    // ===== КНИГИ =====
    let foundBook = false;

    for (let j = 0; j < books.length; j++) {
      if (books[j][0] === book) {
        books[j][1]++;
        foundBook = true;
      }
    }

    if (foundBook === false) {
      books.push([book, 1]);
    }

    // ===== ЧИТАЧІ =====
    let foundVisitor = false;

    for (let j = 0; j < visitors.length; j++) {
      if (visitors[j][0] === visitor) {
        visitors[j][1]++;
        foundVisitor = true;
      }
    }

    if (foundVisitor === false) {
      visitors.push([visitor, 1]);
    }
  }

  // ===== СОРТ КНИГ =====
  for (let i = 0; i < books.length; i++) {
    for (let j = i + 1; j < books.length; j++) {
      if (books[j][1] > books[i][1]) {
        let temp = books[i];
        books[i] = books[j];
        books[j] = temp;
      }
    }
  }

  // ===== СОРТ ЧИТАЧІВ =====
  for (let i = 0; i < visitors.length; i++) {
    for (let j = i + 1; j < visitors.length; j++) {
      if (visitors[j][1] > visitors[i][1]) {
        let temp = visitors[i];
        visitors[i] = visitors[j];
        visitors[j] = temp;
      }
    }
  }

  // ===== ВИВІД TOP-5 КНИГ =====
  for (let i = 0; i < books.length && i < 5; i++) {
    let li = document.createElement("li");
    li.innerText = books[i][0] + " — " + books[i][1];
    topBooksList.appendChild(li);
  }

  // ===== ВИВІД TOP-5 ЧИТАЧІВ =====
  for (let i = 0; i < visitors.length && i < 5; i++) {
    let li = document.createElement("li");
    li.innerText = visitors[i][0] + " — " + visitors[i][1];
    topVisitorsList.appendChild(li);
  }
}

function isOverdue(dueDate) {
  if (!dueDate) return false;

  let today = new Date();
  let due = new Date(dueDate);

  return due < today;
}
function updateOverdueStats() {

  let rows = document.querySelectorAll("#issuance-tbody-active tr");

  let overdue = 0;

  for (let i = 0; i < rows.length; i++) {

    let status = rows[i].querySelector(".status").innerText;

    if (status === "Прострочена") {
      overdue++;
    }
  }

  document.getElementById("stats-overdue").innerText = overdue;
} 
