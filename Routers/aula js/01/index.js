start();

function start(){
    var btn = document.getElementById('btnAdd');
    btn.onclick = function(){
        addNewElement();
    }
}

function addNewElement(){
    var newP = document.createElement('p');
    var div = document.getElementById('myDiv');

    div.appendChild(newP);
    newP.innerHTML = 'Paragrafo novo !!';

}