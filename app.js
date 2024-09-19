const { select, input, checkbox } = require("@inquirer/prompts");
const fs = require("fs").promises

let  mensagem = "Bem vindo ao App de Metas";




let metas  

const carregarMetas = async() => {
  try{
    const dados = await fs.readFile('metas.json', 'utf8')
    metas = JSON.parse (dados)
  }
  catch(erro){}

}

const salvarMetas = async () => {
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
  const meta = await input({
    message: "Digite a meta:",
  });
  if (meta.length == 0) {
    mensagem = 'A meta nao pode ser VAZIA cadastre uma ou escolha sair';
    return;
  }

  metas.push({
    value: meta,
    checked: false,
  });
  mensagem = `Meta ${meta} foi cadastrada com sucesso !`
};

const listarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas !"
    return
  }
  const respostas = await checkbox({
    message:
      "Utilize as setas para selecione as meta, espaço para marcar ou desmarcar e Enter para finalizar",
    choices: [...metas],
    instructions: false,
  });

  metas.forEach((e) => {
    e.checked = false;
  });

 

  if (respostas == 0) {
    mensagem = "Nenhuma meta selecionada";
    return;
  }


  respostas.forEach((resposta) => {

    const meta = metas.find((e) => {
      return e.value == resposta;
    });
    meta.checked = true;
  });
  mensagem = `PARABÉNS meta concluida`
};

const metasRealizadas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas !"
    return
  }
    const realizadas = metas.filter((meta) =>{
        return meta.checked 
    })

    if (realizadas.length == 0) {
        
        mensagem = 'Não existem metas realizadas 😞'
        return
    }
    await select({
        message: 'Meta(s) realizada(s) ' + realizadas.length,
        choices: [...realizadas]
    })

}

const metasAbertas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas !"
    return
  }
  const abertas = metas.filter((meta) => {
    return !meta.checked
  })
  if (abertas.length == 0) {
    mensagem = 'Não existem metas abertas 😊'
    return
}
await select({
  message: 'Total de Meta(s) Aberta(s) ' + abertas.length,
  choices: [...abertas]
})
}

const excluirMetas = async () =>{
  if (metas.length == 0) {
    mensagem = "Não existem metas !"
    return
  }
  const metasDesmarcadas = metas.map((meta)=>{
    return { value: meta.value, checkbox: false}
  })
  
  const metasADeletar = await checkbox({
    message: "Selecione o item para deletar",
    choices: [...metasDesmarcadas],
    instructions: false,
  })
  
  if (metasADeletar == 0) {
    mensagem = 'Nenhuma item para deletar'
    return
    
  }

  metasADeletar.forEach((item)=>{
    metas=metas.filter((meta) => {
      return meta.value != item
    })
  })
mensagem = 'Meta(s) deletada(s) com Sucesso'
}

const mostrarMensagem = () =>{
  console.clear();

  if (mensagem != "") {
    console.log(mensagem)
    console.log("")
    mensagem = ""
  }
}

const start = async () => {

await carregarMetas()

  while (true) {
  
    mostrarMensagem()
  
    await salvarMetas()
    const opcao = await select({
      message: "Selecione uma opção",
      choices: [
        { name: "Cadastrar meta", value: "cadastrar" },
        { name: "Listar meta", value: "listar" },
        { name: "Metas realizada(s)", value: "realizada(s)" },
        { name: "Metas abertas(s)", value: "aberta(s)" },
        { name: "Excluir metas(s)", value: "excluir" },
        { name: "Sair", value: "sair" },
      ],
    });

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta();
        break;

      case "listar":
        await listarMetas();
        break;
      case "realizada(s)":
        await metasRealizadas();
        break;
        case "aberta(s)":
          await metasAbertas();
          break;
          case "excluir":
            await excluirMetas();
            break;
      case "sair":
        console.log("Você saiu do app");
        return;
    }
  }
};

start();
