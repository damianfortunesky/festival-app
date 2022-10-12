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

exports.primerTarea = tarea; // primerTarea: identificador // tarea: f(x), no require()

// 3.1 Forma 1: Usamos npx gulp primerTarea para correr, npx puede ejecutar paquetes sin instalarlos globalmente (ventaja)
// 3.2 Forma 2: En packaje.json --> scripts --> "primerTarea": "gulp tarea" --> npm run primerTarea

// ------------------------------------------ COMPILA GULP --------------------------------------------------//

const { src, dest, watch, parallel } = require('gulp');// Es una forma de extraer la dependencia en node_modules 

//CSS
const sass = require('gulp-sass')(require('sass')); // Combina gulp + sass 
const plumber = require('gulp-plumber');            // No detiene la ejecucion del watch al encontrar errores (complemento)

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//Tareas

// OBS: pipe() es un accion que se realiza despues de otra. Ejecuta de izquieda a derecha f(x) en secuencia

// OBS: src("src/scss/**/*.scss") -> /**/* de forma recursiva, identifica los archivos dentro de la carpeta SCSS 

function css( done ) {               
    src("src/scss/**/*.scss")    // 1. Identificar archivo SASS
        .pipe(plumber())
        .pipe( sass())           // 2. Compilarlo 
        .pipe(dest("build/css")); // 3. Almacenar en disco duro, en carpeta build

    done();          
}          

function imagenes( done ) { 
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones))) //Este procesamiento require que la imagen este en cache
        .pipe( dest('build/img'));
    done();
}

function versionWebp( done ) {  // Busca las imagenes y las convierte a webp

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones))
        .pipe( dest('build/img'));
    done();
}

function versionAvif( done ) {  // Busca las imagenes y las convierte a avif

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones))
        .pipe( dest('build/img'));
    done();
}

function javascript( done ){
    src('src/js/**/*.js')
        .pipe( dest('build/js'));

    done();
}

function dev( done ) {
    watch('src/scss/**/*.scss', css); //Utiliza la f(x) = CSS y audita el archivo app.scss
    watch('src/js/**/*.js', javascript);

    done();
}

exports.js = javascript;                                            // Lado derecho asocio f(x) creada
exports.css = css;                                                  // npx gulp css || npm run css 
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev ); //Ejecuta las tareas en simultaneo --> npx gulp dev



// Para utilizar webp con gulp --> npm install --save-dev gulp-webp
// Para aligerar imagenes --> npm i --save-dev gulp-imagemin@7.1.0 y npm i --save-dev gulp-cache
// Para formato img avif --> npm install --save-dev gulp-avif

//npx gulp dev --> watch f(x)CSS

// -----------------------------------------------------------------------------------------------------------//