// 1.Cada tarea creada con Gulp se va a definir por medio de una funcion de JS
// 2.Necesitamos NodeJS para que funcione, por lo tanto, usamos export + identificador, asi se llama a la f(x)

/*  CALLBACKS
*   Los callbacks aseguran que una función no se va a ejecutar antes de que se complete una tarea, sino que se ejecutará
*   justo después de que la tarea se haya completado. Nos ayuda a desarrollar código JavaScript asíncrono y nos mantiene
*   a salvo de problemas y errores.
*/

function tarea(done) {
    console.log('Mi primer tarea');


    done(); // Las f(x) utilizan callback para indicar que la tarea termino. 
}

exports.primerTarea = tarea; // primerTarea: identificador // tarea: f(x), no requiere()

// 3.1 Forma 1: Usamos npx gulp primerTarea para correr, npx puede ejecutar paquetes sin instalarlos globalmente (ventaja)
// 3.2 Forma 2: En packaje.json --> scripts --> "primerTarea": "gulp tarea" --> npm run primerTarea

// ------------------------------------------ COMPILA SASS --------------------------------------------------//
//GULP
const {src, dest, watch, parallel} = require("gulp"); // Es una forma de extraer la dependencia en node_modules 
//CSS
const sass = require("gulp-sass")(require('sass')); // Combina gulp + sass 
const plumber = requiere('gulp-plumber');// No detiene la ejecucion del watch al encontrar errores (complemento)
//IMAGENES
const webp = requiere('gulp-webp');

function css(done) {               
    // OBS: pipe() es un accion que se realiza despues de otra. Ejecuta de izquieda a derecha f(x) en secuencia

    src("src/scss/**/*.scss")     // 1. Identificar archivo SASS
        .pipe(plumber())
        .pipe( sass())           // 2. Compilarlo 
        .pipe(dest("build/css")) // 3. Almacenar en disco duro, en carpeta build

    done();          
}          // OBS: src("src/scss/**/*.scss") -> /**/* de forma recursiva, identifica los archivos dentro de la carpeta SCSS 

function versionWebp ( done ) {

    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}') // Busca las imagenes y las convierte a webp
    pipe( webp(opciones) )
    done( dest('build/img'));
}




function dev(done) {
    watch("src/scss/**/*.scss", css) //Utiliza la f(x) = CSS y audita el archivo app.scss

    done();
}

exports.css = css; // npx gulp css || npm run css
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev); //Ejecuta las tareas en simultaneo 



// Para utilizar webp con gulp --> npm install --save-dev gulp-webp


// -----------------------------------------------------------------------------------------------------------//