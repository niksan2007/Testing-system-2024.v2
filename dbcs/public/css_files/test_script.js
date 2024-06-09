// Функция для отправки ответов на сервер
async function submitTest() {
    // Получаем все ответы пользователя из формы
    const form = document.getElementById('test-form');
    const formData = new FormData(form);

    // Получаем значения динамических полей
    const testId = document.getElementById('testId').value;
    const lectorId = document.getElementById('lectorId').value;

    // Преобразуем ответы в нужный формат JSON
    const answers = [];
    formData.forEach((value, key) => {
        const questionIndex = parseInt(key.replace('question', ''), 10);
        if (!answers[questionIndex]) {
            answers[questionIndex] = [];
        }
        answers[questionIndex].push(value);
    });

    // Формируем объект для отправки на сервер
    const submission = {
        testId: testId,
        lectorId: lectorId,
        answers: answers
    };
    console.log(JSON.stringify(submission, null, 2));

    try {
        // Отправляем ответы на сервер методом POST
        const response = await fetch('/student/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submission)
        });

        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error('Failed to submit test');
        }

        // Получаем результат от сервера
        const result = await response.json();
        console.log('Test submitted successfully:', result);
    } catch (error) {
        console.error('Error submitting test:', error);
    }
}
