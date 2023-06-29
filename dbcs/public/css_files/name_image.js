$("[type=file]").on("change", function(){
  // Name of file and placeholder
  var file = this.files[0].name;
  var dflt = $(this).attr("placeholder");
  if($(this).val()!=""){
    $(this).next().text(file);
  } else {
    $(this).next().text(dflt);
  }
});

const toast = document.querySelector(".toast")
      closeIcon = document.querySelector(".close"),
      progress = document.querySelector(".progress");

      let timer1, timer2;
      timer1 = setTimeout(() => {
        toast.classList.remove("active");
      }, 5000); //1s = 1000 milliseconds

      timer2 = setTimeout(() => {
        progress.classList.remove("active");
      }, 5300);
      

      closeIcon.addEventListener("click", () => {
        toast.classList.remove("active");

        setTimeout(() => {
            progress.classList.remove("active");
        }, 300);
        clearTimeout(timer1);
        clearTimeout(timer2);
      });