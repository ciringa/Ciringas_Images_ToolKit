
function main(){
    const url = 'http://localhost:4545/image/remove';
    const data={
        url:document.getElementById("filePath").value 
    }
    fetch(url, {
        method: 'PATCH', // Método HTTP PATCH
        headers: {
            'Content-Type': 'application/json', // Especifica o tipo de conteúdo como JSON
        },
        body: JSON.stringify(data), // Transforma o objeto 'data' em uma string JSON
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then((data) => {
        console.log('Atualização de usuário bem-sucedida:', data); // Processa a resposta da API
    })
    .catch((error) => {
        console.error('Erro:', error); // Trata qualquer erro da requisição
    });
}