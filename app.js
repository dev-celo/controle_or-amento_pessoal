class Despesa{
    constructor(ano, mes,dias, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dias = dias
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}

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
    console.log(despesa)
}