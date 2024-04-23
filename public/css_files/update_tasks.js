var $ = function(id) {
	return document.getElementById(id);
};

$('plus_day').addEventListener('click',()=>{
    if ($('dayscores').value >= 30) {
        $('dayscores').value = 30;
    } else{
        $('dayscores').value = parseInt($('dayscores').value) + 1;
    }
});

$('minus_day').addEventListener('click',()=>{
    if ($('dayscores').value <= 1) {
        $('dayscores').value = 1;
    } else {
        $('dayscores').value = parseInt($('dayscores').value) - 1;
    }
});

let newHTML = "";
let json = JSON.parse($('zaglushka').value);

var mainDiv = document.getElementById("testInputs");

for (var i = 0; i < json.numberQues; i++) {
    newHTML += `
		<div class="main">
			<fieldset class="genTask">
				<legend>Создание задачи</legend>

				<div class="input">
					<label for="task${i+1}">Постановка задачи - ${i+1}:</label>
					<textarea style="overflow:auto;resize:none" name="task${i+1}" id='task${i+1}' rows="5" cols="45" >${json.problemStatement[i]}</textarea><br><br>
				</div>

				<div class="input">
					<label for="preview${i+1}">Пояснение к задаче - ${i+1}:</label>
                    <textarea style="overflow:auto;resize:none" name="preview${i+1}" id='preview${i+1}' rows="5" cols="45">${json.problemPreview[i]}</textarea><br><br>
                </div>
				
				<span tooltip="Текущий файл: ${json.problemSolution[i]}" flow="down">
				    <div class="input">
					    <input name="scriptSolution" id="main_solution${i+1}" type="file" accept=".sql" multiple />
						<input name="index_solution" id="solution_sub${i+1}" type="hidden" />
					    <label for="solution${i+1}">Решение задачи - ${i+1}</label><br><br>
					</div>
                </span>

                <span tooltip="Текущий файл: ${json.image[i]}" flow="down">
				    <div class="input">
					    <input name="image" id="main_photo${i+1}" type="file" accept=".png, .jpg, .jpeg" />
						<input name="index_photo" id="photo_sub${i+1}" type="hidden" />
					    <label for="photo${i+1}">Добавить фото таблицы - ${i+1}</label><br><br>
				    </div>
                </span>

                <span tooltip="Текущий файл: ${json.scriptTable[i].name}" flow="down">
				    <div class="input">
					    <input name="scriptTable" id="main_genTable${i+1}" type="file" accept=".sql" />
						<input name="index_genTable" id="genTable_sub${i+1}" type="hidden" />
					    <label for="genTable${i+1}">Скрипт генерации таблицы задачи - ${i+1}</label><br><br>
				    </div>
                </span>

				<div class="input">
					<label for="table_name${i+1}">Имя таблицы - ${i+1}</label>
					<input id="table_name${i+1}" type="text" name="table_name${i+1}" value="${json.scriptTable[i].table_name}" /><br><br>
                </div>

                <span tooltip="Текущий файл: ${json.scriptTableData[i].name}" flow="down">
				    <div class="input">
					    <input name="scriptTableData" id="main_testData${i+1}" type="file" accept=".sql" />
						<input name="index_testData" id="testData_sub${i+1}" type="hidden" />
					    <label for="testData${i+1}">Скрипт генерации тестовых данных задачи - ${i+1}</label>
				    </div>
                </span>
			</fieldset>
		</div>
	`;
}
mainDiv.innerHTML += newHTML;