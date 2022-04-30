class Despesa{
    constructor(ano, mes,dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let key in this) {
            if(this[key] == undefined || this[key] == '' || this[key] == null){
                return false
            }
        }
        return true
    }
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoID(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }


    gravar(desp){
        let id = this.getProximoID()

        localStorage.setItem(id, JSON.stringify(desp))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        // recuperar todas as despesas
        for(let i = 1; i <= id; i++){
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            // Tratamento de indices pulados ou removidos
            //se o elemento for null, pulamos o indice
            if(despesa === null){
                continue
            }

            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()

        //console.log(despesa)
        //console.log(despesasFiltradas)

        //ano 
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        //tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //descricao
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        //valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }
}

let bd =new Bd()

function cadastrarDespesas(){
    //alert('cadastrando despesas')

    //Selecionando elementospelo id
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //instância de nova despesa
    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value,
        descricao.value, 
        valor.value
    )
    
    if(despesa.validarDados()){
        //dialog sucesso
        bd.gravar(despesa)
        
        // Manipulando o titulo do modal
        let title = document.getElementById('titleModal')
        title.innerText = 'Registro cadastrado com sucesso!'

        //mudando cor do elemento title
        let confTitle = document.getElementById('conf-titulo-modal')
        confTitle.className = 'modal-header text-success'

        // Manipulando o subtitulo
        let subtitle = document.getElementById('subTitle')
        subtitle.innerText = 'Despesa cadastrada com sucesso!'

        // Manipulando botão modal
        let button = document.getElementById('buttonModal')
        button.className = 'btn btn-success'
        button.innerText = 'Pronto'


        $('#modalRegistroDespesas').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    }else{
        //dialogerro

        // Manipulando o titulo do modal
        let title = document.getElementById('titleModal')
        title.innerText = 'Erro ao inserir registro!'

        let confTitle = document.getElementById('conf-titulo-modal')
        confTitle.className = 'modal-header text-danger'

        // Manipulando o subtitulo
        let subtitle = document.getElementById('subTitle')
        subtitle.innerText = 'Preencha os campos em branco abaixo!'

        // Manipulando botão modal
        let button = document.getElementById('buttonModal')
        button.className = 'btn btn-danger'
        button.innerText = 'Fechar e preencher'

        $('#modalRegistroDespesas').modal('show')
    }
    
}

function carregaListaDespesas(){
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
    
    //seleciona o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    //percorre o array despesas, listando dinâmicamente
    despesas.forEach(function(d){
        
        // criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criando colunas (td)
        //incrementando 0 aos meses de 1 digito
        d.mes < 10 ? linha.insertCell(0).innerHTML = `${d.dia} / 0${d.mes} / ${d.ano}` : linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`  
        

        //ajustar tipo
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer '
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = `${d.tipo}`

        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(3).innerHTML = `${d.valor}`
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    bd.pesquisar(despesa)
}