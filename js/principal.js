'use strict'

window.onload = iniciar;

var arrGlo = {
    "miBd": {},
    "conn": "",
    "cartas": []
};

function iniciar() {
    crearBD();
    crearDivs();
    añadir_funcion_botones();
    mezclar_generar_cartas();
}

function mezclar_generar_cartas() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 13; j++) {
            var carta = new Clase_carta(j, i + "" + j);
            arrGlo.cartas.push(carta);
        }
    }
    arrGlo.cartas.sort(function() { return Math.random() - 0.5 });
    añadir(arrGlo.cartas, "Mezcla");
}

function Clase_carta(valor, imagen) {
    this.valor = valor;
    this.imagen = imagen;
}

function cambiar() {
    document.getElementById("contenedor").remove();
    document.getElementById("contenedorJuego").style.display = "grid";
    repartir_visual();
}

function añadir_funcion_botones() {
    document.getElementById("botonLogin").addEventListener("click", cambiar);
    //document.getElementById("botonRegistro").addEventListener("click", crearUsuario);
    document.getElementById("subir").addEventListener("click", repartir_visual);
}

function repartir_visual() {
    var padre_encima = document.getElementById("encima-repartir");

    var mazo = document.getElementById("mazo");

    for (let i = 1; i < 24; i++) {
        var hijo = document.createElement("div");
        hijo.setAttribute("class", "mazo mazo-reverso");
        hijo.setAttribute("id", "mazo" + i);
        hijo.style.top = mazo.offsetTop + "px";
        hijo.style.left = mazo.offsetLeft + "px";
        hijo.style.width = mazo.offsetWidth + "px";
        hijo.style.height = mazo.offsetHeight + "px";
        hijo.style.position = "absolute";
        padre_encima.appendChild(hijo);
    }

    var jugador = 1;
    var carta = 1;
    var numero = 23;
    var veces = 1;
    var posicion = 0;
    var diferenciax, diferenciay, ancho, alto;

    var intervalo = setInterval(function() {

        var carta_a_donde_mover = document.getElementById("carta" + carta + "j" + jugador);
        var carta_mover = document.getElementById("mazo" + numero);

        if (carta_mover.style.top == document.getElementById("mazo1").style.top) {
            diferenciax = (Number(carta_mover.offsetTop) - Number(carta_a_donde_mover.offsetTop)) / 10;
            diferenciay = (Number(carta_mover.offsetLeft) - Number(carta_a_donde_mover.offsetLeft)) / 10;
            alto = (Number(carta_mover.offsetHeight) - Number(carta_a_donde_mover.offsetHeight)) / 10;
            ancho = (Number(carta_mover.offsetWidth) - Number(carta_a_donde_mover.offsetWidth)) / 10;
        }

        var pixelx = Number(carta_mover.style.top.split('px')[0]);
        carta_mover.style.top = Number(pixelx - diferenciax) + "px";

        var pixely = Number(carta_mover.style.left.split('px')[0]);
        carta_mover.style.left = Number(pixely - diferenciay) + "px";

        var pixeli = Number(carta_mover.style.height.split('px')[0]);
        carta_mover.style.height = Number(pixeli - alto) + "px";

        var pixelj = Number(carta_mover.style.width.split('px')[0]);
        carta_mover.style.width = Number(pixelj - ancho) + "px";

        if (carta == 2 && jugador == 8 && veces == 10) {
            clearInterval(intervalo);
            repartir_mesa();
        }

        if (jugador == 8 && veces == 10) {
            document.getElementById("carta" + carta + "j" + jugador).style.backgroundImage = "url(img/" + arrGlo.cartas[posicion].imagen + ".jpg)";
            jugador = 1;
            carta++;
            if (veces == 10) {
                veces = 0;
                numero--;
            }
        }
        if (veces == 10) {
            if (carta == 1 && jugador == 1) {
                document.getElementById("cartaPropia1").style.backgroundImage = "url(img/" + arrGlo.cartas[posicion].imagen + ".jpg)";
            }
            if (carta == 2 && jugador == 1) {
                document.getElementById("cartaPropia2").style.backgroundImage = "url(img/" + arrGlo.cartas[posicion].imagen + ".jpg)";
            }
            document.getElementById("carta" + carta + "j" + jugador).style.backgroundImage = "url(img/" + arrGlo.cartas[posicion].imagen + ".jpg)";
            veces = 0;
            jugador++;
            numero--;
            posicion++;
        }
        veces++;
    }, 30);
}

function repartir_mesa() {
    var carta = 1;
    var numero = 7;
    var veces = 1;
    var posicion = 16;
    var diferenciax, diferenciay, ancho, alto;

    var intervalo2 = setInterval(function() {

        var carta_a_donde_mover = document.getElementById("carta" + carta);
        var carta_mover = document.getElementById("mazo" + numero);

        if (carta_mover.style.left == document.getElementById("mazo1").style.left) {
            diferenciay = (Number(carta_mover.offsetLeft) - Number(carta_a_donde_mover.offsetLeft)) / 10;
        }

        var pixely = Number(carta_mover.style.left.split('px')[0]);
        carta_mover.style.left = Number(pixely - diferenciay) + "px";

        if (veces == 10) {
            document.getElementById("carta" + carta).style.backgroundImage = "url(img/" + arrGlo.cartas[posicion].imagen + ".jpg)";
            carta++;
            veces = 0;
            numero--;
            posicion++;
            if (carta == 6) {
                clearInterval(intervalo2);
                document.getElementById("encima-repartir").remove();
            }
        }
        veces++;
    }, 50);
}

function crearUsuario() {
    var fallo = document.getElementById("fallo");
    var texto = "";

    var nombre = document.getElementById("usuarioInput").value;
    var contraseña = document.getElementById("passwordRegistro1").value;
    var contraseñaRep = document.getElementById("passwordRegistro2").value;

    if (contraseña == contraseñaRep) {
        if (contraseña.length >= 4 && nombre.length >= 4) {
            var obj = { "Nombre": nombre, "contraseña": contraseña };
            //añadir(obj, tablas.usuarios);
            texto += "<h3> Usuario creado correctamente </h3>";
            document.getElementById("usuarioInput").innerHTML = "";
        } else {
            texto += "<h3> Tiene que tener minimo 4 caracteres la contraseña y el nombre </h3>";
        }
    } else {
        texto += "<h3> Contraseñas no coinciden </h3>";
    }

    fallo.innerHTML = texto;
    document.getElementById("passwordRegistro1").innerHTML = "";
    document.getElementById("passwordRegistro2").innerHTML = "";
}

function saberValor() {
    var barra = document.getElementById("barra");
    var valor = document.getElementById("valorBarra");

    valor.innerHTML = barra.value;

    barra.oninput = function() {
        valor.innerHTML = this.value;
    }
}

function crearDivs() {
    var contenedor = document.getElementById("contenedorJuego");
    for (var i = 1; i < 9; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "jugador" + " " + "fondo_color_verde" + " " + "displayJugadores");
        div.style.gridArea = "j" + i;
        div.setAttribute("id", "j" + i);
        contenedor.appendChild(div);
        /* ------------------------- */
        var hijo = document.createElement("div");
        hijo.setAttribute("class", "puesto");
        div.appendChild(hijo);
        /* ------------------------- */
        for (let j = 1; j < 3; j++) {
            hijo = document.createElement("div");
            hijo.setAttribute("class", "carta puesto-carta-jugador" + j);
            hijo.setAttribute("id", "carta" + j + "j" + i);
            div.appendChild(hijo);
        }
        /* ------------------------- */
        hijo = document.createElement("div");
        hijo.setAttribute("class", "check hueco-check1");
        div.appendChild(hijo);
        hijo.innerHTML = "<i class='far fa-star fa-lg'></i>";
        /*hijo.innerHTML = "<i class='fas fa-star fa-lg'></i>";*/
        /* ------------------------- */
        hijo = document.createElement("div");
        hijo.setAttribute("class", "check hueco-check2");
        div.appendChild(hijo);
        hijo.innerHTML = "<i class='fas fa-star fa-lg'></i>";
        /*hijo.innerHTML = "<i class='fas fa-star fa-lg'></i>";*/
    }
    var div = document.createElement("div");
    div.setAttribute("class", "mesa");
    contenedor.appendChild(div);
    /* ------------------------- */
    var div2 = document.createElement("div");
    div2.setAttribute("class", "mesaInterior" + " " + "fondo_color_verde");
    div.appendChild(div2);
    /* ------------------------- */
    //for (let i = 1; i < 51; i++) {
    var hijo = document.createElement("div");
    hijo.setAttribute("class", "mazo mazo-reverso");
    hijo.setAttribute("id", "mazo");
    div2.appendChild(hijo);
    for (let i = 1; i < 6; i++) {
        var hijo = document.createElement("div");
        hijo.setAttribute("class", "mazo");
        hijo.setAttribute("id", "carta" + i);
        hijo.style.gridArea = "carta" + i;
        div2.appendChild(hijo);
    }
    /* ------------------------- */
    div = document.createElement("div");
    div.setAttribute("class", "apostar" + " " + "fondo_color_verde");
    contenedor.appendChild(div);
    /* ------------------------- */
    for (var i = 1; i <= 2; i++) {
        var hijo = document.createElement("div");
        hijo.setAttribute("class", "cartaPropia carta-area-" + i);
        hijo.setAttribute("id", "cartaPropia" + i);
        div.appendChild(hijo);
    }
    /* ------------------------- */
    var hijo = document.createElement("div");
    hijo.setAttribute("class", "botonesApuestas");
    div.appendChild(hijo);
    /* ------------------------- */
    var hijo2 = document.createElement("input");
    hijo2.setAttribute("type", "range");
    hijo2.setAttribute("min", "0");
    hijo2.setAttribute("max", "100");
    hijo2.setAttribute("class", "barra");
    hijo2.setAttribute("value", "0");
    hijo2.setAttribute("id", "barra");
    hijo2.setAttribute("onchange", "saberValor()");
    hijo.appendChild(hijo2);
    hijo.innerHTML += "<h3 id='valorBarra'> 0 </h3>";
    /* ------------------------- */
    hijo2 = document.createElement("button");
    hijo2.setAttribute("class", "subir");
    hijo2.setAttribute("id", "subir");
    hijo.appendChild(hijo2);
    hijo2.innerHTML = "Subir";
    /* ------------------------- */
    hijo2 = document.createElement("button");
    hijo2.setAttribute("class", "pasar");
    hijo2.setAttribute("id", "pasar");
    hijo.appendChild(hijo2);
    hijo2.innerHTML = "Pasar";
    /* ------------------------- */
    hijo2 = document.createElement("button");
    hijo2.setAttribute("class", "retiro");
    hijo2.setAttribute("id", "retiro");
    hijo.appendChild(hijo2);
    hijo2.innerHTML = "Retiro";
}