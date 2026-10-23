let pedidos = [];

let filtroPrecio = null;

const formulario = document.querySelector("#formPedido");
const campoProducto = document.querySelector("#producto");
const campoPrecio = document.querySelector("#precio");
const campoCantidad = document.querySelector("#cantidad");

const campoPrecioMaximo = document.querySelector("#precioMaximo");
const btnFiltrar = document.querySelector("#btnFiltrar");
const btnMostrar = document.querySelector("#btnMostrar");
const btnLimpiar = document.querySelector("#btnLimpiar");

const cuerpoTabla = document.querySelector("#cuerpoTabla");
const totalUnidades = document.querySelector("#totalUnidades");
const montoTotal = document.querySelector("#montoTotal");
const estadoVista = document.querySelector("#estadoVista");

formulario.addEventListener("submit", agregarPedido);
btnFiltrar.addEventListener("click", filtrarProductos);
btnMostrar.addEventListener("click", mostrarTodos);
btnLimpiar.addEventListener("click", limpiarPedidos);

function validarPedido(producto, precio, cantidad) {
    if (producto == "") {
        alert("Ingrese el nombre del producto.");
        return false;
    }

    if (isNaN(precio) || precio <= 0) {
        alert("Ingrese un precio mayor que cero.");
        return false;
    }

    if (
        isNaN(cantidad) ||
        cantidad <= 0 ||
        cantidad % 1 != 0
    ) {
        alert("Ingrese una cantidad entera mayor que cero.");
        return false;
    }

    return true;
}

function agregarPedido(evento) {
    evento.preventDefault();

    const producto = campoProducto.value.trim();
    const precio = parseFloat(campoPrecio.value);
    const cantidad = parseFloat(campoCantidad.value);

    if (validarPedido(producto, precio, cantidad) == false) {
        return;
    }

    const pedido = {
        producto: producto,
        precio: precio,
        cantidad: cantidad
    };

    pedidos.push(pedido);

    formulario.reset();
    actualizarVista();
}

function obtenerPedidosVisibles() {
    if (filtroPrecio == null) {
        return pedidos;
    }

    return pedidos.filter(pedido => pedido.precio <= filtroPrecio);
}

function calcularTotales(lista) {
    const unidades = lista.reduce(
        (acumulado, pedido) => acumulado + pedido.cantidad,
        0
    );

    const monto = lista.reduce(
        (acumulado, pedido) =>
            acumulado + pedido.precio * pedido.cantidad,
        0
    );

    return {
        unidades: unidades,
        monto: monto
    };
}

function mostrarTabla(lista) {
    cuerpoTabla.innerHTML = "";

    if (lista.length == 0) {
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">
                    No hay pedidos para mostrar.
                </td>
            </tr>
        `;
        return;
    }

    const filas = lista.map(pedido => {
        const subtotal = pedido.precio * pedido.cantidad;

        return `
            <tr>
                <td class="nombre-producto"></td>
                <td>$${pedido.precio.toFixed(2)}</td>
                <td>${pedido.cantidad}</td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    cuerpoTabla.innerHTML = filas.join("");

    const nombres = cuerpoTabla.querySelectorAll(".nombre-producto");

    lista.forEach((pedido, indice) => {
        nombres[indice].textContent = pedido.producto;
    });
}

function actualizarVista() {
    const visibles = obtenerPedidosVisibles();
    mostrarTabla(visibles);

    const totales = calcularTotales(pedidos);

    totalUnidades.textContent = totales.unidades;
    montoTotal.textContent = totales.monto.toFixed(2);

    if (filtroPrecio == null) {
        estadoVista.textContent = "Mostrando todos los pedidos.";
    } else {
        estadoVista.textContent =
            `Mostrando productos con precio unitario de hasta $${filtroPrecio.toFixed(2)}.`;
    }
}

function filtrarProductos() {
    const maximo = parseFloat(campoPrecioMaximo.value);

    if (isNaN(maximo) || maximo < 0) {
        alert("Ingrese un precio máximo mayor o igual a cero.");
        return;
    }

    filtroPrecio = maximo;
    actualizarVista();
}

function mostrarTodos() {
    filtroPrecio = null;
    campoPrecioMaximo.value = "";
    actualizarVista();
}

function limpiarPedidos() {
    pedidos = [];
    filtroPrecio = null;

    campoPrecioMaximo.value = "";

    actualizarVista();
}

actualizarVista();
