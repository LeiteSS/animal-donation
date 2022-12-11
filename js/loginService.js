// procura pelo formulario para poder logar
const loginForm = document.querySelector("#login-form")

// espera o usuario clicar em "Logar" e ao clicar em "Logar", o método login será chamado
loginForm.addEventListener("submit", login)

// no método login, o evento é passado o como parâmetro
function login(event)
{
    // Diz para o browser que se o evento não for, explicitamente, manuseado. Então o seu comportamento padrão não deve ocorrer
    event.preventDefault()

	// No método profile que se encontra na api.js, será passado os inputs do usuario como parâmetro
    profile(event.target.email.value, event.target.password.value)
      .then(data => {
	     // printa os dados do usuario logado como parâmetro
        console.log('Sucesso:', data)
        // o email do usuario logado será salvo no local Storage
        localStorage.setItem("email", data.email)
        // o nome do usuario logado será salvo no local Storage
        localStorage.setItem("name", data.name)
        // a idade do usuario logado será salvo no local Storage
        localStorage.setItem("oldYear", data.oldYear)
        // redireciona o usuario para a pagina onde será mostrado os dados do usuario logado
        window.location.href = 'logged.html'
      })
}
