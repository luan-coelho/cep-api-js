var buttonSubmit = document.querySelector('#app form button')
var inputTextField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

buttonSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    if (validadeCep(inputTextField.value)) {
        find()
    }
})

inputTextField.addEventListener('keyup', () => {
    removeInvalidCharacters(inputTextField)

    if (inputTextField.value.length === 8) {
        if (validadeCep(inputTextField.value)) {
            find()
        }
    }
})

function find() {
    cleanScreen()

    axios
        .get(`https://viacep.com.br/ws/${inputTextField.value}/json`)
        .then((response) => {
            if (response.data.erro) {
                throw new Error()
            }

            createLine(response.data.bairro)
            createLine(response.data.logradouro)
            createLine(response.data.localidade + '-' + response.data.uf)
        })
        .catch((error) => {
            createLine('Ops, algo deu errado!')
        })
}

function createLine(text) {
    let line = document.createElement('p')
    let textNode = document.createTextNode(text)

    line.appendChild(textNode)
    content.appendChild(line)
}

function cleanScreen() {
    content.innerHTML = ''
}

function removeInvalidCharacters(field) {
    field.value = field.value.replace(/\D/g, '')
}

function validadeCep(cep) {
    let cepValidator = /^[0-9]{8}$/;

    if (!cepValidator.test(cep)) {
        cleanScreen()
        createLine('Informe um CEP válido')
        return false;
    }
    return true;
}