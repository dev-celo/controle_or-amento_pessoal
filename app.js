class Despesa{
    constructor(ano, mes,dias, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dias = dias
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
        var title = document.getElementById('titleModal')
        title.className = 'modal-title text-success'
        title.innerText = 'Registro gravado com sucesso!'

        // Manipulando o subtitulo
        var subtitle = document.getElementById('subTitle')
        subtitle.innerText = 'Despesa cadastrada com sucesso!'

        // Manipulando botão modal
        var button = document.getElementById('buttonModal')
        button.className = 'btn btn-success'
        button.innerText = 'Pronto'


        $('#modalRegistroDespesas').modal('show')
    }else{
        //dialogerro

        var title = document.getElementById('titleModal')
        title.className = 'modal-title text-danger'
        title.innerText = 'Erro ao inserir registro!'

        // Manipulando o subtitulo
        var subtitle = document.getElementById('subTitle')
        subtitle.innerText = 'Preencha os campos em branco abaixo!'

        // Manipulando botão modal
        var button = document.getElementById('buttonModal')
        button.className = 'btn btn-danger'
        button.innerText = 'Fechar e preencher'

        $('#modalRegistroDespesas').modal('show')
    }
    
}