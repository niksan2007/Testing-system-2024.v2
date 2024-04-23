// define a function so that in js code, $ can be used to replace document.getElementById
var $ = function(id) {
	return document.getElementById(id);
};

$('plus_que').addEventListener('click',()=>{
    if ($('numscores').value >= 10) {
        $('numscores').value = 10;
    } else{
        $('numscores').value = parseInt($('numscores').value) + 1;
    }
});

$('minus_que').addEventListener('click',()=>{
    if ($('numscores').value <= 1) {
        $('numscores').value = 1;
    } else {
        $('numscores').value = parseInt($('numscores').value) - 1;
    }
});

$('plus_day').addEventListener('click',()=>{
    if ($('dayscores').value >= 90) {
        $('dayscores').value = 90;
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
  
var numInputs = 1; //default setting, showing one test score input box
  
//define setupInputBox function to add more test score inputs boxes 
var setupInputBox = function() {
	$('testInputs').innerHTML = "";
	//string to hold our new html
	let newHTML = "";
  
	numInputs = $('numscores').value;
	numInputs = parseInt(numInputs);

	// convert inputs into integer numerical value
	//step-1.1: Add a condition in if() statement
	//if user input for number of test scores is valid and in the range 1 to 5
	if (Number.isInteger(numInputs) && numInputs >= 1 && numInputs <= 10) {
		var mainDiv = document.getElementById("testInputs");
	  	for (var i = 0; i < numInputs; i++) {
		//Create new html using template literal
		newHTML += `
		<div class="main">
			<fieldset class="genTask">
				<legend>Создание задачи</legend>

				<div class="input">
					<label for="task${i+1}">Постановка задачи - ${i+1}:</label>
					<textarea style="overflow:auto;resize:none" name="task${i+1}" id='task${i+1}' rows="5" cols="45" ></textarea><br><br>
				</div>

				<div class="input">
					<label for="preview${i+1}">Пояснение к задаче - ${i+1}:</label>
                    <textarea style="overflow:auto;resize:none" name="preview${i+1}" id='preview${i+1}' rows="5" cols="45"></textarea><br><br>
                </div>

				<div class="input">
					<input id="solution${i+1}" type="file" name="scriptSolution" accept=".sql"  />
					<label for="solution${i+1}">Решение задачи - ${i+1}</label><br><br>
				</div>

				<div class="input">
					<input id="photo${i+1}" type="file" name="image" accept=".png, .jpg, .jpeg"  />
					<label for="photo${i+1}">Добавить фото таблицы - ${i+1}</label><br><br>
				</div>

				<div class="input">
					<input id="genTable${i+1}" type="file" name="scriptTable" accept=".sql"  />
					<label for="genTable${i+1}">Скрипт генерации таблицы задачи - ${i+1}</label><br><br>
				</div>

				<div class="input">
					<label for="table_name${i+1}">Имя таблицы - ${i+1}</label>
					<input id="table_name${i+1}" type="text" name="table_name${i+1}" /><br><br>
                </div>

				<div class="input">
					<input id="testData${i+1}" type="file" name="scriptTableData" accept=".sql"  />
					<label for="testData${i+1}">Скрипт генерации тестовых данных задачи - ${i+1}</label>
				</div>
			</fieldset>
		</div>
		`;
	  }
	  //Update the div
	  mainDiv.innerHTML += newHTML;
	}
};

//whenever user changes selection on number of test scores to consider, setupInputBox function will be executed again
$('numscores').oninput = setupInputBox;
$('minus_que').onclick = setupInputBox;
$('plus_que').onclick = setupInputBox;
  
//define processEntries function to get user inputted test scores, do input validation, and caculate total and average points and 
//determine the final letter grade.  Display all results on web page.
$("numscores").focus();