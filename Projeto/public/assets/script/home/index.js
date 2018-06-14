$(function(){
    start()
    setInterval(start, 1000)
})

function start(){
    let textFooter = $('#showHours').text()
    textFooter = 'Astra Software'
    textFooter = 
        textFooter.concat(' ')
        .concat(new Date().getDate()+'/')
        .concat((new Date().getMonth()+1)+'/')
        .concat(new Date().getFullYear()+' - ')
        .concat(new Date().getHours()+':')
        .concat(
            new Date().getMinutes() < 10 ? 
            new Date().getMinutes().toString().padStart(2, 0) :
            new Date().getMinutes()
        )
     $('#showHours').text(textFooter)   
}

function openModal(element) {
   $('#'+element.toString()).modal('show')
}

function updateAccount(element) {
    element.ROLE = document.getElementById(element.DOCIND).value
   $.ajax({
       url:'/atualizar_conta',
       method:'POST',
       data: element,
       timeout:10000,
       error: function(err) {
           console.log(err)
           alert('error ao atualizar cadastro')
       },
       success: function(res) {
           $('#'+element.COD.toString()).modal('hide')
           location.href='/'
       }
   })
}