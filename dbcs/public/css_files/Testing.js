document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.pathname); // Используем pathname вместо search, так как id передается в пути
    const testId = urlParams.pathname.split('/').pop(); // Получаем id из URL пути

    try {
        const response = await fetch(`/test/${testId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch test data');
        }

        const test = await response.json();
        displayTest(test);
    } catch (error) {
        console.error('Error fetching test:', error);
    }
});

function displayTest(test) {
    const testContainer = document.getElementById('test-container');
    test.answerOptions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <h3>Вопрос ${index + 1}: ${question.question}</h3>
            ${getQuestionHTML(question, index)}
        `;
        testContainer.appendChild(questionElement);
    });
}

function getQuestionHTML(question, index) {
    let html = '';
    if (question.questionType === 'singleChoice') {
        html = question.answer.map((answer, i) => `
            <div>
                <input type="radio" id="question${index}_answer${i}" name="question${index}" value="${answer}">
                <label for="question${index}_answer${i}">${answer}</label>
            </div>
        `).join('');
    } else if (question.questionType === 'multipleChoice') {
        html = question.answer.map((answer, i) => `
            <div>
                <input type="checkbox" id="question${index}_answer${i}" name="question${index}" value="${answer}">
                <label for="question${index}_answer${i}">${answer}</label>
            </div>
        `).join('');
    } else if (question.questionType === 'openEnded') {
        html = `
            <div>
                <textarea id="question${index}_answer" name="question${index}"></textarea>
            </div>
        `;
    }
    return html;
}

document.getElementById('submit-test').addEventListener('click', async () => {
    const urlParams = new URLSearchParams(window.location.pathname); // Используем pathname вместо search, так как id передается в пути
    const testId = urlParams.pathname.split('/').pop(); // Получаем id из URL пути

    const testContainer = document.getElementById('test-container');
    const questions = testContainer.getElementsByClassName('question');
    const answers = Array.from(questions).map((question, index) => {
        const questionType = test.answerOptions[index].questionType;
        if (questionType === 'singleChoice') {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            return selectedOption ? selectedOption.value : null;
        } else if (questionType === 'multipleChoice') {
            return Array.from(question.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
        } else if (questionType === 'openEnded') {
            return question.querySelector('textarea').value;
        }
    });

    const submission = {
        testId,
        answers
    };

    try {
        const response = await fetch('/submit_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submission)
        });

        if (!response.ok) {
            throw new Error('Failed to submit test');
        }

        const result = await response.json();
        console.log('Test submitted successfully:', result);
    } catch (error) {
        console.error('Error submitting test:', error);
    }
});
