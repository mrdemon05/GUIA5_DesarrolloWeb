const numeroAleatorio = Math.floor(Math.random() * 25) + 1;

const numeroIntentos = 3;

let intentos = 1;

function generarNumeroAleatorio() {
    let mensaje;

    const parrafo = document.querySelector("#idParrafo");

    if (intentos <= numeroIntentos) {
        let numero = prompt(
            "¿Qué número se ha generado (Intento " + intentos + ")?"
        );

        if (numero == numeroAleatorio) {
            mensaje = `¡Es sorprendente, pudiste adivinar el número oculto (${numeroAleatorio}).
            Refresque la página para volver a jugar.`;
        } else {
            // Determinamos la pista cuando el usuario falla
            let pista;

            if (numero < numeroAleatorio) {
                pista = "El número oculto es más alto que el ingresado.";
            } else {
                pista = "El número oculto es más bajo que el ingresado.";
            }

            // Indicamos si quedan intentos disponibles
            if (intentos == numeroIntentos) {
                mensaje = `${pista}
                Su número de intentos ha terminado.
                El número oculto era: ${numeroAleatorio}.
                Refresque la página para volver a jugar.`;
            } else {
                mensaje = `${pista}
                Vuelva a intentar. Quedan ${
                    numeroIntentos - intentos
                } intentos.`;
            }
        }

        intentos++;
    } else {
        mensaje = `Su número de intentos ha terminado.
        El número oculto era: ${numeroAleatorio}.
        Refresque la página para volver a jugar.`;
    }

    parrafo.innerHTML = mensaje;
}
