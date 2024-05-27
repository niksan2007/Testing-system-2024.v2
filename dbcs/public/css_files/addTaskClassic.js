function addAnswerOption(button) {
    const answerOptionsContainer = button.closest('.question').querySelector('.answerOptions');
    const optionCount = answerOptionsContainer.querySelectorAll('.input').length + 1;

    const newAnswerOption = document.createElement('div');
    newAnswerOption.classList.add('input');
    newAnswerOption.innerHTML = `
        <label for="answerOption${optionCount}">Вариант ответа ${optionCount}:</label>
        <textarea id="answerOption${optionCount}" name="answerOption${optionCount}" rows="3"></textarea>
        <input type="checkbox" id="correctAnswer${optionCount}" name="correctAnswer${optionCount}" />
        <label for="correctAnswer${optionCount}">Правильный ответ</label>
        <button type="button" onclick="removeAnswerOption(this)">Удалить</button>
    `;

    answerOptionsContainer.appendChild(newAnswerOption);
}

function removeAnswerOption(button) {
    const answerOptionDiv = button.closest('.input');
    answerOptionDiv.remove();
}

function showQuestionFields(questionContainer) {
    const questionType = questionContainer.querySelector('.questionType').value;
    const questionContent = questionContainer.querySelector('.questionContent');

    if (questionType === 'singleChoice' || questionType === 'multipleChoice') {
        questionContent.innerHTML = `
            <div class="input">
            <br>
                <label for="questionText">Постановка задачи:</label>
                <textarea style="overflow:auto;resize:none" name="questionText" rows="5" cols="45"></textarea><br><br>
            </div>
            <div class="answerOptions">
                <div class="input">
                    <label for="answerOption1">Вариант ответа 1:</label>
                    <textarea id="answerOption1" name="answerOption1" rows="3"></textarea>
                    <input type="checkbox" id="correctAnswer1" name="correctAnswer1" />
                    <label for="correctAnswer1">Правильный ответ</label>
                    <button type="button" onclick="removeAnswerOption(this)">Удалить</button>
                </div>
            </div>
            <button type="button" onclick="addAnswerOption(this)">Добавить вариант ответа</button>
        `;
    } else if (questionType === 'openEnded') {
        questionContent.innerHTML = `
            <div class="input">
            <br>
                <label for="questionText">Постановка задачи:</label>
                <textarea style="overflow:auto;resize:none" name="questionText" rows="5" cols="45"></textarea><br><br>
            </div>
        
            <div class="input">
                <label for="openEndedQuestion">Вариант ответа:</label>
                <textarea name="openEndedQuestion"></textarea>
                <br>
                <label for="openEndedAnswer">Правильный ответ:</label>
                <textarea name="openEndedAnswer"></textarea>
            </div>
        `;
    } else {
        questionContent.innerHTML = '';
    }
}

function addQuestion() {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionCount = questionsContainer.children.length + 1;

    const newQuestion = document.createElement('div');
    newQuestion.classList.add('question');
    newQuestion.innerHTML = `
    <legend style="text-align: center;">Вопрос ${questionCount}:</legend>
        <select class="questionType" onchange="showQuestionFields(this.parentNode)">
            <option value="">Выберите тип вопроса</option>
            <option value="singleChoice">Единственный ответ</option>
            <option value="multipleChoice">Множественный ответ</option>
            <option value="openEnded">Открытый ответ</option>
        </select>
        <div class="questionContent">
            <!-- Здесь будет содержимое вопроса -->
        </div>
    `;

    questionsContainer.appendChild(newQuestion);
}

document.addEventListener('DOMContentLoaded', function() {
    const plusButton = document.getElementById('plus_day');
    const minusButton = document.getElementById('minus_day');
    const daysInput = document.getElementById('dayscores');

    plusButton.addEventListener('click', function() {
        let currentValue = parseInt(daysInput.value);
        // Увеличиваем значение на 5, но не больше 90
        daysInput.value = Math.min(currentValue + 5, 90);
    });

    minusButton.addEventListener('click', function() {
        let currentValue = parseInt(daysInput.value);
        // Уменьшаем значение на 5, но не меньше 1
        daysInput.value = Math.max(currentValue - 5, 1);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    addQuestion(); // Добавляем первый вопрос по умолчанию

    document.getElementById('plus_que_count').addEventListener('click', () => {
        const numScoresInput = document.getElementById('numscores_count');
        let numScores = parseInt(numScoresInput.value);
        numScoresInput.value = (numScores >= 10) ? 10 : numScores + 1;
        addQuestion();
    });

    document.getElementById('minus_que_count').addEventListener('click', () => {
        const numScoresInput = document.getElementById('numscores_count');
        let numScores = parseInt(numScoresInput.value);
        numScoresInput.value = (numScores <= 1) ? 1 : numScores - 1;

        const questionsContainer = document.getElementById('questionsContainer');
        const lastQuestion = questionsContainer.lastChild;
        if (lastQuestion) {
            questionsContainer.removeChild(lastQuestion);
        }
    });
});
