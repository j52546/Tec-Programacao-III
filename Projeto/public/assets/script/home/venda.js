let clients = new Array()
let codigo_clientes = new Array()
$(function() {
    $('#validateForm').on('click', validateForm)
    $('#form_venda').submit(saveVenda)
})

function validateForm() {
    $.ajax({
        url:'/venda/find',
        method:'POST',
        data: {id_prod: $('#cod_prod').val(), id_client: $('#id_client').val()},
        error: function ( err ) {
            $('#errorFind').modal('show')
        },
        success: populateInputs
    })
}

function populateInputs(result) {
    if(!('prodNotFound' in result) && !('clientNotFound' in result)) {
        $('#cod_prod').attr('disabled', true)
        $('#id_client').attr('disabled', true)
        $('#valor').attr('disabled', true).val(result.preco_prod)
        $('#descricao').val(result.desc_prod)
        $('#nome_produto').val(result.name_prod)
        $('#nome_cliente').val(result.name_client)
        $('#saldo_produto').val(result.qtd_prod)
        $('#saveBtn').attr('disabled', false)
    } else if('clientNotFound' in result) {
        $('#clientNotFound').modal('show')
    } else {
        $('#prodNotFound').modal('show')
    }
}

function saveVenda() {
    let name_prod = $('#nome_produto').val()
    let nome_cliente = $('#nome_cliente').val()
    let id_client = $('#id_client').val()
    let cod_prod = $('#cod_prod').val()
    let saldo = $('#saldo_produto').val()
    let qtd = $('#qtd').val()
    let preco = $('#valor').val()
    let total = parseFloat(preco) * parseInt(qtd)
    let table = $('#dataTable').DataTable()
    table.row.add([
        id_client,
        nome_cliente,
        name_prod,
        qtd,
        preco,
        total.toFixed(2),
        saldo,
        '<button class="btn btn-danger" onclick="deleteItem(this)">Excluir</button>',
        cod_prod,
    ]).draw( false )

    if(codigo_clientes.indexOf(id_client) === -1) {
        codigo_clientes.push(id_client)
    } 
    $('#saveBtn').attr('disabled', true)
    clearFields()
    return false
}

function clearFields(){
    $('#id_client').attr('disabled', false).val('')
    $('#cod_prod').attr('disabled', false).val('')
    $('#descricao').val('')
    $('#valor').val('')
    $('#qtd').val('')
}

function deleteItem(context) {
    $('#dataTable').DataTable().row($(context).parent().parent()).remove().draw()
}

function showWarning() {
    $('#confirmVenda').modal('show')
}

function sendVenda() {
    initializeVenda()
    let arrayBody = new Array()
    codigo_clientes.map(cod=>{
        let filterContent = clients.filter(ped=>ped.id===cod)
        filterContent.length > 0 && arrayBody.push({id_client: cod, items: filterContent, name_client:filterContent[0].name_client})
    })

    let productsWithBalanceZero = new Array()
    arrayBody.map(value=>{
        productsWithBalanceZero = value.items.filter(content=>parseInt(content.saldo) === 0 || clients.filter(v=>value.items[0].id_prod === v.id_prod).map(c=>c.qtd).reduce((a,b)=>parseInt(a)+parseInt(b),0) > parseInt(content.saldo))
    })

    if(productsWithBalanceZero.length > 0) {
        let html = ''
        productsWithBalanceZero.forEach(value=>{
            html += '<li class="list-group-item">'+value.name_produto+'</li>'
        })
        $('#products_with_zero_balance').html(html)
        $('#alertAboutProducts').modal('show')
    }

    if(arrayBody.length > 0 && clients.length > 0 && productsWithBalanceZero.length === 0) {  
        $.ajax({
            url:'/venda',
            method:'POST',
            data: {content: arrayBody},
            error: function ( err ) {
               $.snackbar({
                   content:'erro no servidor',
                   style:'toast',
                   timeout: 3000
               })
            },
            success: function( result ) {   
               if(result.operation === 'done') {
                    clients = []
                    codigo_clientes = []
                    $('#dataTable').DataTable().clear().draw()
                    $.snackbar({
                        content:'venda cadastrada com sucesso',
                        style:'toast',
                        timeout:3000
                    })
                    
                } else {
                    $.snackbar({
                        content:'erro no servidor',
                        style:'toast',
                        timeout: 3000
                    })
                }
            }
        })
    } else if(productsWithBalanceZero.length === 0) {
        $.snackbar({
            content:'Sem pedido de venda na tabela',
            style:'toast',
            timeout:2000    
        })
    }
}

function initializeVenda(){
    clients = new Array()
    $('#dataTable').DataTable().rows().data().toArray().map(content => {
        clients.push({
            id: content[0],
            name_client: content[1],
            name_produto: content[2],
            id_prod: content[8],
            qtd:content[3],
            preco:content[4],
            total: content[5],
            saldo: content[6] 
        })
    })
   
}

function loadingProducts() {
    $('#table_products').DataTable().clear().draw()
    $('#all_products').modal('show')
    $.ajax({
        url:'/produtos/all',
        method:'GET',
        error: function( err ) {
            $.snackbar({
                content:'Houve uma falha ao buscar dados',
                timeout:3000
            })
        },
        success: function (result) {
            if(result.operation === 'done' && result.content.length > 0) {
                result.content.forEach(value => {
                    $('#table_products').DataTable().row.add([
                        value.COD,
                        value.NOME, 
                        value.SALDO,
                        value.PRECO_VENDA.toFixed(2),
                        value.DESCR
                    ]).draw()
                })
            } else if(result.operation === 'fail') {
                $.snackbar({
                    content:'Houve uma falha ao buscar dados',
                    timeout:3000
                })
            }
        }
    })
}

function getAllClients() {
    $('#table_clients').DataTable().clear().draw()
    $('#all_clients').modal('show')
    $.ajax({
        url:'/clients/all',
        method:'GET',
        error: function( err ) {
           $.snackbar({
               timeout:3000,
               content:'Houve uma falha ao buscar dados'
           })
        },
        success: function ( result ) {
            if(result.operation === 'done' && result.content.length > 0) {
                result.content.map(content=>{
                    $('#table_clients').DataTable().row.add([
                        content.id,
                        content.name,
                        content.email,
                        content.phone,
                        content.person
                    ]).draw()
                })
            }
        }
    })
}
