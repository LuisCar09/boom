const usertInput = document.getElementById('userInput')
const spanTag = document.getElementById('counter')
const resultDiv = document.getElementById('result')
const countDownDiv = document.getElementById('countdown')
const restarButton = document.getElementById('restart')
let counterInterval

let counter = 5;
spanTag.innerHTML = counter

//Creamos un numero ramdom
const ramdonNumber = () => {
    const min = 1;
    const max = 3

    return Math.floor(Math.random() * ((max - min) + 1) + min)
}


//Obtenemos el valor del input
const getInput = () => {
    let user = parseInt(usertInput.value)
    usertInput.setAttribute('disabled', 'true')
    counterInterval = setInterval(decreaseCounter, 1000); //Iniciamos el intervalo.

    //creamos la promesa que devolvera un objeto con la claves y los valores
    const response = new Promise((resolve) => {
        setTimeout(() => {
            const getRandomNumber = ramdonNumber()
            const results = {
                successfullMessage: '',
                resultMessage: ''
            }
            if (user === getRandomNumber) {

                results.successfullMessage = '<h2>Enhorabuena, has salvado al mundo👑</h2>';

                results.resultMessage = `<h2>Tu numero es <span>${user}</span> que es el mismo numero que <span>${getRandomNumber}</span></h2>`

                resolve(results)
            } else {

                results.successfullMessage = '<h2>Has Fallado, Thanos destruir&aacute el mundo💣</h2>';

                results.resultMessage = `<h2>Tu numero es <span>${user}</span> que NO es el mismo numero que <span>${getRandomNumber}</span></h2>`

                resolve(results)
            }
        }, 6000);
    })
    response.then((data) => {
        //usamos el destructor para almacenar en variables diferentes los valores y sea mas limpio el codigo
        const { successfullMessage, resultMessage } = data


        resultDiv.insertAdjacentHTML('afterbegin', resultMessage)
        countDownDiv.insertAdjacentHTML('beforeend', successfullMessage)
    }).catch((error) => console.log(error.message))
}
//El intervalo llamara a decreaseCounter cada 1s para hacer que counter disminuya.
const decreaseCounter = () => {

    spanTag.innerHTML = counter
    //Cuando counter llege a 0 limpiaremos el intervalo de modo que no se vuelva un descuento infinito
    if (counter === 0) {
        clearCounterInterval()
        spanTag.innerHTML = counter

    }
    counter--
}


//funcion para limpiar el intervalo
const clearCounterInterval = () => {
    clearInterval(counterInterval)
    counterInterval = null
}

//Funcion para reiniciar el juego, que es lo mismo que refrescar la pagina
const restarPage = () => {
    location.reload()
}

usertInput.addEventListener('change', getInput)


restarButton.addEventListener('click', restarPage)