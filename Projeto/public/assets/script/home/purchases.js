let itemToBeReproved = {
    item:undefined,
    component:undefined
}

let itemToBeApproved = {
    item:undefined,
    component:undefined
}

$(function(){
    $('#closeOptions').on('click', changeNameBtn)
    $('#dataTableClin').DataTable()
})

function changeNameBtn() {
    $('.btnInformation').each((index, element)=>{
        if($(element).text() === 'Abrir') {
            $(element).html('<i class="fa fa-plus" aria-hidden="true"></i>')
        } else {
            $(element).text('Abrir')
        }
    })
}

function moreInformation(context){
    $('#table_items').DataTable().clear().draw()
    let data = $('#dataTableClin').DataTable().row($(context).parent().parent()).data()
    if(data.length > 0) {
        let id = data[6]
        $.ajax({
            url:'/approve/purchases/items',
            method: 'POST',
            data: {id},
            error: function ( err ) {
                $.snackbar({
                    content:'Falha ao receber dados',
                    timeout:3000
                })
            },
            success: function ( items ) {
                $('#all_items').modal('show')
                if(items && items.length > 0) {
                    items.map(item=>{
                        $('#table_items').DataTable().row.add([
                            item.COD,
                            item.NOME,
                            item.PRECO.toFixed(2),
                            item.QTD,
                            item.DESCR,
                            item.SALDO
                        ]).draw()
                    })
                }
            }
        })
    }
}

function approveSale(btn) {
    itemToBeApproved.item = $('#dataTableClin').DataTable().row($(btn).parent().parent()).data()
    itemToBeApproved.component = $(btn).parent().parent()
    $('#alert_approve').modal('show')
}

function reproveSale(btn) {
    itemToBeReproved.item = $('#dataTableClin').DataTable().row($(btn).parent().parent()).data()
    itemToBeReproved.component = $(btn).parent().parent()
    $('#alert_reprove').modal('show')
}

function reprovedItem() {
    $.ajax({
        url:'/reprove/purchases',
        method:'POST',
        data:{item: itemToBeReproved.item},
        error: function ( err ) {
            $.snackbar({
                content:'Error ao reprovar item',
                timeout:3000
            })
        },
        success: function ( result ) {
            if(result.operation === 'done') {
                $.snackbar({
                    content:'Venda reprovada',
                    timeout:3000,
                    style:'toast'
                })
                $('#dataTableClin').DataTable().row(itemToBeReproved.component).remove().draw()
                setUndefinedItemToBeReproved()
            } else {
                $.snackbar({
                    content:'Error ao reprovar item',
                    timeout:3000
                })
            }
        }
    })
}

function approveItem() {
    $.ajax({
        url:'/approve/purchases',
        method:'POST',
        data:{item: itemToBeApproved.item},
        error: function ( err ) {
            $.snackbar({
                content:'Error ao aprovar item',
                timeout:3000
            })
        },
        success: function ( result ) {
            if(result.operation === 'done') {
                $.snackbar({
                    content:'Venda aprovada',
                    timeout:3000,
                    style:'toast'
                })
                $('#dataTableClin').DataTable().row(itemToBeApproved.component).remove().draw()
                setUndefinedItemToBeApproved()
            }
        }
    })

}

function setUndefinedItemToBeApproved() {
    itemToBeApproved.component = itemToBeApproved.item = undefined
}

function setUndefinedItemToBeReproved() {
    itemToBeReproved.component = itemToBeReproved.item = undefined
}