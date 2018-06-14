$(function(){
    requestService('/list/entrance')
})

function getEntrance() {
    $('#dataTable').DataTable().clear().draw()
   $('#titlePage').css('color', '#28a745').text('Entrada')
   requestService('/list/entrance')
}

function getExit(){
    $('#dataTable').DataTable().clear().draw()
    $('#titlePage').css('color', '#dc3545').text('Saída')
    requestService('/list/exit')
}

function requestService(url){
    $.ajax({
        url,
        method:'GET',
        error: function ( err ) {
            $.snackbar({
                content:'Falha ao receber dados',
                timeout:3000
            })
        },
        success: function ( products ) {
            if(products.content) {
                products.content.map(product=>{
                    $('#dataTable').DataTable().row.add([
                        product.COD,
                        product.NOME,
                        product.quantidade,
                        product.SALDO
                    ]).draw()
                })
            }
        }
    })
}
