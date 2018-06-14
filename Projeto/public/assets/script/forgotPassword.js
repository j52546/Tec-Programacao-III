function afterSubmit() {
    let email = document.getElementById('recuperarSenha').value
    if(email && new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(email)) {
        return true
    } else {
        let d = document.getElementById('messageError')
        d.style = 'display: block'
        setTimeout(() => {
          $('#messageError').removeClass('card_error')
          $('#messageError').addClass('card_error1')
          setTimeout(() => {
            $('#messageError').removeClass('card_error1')
            $('#messageError').addClass('card_error')
            $('#messageError').css('display', 'none')
          }, 1000)
        }, 3000)
        return false
    }
}

$(function() {
    $('#button_card_success').on('click', function() {
        $('#button_card_success').parent().hide()
        window.location.href='/recuperar-senha'
    })
})