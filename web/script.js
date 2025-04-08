const cadastro = document.querySelector('header form');
const tcorpo = document.querySelector('main tbody');
const listaArmazenada = JSON.parse(window.localStorage.getItem('contatos'));
const update = null;

if(!listaArmazenada){
    window.localStorage.setItem('contatos', JSON.stringify([]));
    alert('Esta página armazena dados sensíveis!');
    listaArmazenada = [];
}else{
    preencherTabela();
}

cadastro.addEventListener('submit', async e =>{
    e.preventDefault();
    const indice = Number(cadastro.indice.value);
    const novoRegistro = {
        
        nome: cadastro.nome.value,
        email: cadastro.email.value,
        endereco: cadastro.endereco.value,
        tel: cadastro.tel.value,
        cpf: cadastro.cpf.value,
        rg: cadastro.rg.value,
        
    };
    listaArmazenada.push(novoRegistro);
    await preencherTabela();
    await salvar();
});

async function preencherTabela(){
    tcorpo.innerHTML = '';
    listaArmazenada.forEach((c, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.nome}</td>
            <td>${c.email}</td>
            <td>${c.endereco}</td>
            <td>${c.tel}</td>
            <td>${c.cpf}</td>
            <td>${c.rg}</td>
            <td>
                <button class="btn btn-danger" onclick="excluir(${i})">-</button>
                <button class="btn btn-danger" onclick="editar(${i})">*</button>
            </td>
        `;
        tcorpo.appendChild(tr);
    });
}

async function salvar(){
    window.localStorage.setItem('contatos', JSON.stringify(listaArmazenada));
}

function excluir(i){
    if(confirm('Deseja realmente excluir?')){
        listaArmazenada.splice(i, 1);
        preencherTabela();
        salvar();
    }


}

function editar(i) {
    const contato = listaArmazenada[i];
    
  
    cadastro.nome.value = contato.nome;
    cadastro.email.value = contato.email;
    cadastro.endereco.value = contato.endereco;
    cadastro.tel.value = contato.tel;
    cadastro.cpf.value = contato.cpf;
    cadastro.rg.value = contato.rg;


    update = i;
}

function limparFormulario() {
    cadastro.nome.value = '';
    cadastro.email.value = '';
    cadastro.telefone.value = '';
    cadastro.endereco.value = '';
    cadastro.cpf.value = '';
    cadastro.rg.value = '';
}