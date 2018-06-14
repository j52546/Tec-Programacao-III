function productsPDF(){
    let options = {            
        startY: 20,
        margin: { horizontal: 5 },
        bodyStyles: { valign: 'top' },
        styles: { overflow: 'linebreak' },
        columnStyles:{
            0:{columnWidth:17},
            1:{columnWidth:25},
            2:{columnWidth:75},
            3:{columnWidth:15},
            4:{columnWidth:15},
            5:{columnWidth:25},
            6:{columnWidth:20}
        },
        headerStyles: {
            fillColor: [51, 122, 183],
            textColor: [255],
            halign: 'center'
        },
        theme: 'grid'
    }
    const columns = ['Código', 'Nome', 'Descrição', 'Preço', 'Saldo', 'Quantidade', 'Renda final']
    let rows = new Array()
    const doc = new jsPDF()
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFontStyle('bold');
    doc.text("Lista de produtos", 80, 12);
    const data = $('#dataTable').DataTable().rows().data()
    for(let i = 0; i < data.length; i++){
         if(i != $('#dataTable').DataTable().page.len()) {
            rows.push(data[i].filter((v, index) => index!==3))
         } else break  
    }
    doc.autoTable(columns, rows, options)
    doc.save('Produtos_vendidos.pdf')
}

function downloadPDFEmployee(){
    let options = {            
        startY: 20,
        margin: { horizontal: 5 },
        bodyStyles: { valign: 'top' },
        styles: { overflow: 'linebreak' },
        headerStyles: {
            fillColor: [51, 122, 183],
            textColor: [255],
            halign: 'center'
        },
        theme: 'grid'
    }
    const columns = ['Nome', 'Documento', 'Telefone', 'Email', 'Função']
    let rows = new Array()
    const doc = new jsPDF()
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFontStyle('bold');
    doc.text("Lista de funcionários", 80, 12);
    const data = $('#dataTable').DataTable().rows().data()
    for(let i = 0; i < data.length; i++){
         rows.push(data[i])
    }
    doc.autoTable(columns, rows, options)
    doc.save('Funcionários.pdf')
    
}