document.addEventListener("DOMContentLoaded", function() {
    const testTopicsList = document.getElementById('testTopicsList');
    const testTopicsData = testTopicsList.dataset.topics;

    if (testTopicsData) {
        const testTopics = JSON.parse(testTopicsData);

        if (testTopics.length > 0) {
            testTopics.forEach(topic => {
                const li = document.createElement('li');
                li.classList.add('topic-item');

                const span = document.createElement('span');
                span.textContent = topic;

                const a = document.createElement('a');
                a.href = `/test_results?topic=${encodeURIComponent(topic)}`;
                a.classList.add('btn');

                const i = document.createElement('i');
                i.classList.add('bx', 'bx-enter');

                a.appendChild(i);
                li.appendChild(span);
                li.appendChild(a);
                testTopicsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'Нет доступных тем тестов';
            testTopicsList.appendChild(li);
        }
    } else {
        console.error("Ошибка: Данные тем тестов отсутствуют или некорректны");
    }
});