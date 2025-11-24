// OBTENER ELEMENTOS DEL DOM
const numeroInput = document.getElementById("numeroInput");
const btnGenerar = document.getElementById("btnGenerar");
const resultados = document.getElementById("resultados");
const alerta = document.getElementById("alerta");

// EVENTOS
btnGenerar.addEventListener("click", generarTabla);
numeroInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") generarTabla();
});

// FUNCIÓN PRINCIPAL: Generar Tabla usando do...while
function generarTabla() {
    const valorRaw = numeroInput.value;
    const numero = Number(valorRaw);

    const esNumero = !Number.isNaN(numero);
    const esEntero = Number.isInteger(numero);
    const dentroRango = numero >= 1 && numero <= 12;

    if (!esNumero || !esEntero || !dentroRango) {
        alerta.textContent = "Por favor, ingresa un número entero entre 1 y 12.";
        alerta.classList.remove("d-none");
        numeroInput.classList.add("is-invalid");
        resultados.innerHTML = "";
        return;
    }

    alerta.classList.add("d-none");
    numeroInput.classList.remove("is-invalid");
    resultados.innerHTML = "";

    // Crear contenedor para la tabla
    const tablaDiv = document.createElement("div");
    tablaDiv.className = "card shadow-lg";

    tablaDiv.innerHTML = `
        <div class="table-header">
            <h4 class="mb-0">Tabla del ${numero}</h4>
        </div>

        <table class="table table-striped mb-0">
            <thead>
                <tr>
                    <th class="text-center">Operación</th>
                    <th class="text-center">Resultado</th>
                </tr>
            </thead>
            <tbody id="tablaContenido"></tbody>
        </table>
    `;

    const tablaContenido = tablaDiv.querySelector("#tablaContenido");

    // CICLO do...while para 1..12
    let i = 1;
    do {
        const resultado = numero * i;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="text-center"><strong>${numero} x ${i} =</strong></td>
            <td class="text-center"><span class="resultado-numero">${resultado}</span></td>
        `;
        tablaContenido.appendChild(fila);

        i++;
    } while (i <= 12);

    // Firma
    const footerRow = document.createElement("div");
    footerRow.className = "p-3 text-end text-muted small";
    footerRow.style.background = "rgba(255,106,0,0.03)";
    footerRow.textContent = "Generado por Janela Reyes — NRC 29314";

    tablaDiv.appendChild(footerRow);
    resultados.appendChild(tablaDiv);
}
