// declar uma função chamada novoRegistro, onde será passado um objeto como parâmetro
function novoRegistro(animalObj) {
	// esta função deverá retornar a reposta da requisição em json(), mas antes...
	// usando o fetch na rota para cadastrar um novo registro
  return fetch('https://donation-api.onrender.com/api/v1/animals/', {
  // será usado o método http POST, para enviar dados para o servidor
    method: 'POST',
    // no cabeçalho da requisição será dito que o tipo de conteúdo enviado está no formato JSON
    headers: {
      'Content-Type': 'application/json',
    },
    // portanto, será preciso converter o objeto que foi recebido como parâmetro em JSON e atribuir esse JSON
    // ao corpo da requisição
    body: JSON.stringify(animalObj),
  })
  // então a reposta é o JSON que o servidor retornar quando o codigo http é 200 (OK)
    .then(response => response.json())
}

// a função listaTodos não precisa de parâmetros
function listaTodos() {
	// diferente do método novoRegistro, não é necessario dizer o método HTTP
	// por padrão o fetch entende que será feito um GET
  return fetch("https://donation-api.onrender.com/api/v1/animals/")
  // então os dados são retornado no formato JSON como anteriormente
    .then(response => response.json())
}

// O método para atualizar o registro deverá ser passado o id e o objeto que será atualizado 
function atualizaRegistro(id, updatedAnimal) {
  // o id será passado na URL da requisição, se isso não for feito poderá ser criado um novo registro, ao invez de atualizar
    return fetch(`https://donation-api.onrender.com/api/v1/animals/${id}`, {
    // método PUT responsavel por atualizar, alguns autores usam o POST para fazer isso
        method: 'PUT',
        // será enviado um JSON no corpo da requisição
        headers: {
          'Content-Type': 'application/json',
        },
        // Portanto, o objeto passado por parâmetro deverá ser convertido em JSON e salvado no atributo body
        body: JSON.stringify(updatedAnimal),
      })
      // então teremos um if
        .then(response => {
        // se a resposta for ok, será retornado a reposta no formato JSON
          if (response.ok) {
            return response.json()
          } else {
          // senão será retornado uma mensagem de erro
            throw new Error("Algo deu errado!")
          }
        })
  }
  
  // no método para deletar um registro, deve ser passado como parâmetro apenas o id do registro
  function deletaRegistro(id) {
  // a rota é similar ao de atualizar 
    return fetch(`https://donation-api.onrender.com/api/v1/animals/${id}`, {
    // o que muda é o método HTTP que é o DELETE
      method: 'DELETE',
    })
    // então a resposta da requisição é retornada - Detalhe: no backend esta requisição retorna o http Status 204 (No Content)
      .then(response => response.json())
  }


  // na função sign up (ou cadastro de usuarios) será passado um objeto como parâmetro
function signUp(userObj) {
  // esse objeto será enviado no corpo da requisição para o URL definida no fetch
    return fetch('https://donation-api.onrender.com/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // o objeto passado como parâmetro será convertido em JSON
      body: JSON.stringify(userObj),
    })
    // se houver sucesso, será retornado uma resposta (http status code 200 ok)
      .then(response => response.json())
}

// Neste método o email e a senha são passados como parâmetros
function profile(email, password) {
  // usando o método HTTP GET, o email e a senha passados como parâmetros serão usados na URL da requisição
    return fetch(`https://donation-api.onrender.com/api/v1/users/me/${email}/${password}`, {
      method: 'GET',
    })
    // o retorno deve ser todos os dados do usuario que logou
      .then(response => response.json())
  }

