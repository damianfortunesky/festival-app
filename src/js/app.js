//galeria-imagenes DOMContentLoaded – el navegador HTML está completamente cargado y el árbol DOM está construido

addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
};

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    
    /*  Como tengo 12 fotos en src/img/thumb, con el for itero 12 veces para crear cada imagen y agregarle su nombre. 
    *
    *   De i = 1 a i = 12 el for itera y le asinga ese ese indice al nombre de la imagen para que coincida con los nombres de las img (1-12)
    */


    for( let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');

        imagen.innerHTML = `
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">              
                <img  loading="lazy" width="200" height="300" src="build/img/${i}.jpg" alt="Imagen galeria">    
            `;

        galeria.appendChild(imagen);  // Agrego al div galeria-imagenes
    }

    
};