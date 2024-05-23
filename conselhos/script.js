const getConselho = async () => {

    return await fetch("https://api.adviceslip.com/advice", {
        method: "GET",
        "Content-Type": "application/json"
    })
    .then((res) => res.json())
    .then((json) => {
        return json.slip.advice;
    })
    .catch((err) => {
        return "Às vezes as coisam dão errado mesmo, igual esta requisição!"
    })
    
}

const tradutor = async (text) => {

    return await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|pt-BR`, {
        method: "GET",
        "Content-Type": "application/json"
    })
    .then((res) => res.json())
    .then((json) => {
        return json.responseData.translatedText;
    })
    .catch((err) => {
        return text;
    })
}

const btn = document.querySelector('#btn');
const containerConselho = document.querySelector('#showConselho');

btn.addEventListener('click', async () => {

    if(containerConselho.hasChildNodes()){
        containerConselho.innerHTML = ""
    }

    const conselhoEN = await getConselho();

    const paragrafo = document.createElement("p");
    const buttonTraduzir = document.createElement("button");
    
    paragrafo.innerText = `" ${conselhoEN} "`;

    buttonTraduzir.id = "btnTraduzir"
    buttonTraduzir.innerText = "Traduzir"

    containerConselho.appendChild(paragrafo)
    containerConselho.appendChild(buttonTraduzir)

    buttonTraduzir.addEventListener('click', async () => {
        const conselhoPTBR = await tradutor(conselhoEN);
        paragrafo.innerText = `" ${conselhoPTBR} "`;
    })
    
})