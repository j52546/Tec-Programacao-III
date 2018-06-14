document.addEventListener('DOMContentLoaded', start)
const TIME_OUT = 5

function start(){
    let timeRedirect = document.getElementById('time_redirect')
    timeRedirect.innerText = TIME_OUT
    redirectPageAfterFiveSeconds(TIME_OUT)
}

function redirectPageAfterFiveSeconds(time){
    let clearTime = setTimeout(() => {
        if(time === 0) {
            clearTimeout(clearTime)
            window.location.href = '/login'
        } else {
            document.getElementById('time_redirect').innerText = --time
            redirectPageAfterFiveSeconds(time)
        }
    }, 1000)
}