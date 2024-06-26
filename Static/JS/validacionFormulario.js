const form = document.getElementById('form-register');
const btnEnviar = document.getElementById('btn-send');

const validarFormulario = (e) => {
    e.preventDefault();

    const nombre = document.getElementById('firstname');
    const apellido = document.getElementById('lastname');
    const inputFechaNacimiento = document.getElementById('birthdate');
    const email = document.getElementById('email');
    const selectPais = document.getElementById('country');
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\d{10}$/; // Expresión regular para 10 dígitos exactos   
    const Password = document.getElementById('password');
    const RepetirPassword = document.getElementById('repetir-password');

    //validacion de nombre
    if (nombre.value === "") {
        alert("Por favor, ingresa tu nombre.");
        nombre.focus();
        return false;
    }

    //validacion de apellido
    if (apellido.value === "") {
        alert("Por favor, ingresa tu apellido.");
        apellido.focus();
        return false;
    }
    
    //validacion de fecha de nacimiento
    if (!inputFechaNacimiento.value) {
        alert("Por favor, selecciona una fecha de nacimiento.");
        inputFechaNacimiento.focus();
        return false;
    }

    //validacion de eleccion de pais
    if (selectPais.value === "") {
        alert("Por favor, selecciona un país.");
        selectPais.focus();
        return false;
    }

    //validacion de email
    if (email.value === "") {
        alert("Por favor, ingresa tu correo electrónico.");
        email.focus();
        return false;
    }else if(!emailRegex.test(email.value)){
        alert("Por favor, ingresa tu correo electrónico valido.");
        email.focus();
        return false
    }    

    //validacion de numero de telefono
    if (telefono.value === "") {
        alert("Por favor, ingresa un telefono.");
        telefono.focus();

        return false;
    }else if (!telefonoRegex.test(telefono.value)) {
        alert("Por favor, ingresa un número de teléfono válido (10 dígitos).");
        telefono.focus();
        return false;
    }

    //validacion de contraseña
    if (Password.value === "") {
        alert("Por favor, ingresa una contraseña.");
        telefono.focus();
        return false
    } 
    if (RepetirPassword.value === "") {
        alert("Por favor, repite la contraseña.");
        telefono.focus();
        return false
    }   
    if (Password.value !== RepetirPassword.value) {
        alert("Las contraseñas no coinciden. Por favor, verifica.");
        inputPassword.focus();
        return false;
    }



    function mostrarPopup(event) {
        event.preventDefault(); 
    
        // Mostrar el popup
        const popup = document.getElementById('popup');
        popup.style.display = 'block';
    
        // Vaciar los campos del formulario
        document.getElementById('form-register').reset();
    
        // Cerrar el popup después de 3 segundos
        setTimeout(() => {
            popup.style.display = 'none';
        }, 3000);
    }

    return mostrarPopup(event);
}

btnEnviar.addEventListener('click', validarFormulario);

function mostrarPopup(event) {
    event.preventDefault(); 

    // Mostrar el popup
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    // Vaciar los campos del formulario
    document.getElementById('form-register').reset();

    // Cerrar el popup después de 3 segundos
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}
