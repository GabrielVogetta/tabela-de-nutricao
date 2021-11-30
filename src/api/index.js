const get = async () => {
    const request = await fetch('https://616dd3c4a83a850017caa74d.mockapi.io/tabela-nutricao')
    const data = request.json();
    return data;
};

const post = async (data) => {
    const request = await fetch('https://616dd3c4a83a850017caa74d.mockapi.io/tabela-nutricao', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    console.log(request);
};

const api = {get, post};

export default api;