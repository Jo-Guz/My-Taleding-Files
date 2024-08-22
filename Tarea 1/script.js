const dropdown = document.getElementById('dropdown');
const calcular = document.getElementById('btn');
const numero = document.querySelector("#numero");
const label = document.querySelector("#label");
let temperatura1 = 0;
let temperatura2 = 0;

//Declarar partes de las fórmulas.

function convertir() {
    var num = Number(numero.value);
    if (dropdown.value === "celcius") {
        convCelcius(num);
    }
    else if (dropdown.value === "kelvin") {
        convKelvin(num)
    }
    else if (dropdown.value === "fahrenheit") {
        convFahrenheit(num)
    }
}

function convCelcius(num) {
    temperatura1 = num + 273.15;
    temperatura2 = (num * 9/5) + 32;
    label.innerText = "Mediciones: K°: " + temperatura1 + "; F°: " + temperatura2 + ".";
}

function convKelvin(num) {
    temperatura1 = num - 273.15;
    temperatura2 = (num - 273.15) * 9/5 + 32
    label.innerText = "Mediciones: C°: " + temperatura1 + "; F°: " + temperatura2 + "."
}

function convFahrenheit(num) {
    temperatura1 = (num - 32) * 5/9;
    temperatura2 = (num - 32) * 5/9 + 273.15;
    label.innerText = "Mediciones: C°: " + temperatura1 + "; K°: " + temperatura2 + "."
}

calcular.addEventListener("click", convertir);
