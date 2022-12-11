// procura pelo formulário para cadastrar o usuario
const userForm = document.querySelector("#user-form")

// fica "ouvindo" o botão, quando o usuario clicar (submit) no botão, então o método register será chamado
userForm.addEventListener("submit", register)

// no método register, o evento será passado como parâmetro
function register(event) {
    // Diz para o browser que se o evento não for, explicitamente, manuseado. Então o seu comportamento padrão não deve ocorrer
    event.preventDefault()

    // Objeto usuario sendo construido
    const userObj = {
      name: event.target.name.value,
      password: event.target.password.value,
      email: event.target.email.value,
      oldYear: event.target.oldYear.value
    }

    // Realiza o cadastro do usuario..
    signUp(userObj)
      .then(newUserObjObj => {
      // Feito o cadastro, o usuario será redirecionado para a pagina de login
        window.location.href = 'signIn.html'
        // resposta da requisição será printada no console
        console.log('Sucesso:', newUserObjObj)
      })
}