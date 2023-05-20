// Obteniendo los botones de la calculadora
const btns = document.querySelectorAll(".btn");
const display = document.getElementById("result");

// Variables para almacenar los valores y la operación actual
let currentVal = "";
let previusValue = "";
let operation = '';
let float = false;
let nRoot = false;
newInput = false;

function getResult(a, op, b = "") {
    a = Number(a);
    b = Number(b);

    switch (op) {
        case "+":
            return a + b;
            break;
        case "-":
            return a - b;
            break;
        case "*":
            return a * b;
            break;
        case "/":
            return a / b;
            break;
        case "**":
            return a ** b;
            break;
        case "**2":
            return a ** 2;
            break;
        case "**0.5":
            return a ** 0.5;
            break;
        case "**1/n":
            return a ** (1 / b);
            break;
        case "1/x":
            return 1 / a;
            break
    }
}
// Agregando un escuchador de eventos de click a cada botón
btns.forEach((btn) => {
    btn.addEventListener("mousedown", () => {
            
        const btnValue = btn.getAttribute("alt");
        btn.style.borderWidth = '5px';
        btn.style.transform = 'scale(1)';

        // Si el botón es un número o un punto, agregarlo al valor actual
        if (btnValue === "." && float === false) {
            if (newInput === true) {
                display.value = "";
                newInput = false;
            }
            float = true;
            if (currentVal === "") {
                currentVal = "0."
                display.value = currentVal;
            }
            else {
                currentVal += ".";
                display.value = currentVal;
            }
        }
        else if (!isNaN(btnValue)) {
            if (newInput === true) {
                display.value = "";
                newInput = false;
                currentVal = btnValue;
            }
            else {
                currentVal += btnValue;
            }
            display.value = currentVal;
        }

        else if (["+", "-", "*", "/", "**", "**1/n"].includes(btnValue)) {
            float = false;
            newInput = true;
            if (!operation) {
                previusValue = currentVal;
                operation = btnValue;
            }
            else {
                previusValue = getResult(previusValue, operation, currentVal);
                operation = btnValue;
                display.value = previusValue;
                currentVal = "";
            }
        }
        else if (["1/x", "**2", "**0.5"].includes(btnValue)) {
            float = false;
            newInput = true;
            if (operation && currentVal) {
                currentVal = getResult(previusValue, operation, currentVal);
            }
            currentVal = getResult(currentVal, btnValue)
            previusValue = "";
            display.value = currentVal;

        }

        // Si el botón es "=", realizar la operación almacenada y mostrar el resultado
        else if (btnValue === "=") {
            float = false;
            newInput = true;
            if (previusValue && currentVal && operation) {
                currentVal = getResult(previusValue, operation, currentVal);
                display.value = currentVal
                previusValue = "";
            }
            operation = "";
        }
        else if (btnValue === "+/-") {
            currentVal = -currentVal;
            display.value = currentVal;
        }

        else if (btnValue === "c") {
            currentVal = "";
            previusValue = "";
            operation = "";
            display.value = "0";
        }
        else if (btnValue === "off") {
            currentVal = "";
            previusValue = "";
            operation = "";
            display.value = "";
        }
    });
    btn.addEventListener("mouseup", () =>{
        btn.style.boxShadow = '';
        btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = ''; // Eliminar la transformación si el cursor sale del botón sin soltarlo
        btn.style.boxShadow = ''; // Eliminar la sombra si el cursor sale del botón sin soltarlo
    });
});