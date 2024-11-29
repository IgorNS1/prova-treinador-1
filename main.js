const startGameButton = document.querySelector('.start-game')
const title = document.querySelector('h1')
const questionContainer = document.querySelector('.question-container')
const questionText = document.querySelector('.question')
const answersContainer = document.querySelector('.answers-container')
const nextQuestionButton = document.querySelector('.next-question')

startGameButton.addEventListener('click', startGame)
nextQuestionButton.addEventListener('click', displayNextQuestion)

let currentQuestionIndex = 0 // contador das questões
let totalCorrect = 0

function startGame() {
    startGameButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    title.classList.add('hide')
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if (questions_page_1.length === currentQuestionIndex) {
        return finishGame()
    }

    questionText.textContent = questions_page_1[currentQuestionIndex].question
    questions_page_1[currentQuestionIndex].answer.forEach(answer => {
        const newAnswer = document.createElement('button')

        newAnswer.classList.add('button', 'answer')
        newAnswer.textContent = answer.text

        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }

        answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener('click', selectAnswer)
    })
}

function resetState() {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild)
    }

    document.body.removeAttribute('class')
    nextQuestionButton.classList.add('hide')
}

function selectAnswer(event) {
    const answerClicked = event.target

    if (answerClicked.dataset.correct) {
        document.body.classList.add('correct')
        document.body.classList.remove('incorrect')
        totalCorrect++
    } else {
        document.body.classList.add('incorrect')
        document.body.classList.remove('correct')
    }

    document.querySelectorAll('.answer').forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct')
        } else {
            button.classList.add('incorrect')
        }
        button.disabled = true
    })

    nextQuestionButton.classList.remove('hide')
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions_page_1.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = ''

    switch (true) {
        case (performance >= 90):
            message = 'Execelente :D'
            break
        case (performance >= 70):
            message = 'Muito Bom :)'
            break
        case (performance >= 50):
            message = 'Bom :|'
            break
        case (performance >= 30):
            message = 'Precisa Melhorar :('
            break
        default:
            message = 'Precisa Melhorar MUITO D:'
    }

    questionContainer.innerHTML =
        `
            <p class="final-message">
                Você acertou ${totalCorrect} de ${totalQuestion} questôes!
                <span>Resultado: ${message}</span>
            </p>
        
            <button onclick="window.location.reload()" class="button">Refazer teste</button>

        `
}

const questions_page_1 = [
    {
        question: 'A limpeza inadequada do restaurante não atrai pragas',
        answer: [
            { text: 'VERDADEIRO', correct: false },
            { text: 'FALSO', correct: true },
        ]
    },
    {
        question: 'A linguagem corporal pode dizer muito sobre nosso estado deespirito. São exemplos de uma postura positiva',
        answer: [
            { text: 'Sentar-se com os braços cruzados e evitar contato visual', correct: false },
            { text: 'Manter uma expressão facial neutra ou indiferente', correct: false },
            { text: 'Olhar constantemente para o celular enquanto interage', correct: false },
            { text: 'Mãos na cintura e sorriso no rosto', correct: true },
        ]
    },
    {
        question: 'A máquina de Café Espresso auxilia no preparo de quais bebidas?',
        answer: [
            { text: 'Todos os tipos de café (Espresso, Curto, Duplo, Americano) Chá, Chocolate quente, Capuccino, Frapés,Latté, bebidas a base de leite vaporizado e Café Espresso', correct: true },
            { text: 'Apenas cafés simples, como espresso curto', correct: false },
            { text: 'Chá, Chocolate e Capuccino', correct: false },
            { text: 'Água mineral com gás e refrigerantes', correct: false },
        ]
    },
    {
        question: 'Antes de começar a montar e apresentar os pedidos você deve?',
        answer: [
            { text: 'Começar imediatamente a montagem sem verificar os utensílios', correct: false },
            { text: 'Pedir para o cliente aguardar indefinidamente enquanto termina outras tarefas.', correct: false },
            { text: 'Você deve conhecer um pouco mais sobre o processo e procedimento, equipamento e as ferramentas que irá utilizar', correct: true },
            { text: 'Ignorar o manual de procedimentos e improvisar', correct: false },
        ]
    },
    {
        question: 'Ao esclarecer o pedido para o cliente, o que podemos afirmar?',
        answer: [
            { text: 'Dizer que o cliente pode escolher apenas o que está na promoção', correct: false },
            { text: 'Informar que não há possibilidade de ajustes no pedido', correct: false },
            { text: 'Explique os condimentos que fazem parte dos produtos, tamanhos em relação as bebidas inserindo o tipo e a quantidade no registro do pedido', correct: true },
            { text: 'Sugerir que o cliente reconsidere seu pedido porque ele parece inadequado', correct: false },
        ]
    },
    {
        question: 'Ao receber o pedido do cliente para o Delivery é acionado o alarme sonoro do Tablet, o que ele indica?',
        answer: [
            { text: 'Que a bateria do tablet está prestes a acabar', correct: false },
            { text: 'Que o pedido foi cancelado', correct: false },
            { text: 'Que o motoboy chegou', correct: false },
            { text: 'Todas as informações do pedido do cliente', correct: true },
        ]
    },
    {
        question: 'Após quanto tempo de ativar as McFritas devemos agitá-las?',
        answer: [
            { text: 'Após 45 segundos', correct: false },
            { text: 'Após 30 segundos', correct: true },
            { text: 'Após 10 segundo', correct: false },
            { text: 'Após 35 segundos', correct: false },
        ]
    },
    {
        question: 'Caso o cliente reclame de seu pedido o que deve fazer?',
        answer: [
            { text: 'Escute, peça Desculpas, Resolva o problema, Agradeça ao cliente, Transmita o feedback', correct: true },
            { text: 'Ignorar a reclamação e continuar com outras tarefas', correct: false },
            { text: 'Pedir ao cliente que entre em contato com o suporte por e-mail', correct: false },
            { text: 'Informar que a reclamação não será registrada, pois não é relevante', correct: false },
        ]
    },
    {
        question: 'Cite três formas de Fazer Rápido',
        answer: [
            { text: 'Trabalhar sozinho para evitar erros de equipe', correct: false },
            { text: 'Ignorar o reabastecimento e improvisar quando necessário', correct: false },
            { text: 'Cortar etapas no processo para economizar tempo', correct: false },
            { text: 'Pensar antecipadamente sobre o reabastecimento, comunicar-se com a equipe e antecipar volumes elevados', correct: true },
        ]
    },
    {
        question: 'Com quem a hospitalidade começa no restaurante?',
        answer: [
            { text: 'Com os clientes mais frequentes, porque eles são prioridade', correct: false },
            { text: 'Com o gerente do turno, pois ele é quem organiza o ambiente', correct: false },
            { text: 'Com você', correct: true },
            { text: 'Com os fornecedores, já que garantem os produtos', correct: false },
        ]
    },
    {
        question: 'Com relação à Segurança, o que devemos utilizar quando estiver limpando o piso com o esfregão enquanto seca?',
        answer: [
            { text: 'Placas de piso molhado', correct: true },
            { text: 'Um cronômetro para garantir que o piso seque rápido', correct: false },
            { text: 'Apenas um pano seco para sinalizar que há limpeza em andamento', correct: false },
            { text: 'Nenhum item específico, pois o piso secará naturalmente', correct: false },
        ]
    },
    {
        question: 'Começando por você, quais comportamentos podem definir a base para uma boa experiência do cliente?',
        answer: [
            { text: 'Ser rápido, direto e não perder tempo com interações desnecessárias', correct: false },
            { text: 'Primeira impressão, Gentileza, Atitude, Acolhedor e Amigável', correct: true },
            { text: 'Mostrar-se reservado e evitar contato visual', correct: false },
            { text: 'Priorizar tarefas operacionais e deixar o cliente esperar', correct: false },
        ]
    },
    {
        question: 'Como certificamos um produto dentro dos padrões?',
        answer: [
            { text: 'Ignorar o rótulo dos alimentos, pois o prazo de validade é opcional', correct: false },
            { text: 'Usar qualquer ingrediente disponível, mesmo fora do prazo', correct: false },
            { text: 'Não verificar a aparência ou odor dos alimentos', correct: false },
            { text: 'Verifique sempre o rótulo dos alimentos para se certificar de que os ingredientes estão frescos. Não use alimentos vencidos', correct: true },
        ]
    },
    {
        question: 'Como configurar corretamente os headsets para a anotação de pedidos no Drive-thru, garantindo uma comunicação clara e eficiente com a equipe?',
        answer: [
            { text: 'Configurar os headsets no momento de preparação do segmento realizando um teste de comunicação com a equipe, observando se todos escutam de forma clara e sem ruídos', correct: true },
            { text: 'Configurar os headsets aleatoriamente, sem testes prévios', correct: false },
            { text: 'Utilizar apenas o volume mínimo para economizar bateria', correct: false },
            { text: 'Deixar os headsets desligados para evitar distrações', correct: false },
        ]
    },
    {
        question: 'Como cumprir a promessa de Fazer Rápido?',
        answer: [
            { text: 'Focar apenas na velocidade, sem se preocupar com a aparência ou qualidade dos produtos', correct: false },
            { text: 'Pular etapas do processo para economizar tempo', correct: false },
            { text: 'Cumprir a promessa de oferecer comida rápida e com boa aparência', correct: true },
            { text: 'Atender apenas os clientes com pedidos simples', correct: false },
        ]
    },
]

displayNextQuestion()