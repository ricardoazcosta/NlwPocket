const {select} = require ('@inquirer/prompts')

const start = async () => {

    while (true) {
    
        const opcao = await select({
            message: 'Selecione uma opção',
            choices: [
                {name: 'Cadastrar', value: 'cadastrar'},
                {name: 'Listar', value: 'listar'},
                {name: 'Sair', value: 'sair'}
            ]
        })

        switch (opcao) {
            case 'cadastrar':
                console.log('Vamos cadastrar')
                
                break;

                case 'listar':
                    console.log('Vamos listar')
                break;
                
                case 'sair':
                    console.log('Até mais')
                    return
            
        }
    }
}

start()