/*var $ = function(id) {
	return document.getElementById(id);
};*/

let newHTML = "";
let json_test = JSON.parse(document.getElementById("zaglushka").value);
let json_reply = JSON.parse(document.getElementById("starting_data").value);

var mainDiv = document.getElementById("testInputs");
var query_number = document.getElementById("query_number").value;

for (var i = 0; i < json_test.numberQues; i++) {
    if (json_test.problemPreview[i] == "") {
        json_test.problemPreview[i] = "Отстутствует"
    }
    
    newHTML += `
		<div class="main">
			<fieldset class="genTask">
				<legend>Задача ${i+1}</legend>

				<div class="input">
					<h3>Постановка задачи</h3>
                    <hr>
                    <p>${json_test.problemStatement[i]}</p>
                    <hr>
                    <br>
				</div>

				<div class="input">
                    <h3>Дополнительное пояснение</h3>
                    <p>${json_test.problemPreview[i]}<p>
                    <br>
                </div>

                <div class="input">
                    <p>Таблица этой задачи выглядит следующим образом:<p>
                    <img src="testImages/${json_test.image[i]}" width="290px" alt="${json_test.image[i]}">
                    <br><br>
				</div>

                <div class="editor">
                    <div class="line-numbers">
                        <span></span>
                    </div>
                    <textarea id="stud_solution${i+1}" name="stud_solution${i+1}">${json_reply.temp_queries[i]}</textarea>
                </div>
                <br><br>
                
                ${i+1 == query_number ? 
                    `
                        <p id='showHere'></p>
                    ` : ""}
                
                <br>
                <button type="submit" name="button" value="${i+1}">Протестировать код</button>
                <br>
			</fieldset>
		</div>
	`;
}

mainDiv.innerHTML += newHTML;

// Add A CountDown for the Quiz
var time = json_test.numberRemaining * 60; // This is the time allowed
var saved_countdown = localStorage.getItem('saved_countdown');

if(saved_countdown == null) {
    // Set the time we're counting down to using the time allowed
    var new_countdown = new Date().getTime() + (time + 2) * 1000;
    time = new_countdown;
    localStorage.setItem('saved_countdown', new_countdown);
} else {
    time = saved_countdown;
}

// Update the count down every 1 second
var x = setInterval(() => {
    // Get today's date and time
    var now = new Date().getTime();
    
    // Find the distance between now and the allowed time
    var distance = time - now;

    // Time counter
    var counter = Math.floor((distance % (1000 * 60 * 60)) / 1000);
    var sec = Math.floor(counter % 60);
    var min = Math.floor(counter / 60) % 60;

    // Output the result in an element with id="count-down"
    document.getElementById("count-down").innerHTML = `TIME: ${min} : ${sec}`;
                
    // If the count down is over, write some text 
    if (counter <= 0) {
        clearInterval(x);
        localStorage.removeItem('saved_countdown');
        document.getElementById("count-down").innerHTML = "EXPIRED";

        $(document).ready(function() {
            $('.buttonFinish').on('click', function() {
                console.log("Автоматическая отправка");
            });
            $('.buttonFinish').click();
        });
    }
}, 1000);