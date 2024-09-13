// arrays, objetos
//Organização de 1 meta
let meta = {
    value: 'ler um livro por mês',
    checked: false,
    
}
//Organização de varias metas
let metas = [
    meta,
    {
        value: 'fazer exercícios por 30 minutos',
        checked: false
    }
]

console.log(metas[1].value)

const start = () =>{
    let cont = 0
    while (cont <= 10) {
        console.log(cont)
        cont++

        
    }
}

start()

const repet = () => {
    while (true) {
        let opcao = 'cadastrar'
        switch(opcao){
            case 'cadastrar':
                console.log('vamos cadastrar')
                break;
                case 'listar':
                    console.log('vamos listar')
                    break;
                    case 'sair':
                        return
        }
        
    }


}

repet()
