const produtos = [

{nome:"FAJUTA",sem:3000,com:2500},
{nome:"COMUM",sem:4000,com:3500},
{nome:"INCOMUM",sem:6000,com:5500},
{nome:"RARO",sem:13000,com:12000},
{nome:"ESPECIAL",sem:26000,com:25000},
{nome:"LUVA",sem:1300,com:1200},
{nome:"LIXA",sem:1200,com:800}

];

const tabela=document.getElementById("tabela");

produtos.forEach((p,i)=>{

const tr=document.createElement("tr");

tr.innerHTML=`

<td>${p.nome}</td>

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

const valorSem=qtd*produto.sem;
const valorCom=qtd*produto.com;

document.getElementById("sem"+i).innerText=
"R$ "+valorSem.toLocaleString();

document.getElementById("com"+i).innerText=
"R$ "+valorCom.toLocaleString();

totalSem+=valorSem;
totalCom+=valorCom;

});

document.getElementById("totalSem").innerText=
"R$ "+totalSem.toLocaleString();

document.getElementById("totalCom").innerText=
"R$ "+totalCom.toLocaleString();

document.getElementById("pessoalSem").innerText=
"R$ "+(totalSem*0.8).toLocaleString();

document.getElementById("balaclavSem").innerText=
"R$ "+(totalSem*0.2).toLocaleString();

document.getElementById("pessoalCom").innerText=
"R$ "+(totalCom*0.8).toLocaleString();

document.getElementById("balaclavCom").innerText=
"R$ "+(totalCom*0.2).toLocaleString();

}
