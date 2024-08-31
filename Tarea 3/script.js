class Persona {
    constructor(nombre, edad, intereses) {
        this.nombre = nombre,
        this.edad = edad,
        this.intereses = [intereses]
    }

    addInteres(interes){
        this.intereses.push(` ${interes}`);
        console.log(this.intereses);
    }

    deleteInteres(){
        this.intereses.pop();
        console.log(this.intereses);
    }

    mostrarIntereses(){
        console.log(this.intereses);
    }

    mostrarInformacion(){
        console.log(`Nombre: ${this.nombre}, de ${this.edad} años, disfruta de ${this.intereses}`);
    }
};

let Persona1 = new Persona('Grace Silva', 29, 'Hablar');

console.log(Persona1)
console.log('======================================================')
Persona1.addInteres('Comer');
Persona1.addInteres('Jugar');
console.log('======================================================')
Persona1.deleteInteres();
console.log('======================================================')
Persona1.mostrarInformacion();
