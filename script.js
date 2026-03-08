const produtos = [

{nome:"FAJUTA",cor:"Azul",classe:"azul",sem:3000,com:2500},
{nome:"COMUM",cor:"Branco",classe:"branco",sem:4000,com:3500},
{nome:"INCOMUM",cor:"Verde",classe:"verde",sem:6000,com:5500},
{nome:"RARO",cor:"Vermelho",classe:"vermelho",sem:13000,com:12000},
{nome:"ESPECIAL",cor:"Preto",classe:"preto",sem:26000,com:25000},
{nome:"LUVA",classe:"preto",sem:1300,com:1200},
{nome:"LIXA",classe:"preto",sem:1200,com:800}

];

const tabela=document.getElementById("tabela");

produtos.forEach((p,i)=>{

const tr=document.createElement("tr");

tr.innerHTML=`

<td>

<div class="nome">

<span class="usb ${p.classe}"></span>

${p.nome} ${p.cor ? "(" + p.cor + ")" : ""}

</div>

</td>

<td>R$ ${p.sem.toLocaleString()}</td>

<td>R$ ${p.com.toLocaleString()}</td>

<td>
<input type="number" min="0" value="0" data-index="${i}">
</td>

<td id="sem${i}">R$ 0</td>
<td id="com${i}">R$ 0</td>

`;

tabela.appendChild(tr);

});

document.addEventListener("input",calcular);

function calcular(){

let totalSem=0;
let totalCom=0;

document.querySelectorAll("input").forEach(input=>{

const i=input.dataset.index;
const qtd=parseInt(input.value)||0;

const produto=produtos[i];

const sem=qtd*produto.sem;
const com=qtd*produto.com;

document.getElementById("sem"+i).innerText="R$ "+sem.toLocaleString();
document.getElementById("com"+i).innerText="R$ "+com.toLocaleString();

totalSem+=sem;
totalCom+=com;

});

document.getElementById("totalSem").innerText="R$ "+totalSem.toLocaleString();
document.getElementById("totalCom").innerText="R$ "+totalCom.toLocaleString();

document.getElementById("pessoalSem").innerText="R$ "+(totalSem*0.8).toLocaleString();
document.getElementById("balaclavSem").innerText="R$ "+(totalSem*0.2).toLocaleString();

document.getElementById("pessoalCom").innerText="R$ "+(totalCom*0.8).toLocaleString();
document.getElementById("balaclavCom").innerText="R$ "+(totalCom*0.2).toLocaleString();

}
