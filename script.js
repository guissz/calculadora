const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=botao]')
const operadores = document.querySelectorAll('[id*=operador')

const limiteDisplay = 12

let novoNumero = true
let operador
let numeroAnterior

const atualizarDisplay = (texto) => {
    let stringTexto = texto.toString();

    // Verifica se é necessário usar notação científica
    if (stringTexto.length > limiteDisplay) {
        // Tenta converter para número para garantir a correta manipulação
        const num = Number(texto);
        if (!isNaN(num)) {
            // Usa notação científica para números muito grandes ou pequenos
            if (num > 1e+9 || num < 1e-9) {
                stringTexto = num.toExponential(2);
            } else {
                // Arredonda o número para caber no display
                const precisao = limiteDisplay - Math.floor(num).toString().length - 1;
                stringTexto = num.toFixed(precisao > 0 ? precisao : 0);
            }
        }
        stringTexto = stringTexto.slice(0, limiteDisplay); // Garante o limite
    }

    // Atualiza o display com o texto processado
    if (novoNumero) {
        display.textContent = stringTexto;
        novoNumero = false;
    } else {
        if ((display.textContent + stringTexto).length <= limiteDisplay) {
            display.textContent += stringTexto;
        }
    }
}

// Insere os números no display de acordo com o conteúdo do botão
const inserirNumeros = (e) => atualizarDisplay(e.target.textContent)
numeros.forEach (numero => numero.addEventListener('click', inserirNumeros))

// Define qual será a operação matemática realizada
const inserirOperador = (e) => {
    if (!novoNumero) {
        novoNumero = true
        operador = e.target.textContent
        numeroAnterior = display.textContent
    }
}
operadores.forEach (operador => operador.addEventListener('click', inserirOperador))

const operacaoPendente = () => operador !== undefined

// Calcula o total da operação matemática
const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = display.textContent
        novoNumero = true
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)
    }
}
document.getElementById('calcular').addEventListener('click', calcular)

// Apaga o número exibido no display da memória
const limparEntrada = () => display.textContent = ''
document.getElementById('limpar-entrada').addEventListener('click', limparEntrada)

// Limpa o calculo da memória
const limparCalculo = () => {
    limparEntrada()
    operador = undefined
    numeroAnterior = undefined
    novoNumero = true
}
document.getElementById('limpar-calculo').addEventListener('click', limparCalculo)

// Apaga o último caractere do número exibido no display
const apagar = () => display.textContent = display.textContent.slice(0, -1)
document.getElementById('apagar').addEventListener('click', apagar)

// Inverte o sinal do número exibido no display
const inverter = () =>  {
    novoNumero = true
    atualizarDisplay(display.textContent * -1)
}
document.getElementById('inverter').addEventListener('click', inverter)

// Coverte um número para decimal utilizando '.'
const decimal = () => {
    if (display.textContent === '') {
        atualizarDisplay('0.') // Verifica se o display está vazio, caso esteja, adiciona um 0 à frente do .
    } else if (!display.textContent.includes('.')) {
        atualizarDisplay('.')
    }
}
document.getElementById('decimal').addEventListener('click', decimal)