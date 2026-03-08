const crimes = [

{nome:"Porte ilegal de arma", pena:20},
{nome:"Tráfico de drogas", pena:60},
{nome:"Roubo", pena:40},
{nome:"Assalto a banco", pena:120},
{nome:"Sequestro", pena:80},
{nome:"Tentativa de homicídio", pena:90}

]

let total = 0

const select = document.getElementById("crime")

crimes.forEach(c => {

let option = document.createElement("option")

option.value = c.pena

option.textContent = c.nome + " - " + c.pena + " meses"

select.appendChild(option)

})

function adicionarCrime(){

let crimeSelecionado = select.options[select.selectedIndex]

if(!crimeSelecionado.value) return

let pena = parseInt(crimeSelecionado.value)

total += pena

let li = document.createElement("li")

li.textContent = crimeSelecionado.textContent

document.getElementById("lista").appendChild(li)

atualizar()

}

function atualizar(){

document.getElementById("total").textContent = total + " meses"

}

function aplicarAtenuante(){

total = Math.floor(total * 0.6)

atualizar()

}

function limpar(){

total = 0

document.getElementById("lista").innerHTML = ""

atualizar()

}
