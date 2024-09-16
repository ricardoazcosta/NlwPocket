const {select, input} = require ('@inquirer/prompts')


let meta = {
    value: 'Estudar todos os dias',
    checked: false,
}

let metas = [meta]

const metaVazia = 'A meta nao pode ser vazia'

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
                    console.log('Vamos listar')
                break;
                
                case 'sair':
                    console.log('Você saiu do app')
                    return
            
        }
    }
}

start()