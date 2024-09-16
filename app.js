const {select, input, checkbox} = require ('@inquirer/prompts')

const metaVazia = 'A meta nao pode ser vazia'
const metaConcluida = 'Parabéns meta(s) concluida !'

let meta = {
    value: 'Estudar todos os dias',
    checked: false,
}

let metas = [meta]


const cadastrarMeta = async () => {
    const meta = await input ({
        message: 'Digite a meta:'
        
    })
    if (meta.length == 0) {
        console.log(`${metaVazia} cadastre uma ou escolha em sair`)
        return
        
    }
   
    metas.push({
        value: meta, checked: false
    })
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: 'Utilize as setas para selecione as meta, espaço para marcar ou desmarcar e Enter para finalizar',
        choices: [...metas],
        instructions: false,
    })

    if (respostas == 0 ) {
        console.log('Nenhuma meta selecionada')
        return
    }

    metas.forEach((e)=>{
        e.checked = false
    })

    respostas.forEach(
        (resposta) =>{
            const meta = metas.find((e) => {
                return e.value == resposta
            })
            meta.checked = true
        }
    )
    console.log(metaConcluida)
}
const start = async () => {

    while (true) {
    
        const opcao = await select({
            message: 'Selecione uma opção',
            choices: [
                {name: 'Cadastrar meta', value: 'cadastrar'},
                {name: 'Listar meta', value: 'listar'},
                {name: 'Sair', value: 'sair'}
            ]
        })

        switch (opcao) {
            case 'cadastrar':
                await cadastrarMeta() 
                console.log(metas)               
                break;

                case 'listar':
                    await listarMetas()
                    console.log('Vamos listar')
                break;
                
                case 'sair':
                    console.log('Você saiu do app')
                    return
            
        }
    }
}

start()