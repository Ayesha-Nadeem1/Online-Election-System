// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
// let popup= document.getElementById('popup');
// function openPopup(){
//     popup.classList.add('open-popup')
// }
  
// function closePopup(){
//     popup.classList.remove('open-popup')
// }
  

document.querySelector("#btnAddNewElection").addEventListener("click",function(){
     document.querySelector(".popup").classList.add("active")
});
document.querySelector(".popup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup").classList.remove("active")
});

