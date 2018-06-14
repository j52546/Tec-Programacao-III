document.addEventListener('DOMContentLoaded', start)

const TELEPHONE_LENGTH = 14;

function start(){
    $('#password_diferent').hide()
    var SPMaskBehavior = function (val) {
        return val.length === 15 ? '(00) 00000-0000' : '(00) 0000-00009';
      },
      spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
          }
      };
      
      $('#userTel').mask(SPMaskBehavior, spOptions)
      $('#userCpf').mask('999.999.999-99')
      $('#form_register').on('submit', validateForm)
      $('#password').on('focus', handlerKeyboard)
      $('#confirmPassword').on('focus', handlerKeyboard)
      
}

function handlerKeyboard(){
    $('#password_diferent').hide(500)
}

function validateForm(){
    if($('#password').val() !== $('#confirmPassword').val()) {
        $('#password_diferent').show(500)
        return false
    } else {
        return true
    }
}
