// procurar pelo formulário no index.html e atribuir o elemento encontrado à variavel animalForm
const animalForm = document.querySelector("#animal-form")

// deverá ser procurado pela tag com o id animal-list na index.html
const animalList = document.querySelector("#animal-list")

// quando o 'click' na lista acontecer o método handleAnimalListClick será chamado - este evento pode ocorrer ao deletar ou atualizar algum registro
animalList.addEventListener("click", handleAnimalListClick)

// quando o 'submit' no index.html acontecer o método registraNovoAnimal será chamado
animalForm.addEventListener("submit", registraNovoAnimal)

// O evento (event) passado por parâmetro é o clique que o usuario dá no botão Cadastrar que se encontra na pagina index.html 
function registraNovoAnimal(event) {
  // Diz para o browser que se o evento não for, explicitamente, manuseado. Então o seu comportamento padrão não deve ocorrer
  event.preventDefault()

  // A partir dos inputs que se encontram no index.html, o valor inserido pelo usuário será armazenado em um objeto chamado animalObj
  const animalObj = {
    name: event.target.name.value,
    imageUrl: event.target.image_url.value,
    description: event.target.description.value,
    // com exceção das doações, que será cadastrada com o valor 0
    donations: 0
  }

  // Usando o método novoRegistro que está na api.js... Será feito um POST no backend
  novoRegistro(animalObj)
    .then(newAnimalObj => {
		  // Não será necessario mais printar no console, pois ao cadastrar um novo registro, ele deverá aparecer na lista
	    renderizaUmRegistro(newAnimalObj);  
      //console.log('Sucesso:', newAnimalObj);
    })

  // Por fim, os campos são limpados na pagina index.html
  event.target.reset()
}

// Similar ao registrar um novo animal, como parâmetro é passado o evento
function handleAnimalListClick(event) {
  // Um dos eventos é o button deletar
    if (event.target.matches(".delete-button")) {
      
      // Se o usuario clicar no 'X' de deletar
      const button = event.target
      
      // Será procurado o card responsavel pelo botão que o usuario clicou
      const card = button.closest(".card")
    // o id deste card será armazenado em uma variavel
      const id = card.dataset.id
  
      // E o método escrito na api.js responsavel por deletar é chamado
      deletaRegistro(id)
        .then(data => {
        // Será mostrado a resposta da requisição que é sem conteudo
          console.log('Sucesso:', data);
        })
  
      // Por fim o card é removido (ou destruido)
      card.remove()
  
  // Senão, se o usuario clicar no botão "Doe R$ 10,00"
    } else if (event.target.dataset.action === "donate") {
      // Se o usuario clicar em "Doe R$ 10,00"
      const button = event.target
      
      // Será procurado o card responsavel pelo botão que o usuario clicou
      const card = button.closest(".card")
    // O id deste card será salvo em uma variavel
      const id = card.dataset.id
  
    // será procurado também o contador de doações
      const donationCountSpan = card.querySelector(".donation-count")
      
      // O valor do contador de doações será convertido em inteiro e somado com 10
      const donationCount = parseInt(donationCountSpan.textContent) + 10
  
    // por fim é criado um objeto do card que o usuario quer atualizar
      const updatedAnimal = {
      // o nome do animal de determinado card é atribuido à variavel name
        name: card.dataset.name,
        // a descrição do animal de determinado card é atribuido à variavel description
        description: card.dataset.description,
        // a imagem do animal de determinado card é atribuido à variavel imageUrl
        imageUrl: card.dataset.imageUrl,
        // a soma do contador de doações com 10 é atribuido à variavel donations
        donations: donationCount,
      }
  
      // Criado o objeto, esse objeto será passado por parâmetro no método que responsavel por atualizar no arquivo api.js
      // o id do card também deve ser passado por parâmetro
      atualizaRegistro(id, updatedAnimal)
      // Ainda acho que essa parte é redundante
        .then(updatedAnimal => {
          updatedAnimal = {
            name: card.dataset.name,
            description: card.dataset.description,
            imageUrl: card.dataset.imageUrl,
            donations: donationCount,
          }
      // Se ocorrer tudo bem, o objeto atualizado é mostrado no console
          console.log('Sucesso:', updatedAnimal);
  
          // é contado de doações é atualizado com o valor atualizado no banco de dados
          donationCountSpan.textContent = updatedAnimal.donations
        })
        .catch(error => {
        // se ocorrer um erro surgirá um alerta com o erro
          alert(error)
        })
    }
  }


// Nessa função um objeto é passo, para poder ser então renderizado
function renderizaUmRegistro(animalObj) {
  // Toda lista sendo ordenada ou não, precisa ter dentro dela a tag <li>
  // é isso que esse codigo está fazendo
  const card = document.createElement("li")
  // definindo como sendo 'card' o nome da class, isso vai permitir estilizar o elemento
  card.className = "card"
  
  // dataset - permite deixar os valores do objeto em "segundo plano", basicamente valores que o usuario final não irá ver
  // o usuario não vai ver o id
  card.dataset.id = animalObj.id
  // o nome do animal o usuario vai ver, mas isso será explicado mais pra frente no Atualizar Registro
  card.dataset.name = animalObj.name
  // a descrição do animal o usuario vai ver, mas isso será explicado mais pra frente no Atualizar Registro
  card.dataset.description = animalObj.description
  // a imagem do animal o usuario vai ver, mas isso será explicado mais pra frente no Atualizar Registro
  card.dataset.imageUrl = animalObj.imageUrl
  
  // Então será escrito um trecho html via programação, neste caso é uma <div> - O nome da classe que as <div> possuem permitem estilizar esses elementos renderizados via programação 
  card.innerHTML = `
  <div class="image">
  <!-- Isso é importante para poder passar os valores recebidos dinâmicamente -->
  <!-- A url da imagem do animal cadastrado e o texto alternativo desta imagem virão do backend -->
    <img src="${animalObj.imageUrl}" alt="${animalObj.name}">
    <button class="button delete-button" data-action="delete">X</button>
  </div>
  <div class="content">
  <!-- O nomed do animal vai vir do backend também -->
    <h4>${animalObj.name}</h4>
    <div class="donations">
    <!-- O valor doado para cuidar do animal virá do backend também -->
      $<span class="donation-count">${animalObj.donations}</span> Doado
    </div>
    <!- A descrição do animal virá do backend também -->
    <p class="description">${animalObj.description}</p>
  </div>
  <!-- Botão para doar o valor de R$ 10,00 - Esse botão na verdade atualiza o registro -->
  <button class="button donate-button" data-action="donate">
    Doe R$ 10,00
  </button>
  `

  // Por fim, o card gerado via programação será salvo na lista
  animalList.append(card)
}


// Na função para rendizer todos os animais será passado um array com os registro cadastrados, essa função será usada dentro do metodo de inicialização da aplicação
function renderizaTodosAnimais(animalArray) {
  // dentro do forEach é possivel definir uma nova função ou usar uma referência, neste caso está sendo usado uma referência ao método renderizaUmRegistro - dessa forma o card com o registro do animal encontrado será criado via programação
  animalArray.forEach(renderizaUmRegistro)
}

// Inicializa a renderização dos cards
function initialize() {
// Realiza o GET no backend, usando o método listaTodos() escrito no arquivo api.js
  listaTodos()
  // A resposta da requisição irá será passada como parâmetro no método que é responsavel por renderizar todos os animal 
    .then(animalArray => {
      renderizaTodosAnimais(animalArray)
    })
    .catch(errors => {
    // se algo der errado aparece esse alerta
      alert("Algo deu errado!")
    })
}

// Deverá ficar no final do documento
initialize()