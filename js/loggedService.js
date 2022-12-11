// procura pela tag <span> com o id spanEmail
const email = document.getElementById("email")
// procura pela tag <span> com o id spanName
const name = document.getElementById("name")
// procura pela tag <span> com o id spanOldYear
const oldYear = document.getElementById("oldYear")

// procura no local storage o item com o nome email e atribui isso no spanEmail
email.innerHTML = localStorage.getItem("email")
// procura no local storage o item com o nome name e atribui isso no spanName
name.innerHTML = localStorage.getItem("name")
// procura no local storage o item com o nome oldYear e atribui isso no spanOldYear
oldYear.innerHTML = localStorage.getItem("oldYear")

// a função abaixo limpa o local storage
function limparStorage() {
	localStorage.clear();
}