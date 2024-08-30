let estudiantes = [];
let editando = false;

// ===================================================================================================================================================

const inputmatricula = document.getElementById('t-matricula');
const inputnombre = document.getElementById('t-nombre');
const inputc1 = document.getElementById('t-c1');
const inputc2 = document.getElementById('t-c2');
const inputc3 = document.getElementById('t-c3');
const inputc4 = document.getElementById('t-c4');

// ===================================================================================================================================================

const tabla = document.getElementById('cuerpotabla');
const modal = document.getElementById('modal');

// ===================================================================================================================================================

const modalButton = document.getElementById('modalbutton');

const agregar = document.getElementById('agregar');
const cancelar = document.getElementById('cancelar');

// ===================================================================================================================================================

var c5 = 0;
var c6 = '';

// ===================================================================================================================================================
//=================================================================INICIAR CADA BOTON=================================================================
// ===================================================================================================================================================

agregar.onclick = Agregar1;
modalButton.onclick = mostrarModal;
cancelar.onclick = cancelarModal;

// ===================================================================================================================================================
//=================================================================AGREGAR A LA TABLA=================================================================
// ===================================================================================================================================================

function Agregar1() {
    if(!inputmatricula.value || !inputnombre.value || !inputc1.value || !inputc2.value || !inputc3.value || !inputc4.value) {
        Swal.fire({
            title: '¡Espere!',
            text: 'Debe llenar todos los campos',
            icon: 'warning'
        });
        return;
    };

// ===================================================================================================================================================

    if(editando === false && estudiantes.some(estudiante => estudiante.matricula === inputmatricula.value)) {
        Swal.fire({
            title: '¡Alto!',
            text: '¡La Matrícula "' + inputmatricula.value + '" ya está en uso!',
            icon: 'warning'
        });
        return;
    };

// ===================================================================================================================================================

    const estudiante = {
        matricula: inputmatricula.value,
        nombre: inputnombre.value,
        c1: inputc1.value,
        c2: inputc2.value,
        c3: inputc3.value,
        c4: inputc4.value,
        c5: c5,
        c6: c6
    };

    c5 = (Number(estudiante.c1) + Number(estudiante.c2) + Number(estudiante.c3) + Number(estudiante.c4)) / 4;
    
    if (c5 <= 60) {
        c6 = 'Reprobado';
    }
    else {
        c6 = 'Aprobado';
    };

    estudiante.c5 = c5;
    estudiante.c6 = c6;

    if (editando !== false) {
        estudiantes[editando] = estudiante;
        editando = false;
        inputmatricula.disabled = false;
        Swal.fire({
            title: '¡Edición completada!',
            text: 'El estudiante "' + inputnombre.value + '" fue editado exitosamente.',
            icon: 'success'
        });
    }else {
        estudiantes.push(estudiante);
        Swal.fire({
            title: '¡Adición completada!',
            text: 'El estudiante "' + inputnombre.value + '" fue añadido exitosamente.',
            icon: 'success'
        });
    };
    clear();
    AgregarFila();
    console.log(c5);
};

// ===================================================================================================================================================
//=================================================================EDITAR EN LA TABLA=================================================================
// ===================================================================================================================================================

tabla.addEventListener('click', (e) => {
    if (e.target.id === 'editar') {
    const indice = e.target.parentNode.parentNode.rowIndex - 1;
    const estudiante = estudiantes[indice];
    AgregarInput(estudiante);
    inputmatricula.disabled = true;
    editando = indice;
    mostrarModal();
    };
});

// ===================================================================================================================================================
//=================================================================BORRAR EN LA TABLA=================================================================
// ===================================================================================================================================================

tabla.addEventListener('click', (e) => {
    if (e.target.id === 'remover' && editando === false) {
        const indice = e.target.parentNode.parentNode.rowIndex - 1;
        const estudiante = estudiantes[indice];
        Swal.fire({
            title:'¡Espera!',
            text: '¿Desea eliminar al estudiante "' + estudiante.nombre + '"? Los cambios no se podrán revertir',
            icon: 'warining',
            showCancelButton: true,
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                estudiantes.splice(indice, 1);
                AgregarFila();
                Swal.fire({
                    title: 'Estudiante eliminado',
                    text: 'El estudiante fue removido de la tabla con éxito.',
                    icon: 'success'
                });
            };
        });
    };
});

// ===================================================================================================================================================
//=================================================================    FUNCIONES.    =================================================================
// ===================================================================================================================================================

function AgregarInput(estudiante) {
    inputmatricula.value = estudiante.matricula
    inputnombre.value = estudiante.nombre
    inputc1.value = estudiante.c1
    inputc2.value = estudiante.c2
    inputc3.value = estudiante.c3
    inputc4.value = estudiante.c4
};

function clear() {
    inputmatricula.value = '';
    inputnombre.value = '';
    inputc1.value = '';
    inputc2.value = '';
    inputc3.value = '';
    inputc4.value = '';
};

function AgregarFila() {
    tabla.innerHTML = ''
    estudiantes.forEach((estudiante, index) => {
        const numeroEstudiante = index + 1;
        tabla.innerHTML += `<tr>
                                <td class=tabledata>${estudiante.matricula}</td>
                                <td class=tabledata>${estudiante.nombre}</td>
                                <td class=tabledata>${estudiante.c1}</td>
                                <td class=tabledata>${estudiante.c2}</td>
                                <td class=tabledata>${estudiante.c3}</td>
                                <td class=tabledata>${estudiante.c4}</td>
                                <td class=tabledata>${estudiante.c5}</td>
                                <td class=tabledata>${estudiante.c6}</td>
                                <td class=tabledata><input id="editar" class="btn btn-warning" type="button" value="🖋"><input id="remover" class="btn" type="button" value="❌"></td>
                            </tr>`;
    });
    clear();
    ocultarModal();
};

function mostrarModal() {
        modal.style.display = "block";
};

function ocultarModal() {
        modal.style.display = "none";
};

function cancelarModal() {
    clear();
    ocultarModal();
    inputmatricula.disabled = false;
    editando = false;
};
