// ============================================
// NAVEGACIÓN Y SCROLL SUAVE
// ============================================
document.addEventListener('DOMContentLoaded', function() {

    // Scroll suave para enlaces ancla
    const enlacesAncla = document.querySelectorAll('a[href^="#"]');
    enlacesAncla.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const destino = document.querySelector(href);
                if (destino) {
                    destino.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Resaltar enlace activo al hacer scroll
    const secciones = document.querySelectorAll('section[id]');
    const enlacesNav = document.querySelectorAll('.enlaces-nav a');

    function resaltarNavAlScroll() {
        const scrollY = window.pageYOffset;

        secciones.forEach(seccion => {
            const alturaSeccion = seccion.offsetHeight;
            const topSeccion = seccion.offsetTop - 100;
            const idSeccion = seccion.getAttribute('id');

            if (scrollY > topSeccion && scrollY <= topSeccion + alturaSeccion) {
                enlacesNav.forEach(enlace => {
                    enlace.classList.remove('activo');
                    if (enlace.getAttribute('href') === `#${idSeccion}`) {
                        enlace.classList.add('activo');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', resaltarNavAlScroll);

    // ============================================
    // BÚSQUEDA
    // ============================================
    const inputsBusqueda = document.querySelectorAll('.caja-busqueda input');
    inputsBusqueda.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const termino = this.value.trim();
                if (termino) {
                    console.log('Buscando:', termino);
                    // Aquí puedes agregar la lógica de búsqueda
                }
            }
        });
    });

    // ============================================
    // CATÁLOGO - FILTRO POR CATEGORÍA
    // ============================================
    const itemsCategorias = document.querySelectorAll('.item-categoria');
    itemsCategorias.forEach(item => {
        item.addEventListener('click', function() {
            itemsCategorias.forEach(cat => cat.classList.remove('activo'));
            this.classList.add('activo');

            const nombreCategoria = this.querySelector('span').textContent;
            console.log('Categoría seleccionada:', nombreCategoria);
            // Aquí puedes agregar la lógica para filtrar productos por categoría
        });
    });

    // ============================================
    // CATÁLOGO - ALTERNAR VISTA (CUADRÍCULA / LISTA)
    // ============================================
    const botonesVista = document.querySelectorAll('.boton-vista');
    const cuadriculaProductos = document.querySelector('.cuadricula-productos');

    botonesVista.forEach((boton, indice) => {
        boton.addEventListener('click', function() {
            botonesVista.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');

            if (cuadriculaProductos) {
                if (indice === 0) {
                    // Vista cuadrícula
                    cuadriculaProductos.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
                } else {
                    // Vista lista
                    cuadriculaProductos.style.gridTemplateColumns = '1fr';
                }
            }
        });
    });

    // ============================================
    // CATÁLOGO - AGREGAR AL CARRITO
    // ============================================
    const botonesAgregarCarrito = document.querySelectorAll('.boton-agregar-carrito');
    const insigniaCarrito = document.querySelector('.insignia-carrito');
    let contadorCarrito = parseInt(insigniaCarrito?.textContent || '0');

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Efecto de animación
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            // Actualizar contador del carrito
            contadorCarrito++;
            if (insigniaCarrito) {
                insigniaCarrito.textContent = contadorCarrito;
            }

            // Obtener info del producto
            const tarjetaProducto = this.closest('.tarjeta-producto-catalogo');
            const nombreProducto = tarjetaProducto?.querySelector('.nombre-producto')?.textContent;
            const precioProducto = tarjetaProducto?.querySelector('.precio-producto')?.textContent;

            console.log('Agregado al carrito:', {
                nombre: nombreProducto,
                precio: precioProducto
            });

            mostrarNotificacion('Producto agregado al carrito');
        });
    });

    // ============================================
    // CATÁLOGO - SELECTOR DE ORDEN
    // ============================================
    const selectorOrdenar = document.querySelector('.selector-ordenar');
    if (selectorOrdenar) {
        selectorOrdenar.addEventListener('change', function() {
            const valorOrden = this.value;
            console.log('Ordenar por:', valorOrden);
            // Aquí puedes agregar la lógica para ordenar productos
        });
    }

    // ============================================
    // FORMULARIO DE CONTACTO
    // ============================================
    const formularioContacto = document.getElementById('formularioContacto');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const modelo = document.getElementById('modelo').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            // Validación
            if (!nombre || !whatsapp || !mensaje) {
                mostrarNotificacion('Por favor completa todos los campos requeridos', 'error');
                return;
            }

            // Validación de teléfono
            const regexTelefono = /^[\d\s\+\-\(\)]+$/;
            if (!regexTelefono.test(whatsapp)) {
                mostrarNotificacion('Por favor ingresa un número de teléfono válido', 'error');
                return;
            }

            // Crear mensaje de WhatsApp
            const mensajeWhatsApp = `Hola! Mi nombre es ${nombre}.\n\n` +
                `Mi número: ${whatsapp}\n` +
                (modelo ? `Modelo de moto: ${modelo}\n\n` : '\n') +
                `Mensaje: ${mensaje}`;

            const numeroWhatsApp = '573128774844';
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

            console.log('Formulario enviado:', { nombre, whatsapp, modelo, mensaje });

            mostrarNotificacion('¡Mensaje enviado correctamente!', 'exito');

            // Abrir WhatsApp
            window.open(urlWhatsApp, '_blank');

            // Resetear formulario
            formularioContacto.reset();
        });
    }

    // ============================================
    // FORMULARIO DE BOLETÍN (NEWSLETTER)
    // ============================================
    const formulariosBoletin = document.querySelectorAll('.formulario-boletin');
    formulariosBoletin.forEach(formulario => {
        const botonBoletin = formulario.querySelector('.boton-boletin');
        if (botonBoletin) {
            botonBoletin.addEventListener('click', function(e) {
                e.preventDefault();
                const inputEmail = formulario.querySelector('.input-boletin');
                const email = inputEmail.value.trim();

                if (validarEmail(email)) {
                    console.log('Suscrito al boletín:', email);
                    mostrarNotificacion('¡Gracias por suscribirte!', 'exito');
                    inputEmail.value = '';
                } else {
                    mostrarNotificacion('Por favor ingresa un email válido', 'error');
                }
            });
        }
    });

    // ============================================
    // PAGINACIÓN
    // ============================================
    const botonesPagina = document.querySelectorAll('.boton-pagina');
    botonesPagina.forEach(boton => {
        boton.addEventListener('click', function() {
            if (!this.classList.contains('activo')) {
                botonesPagina.forEach(b => b.classList.remove('activo'));
                this.classList.add('activo');

                // Scroll al inicio del catálogo
                const principalCatalogo = document.querySelector('.principal-catalogo');
                if (principalCatalogo) {
                    principalCatalogo.scrollIntoView({ behavior: 'smooth' });
                }

                const numeroPagina = this.textContent.trim();
                console.log('Página:', numeroPagina);
                // Aquí puedes agregar la lógica para cargar productos de la página seleccionada
            }
        });
    });

    // ============================================
    // EFECTO HOVER EN TARJETAS DE PRODUCTO
    // ============================================
    const tarjetasProducto = document.querySelectorAll('.tarjeta-producto-catalogo');
    tarjetasProducto.forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', function() {
            const img = this.querySelector('.imagen-producto');
            if (img) {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease';
            }
        });

        tarjeta.addEventListener('mouseleave', function() {
            const img = this.querySelector('.imagen-producto');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // ============================================
    // FUNCIONES UTILITARIAS
    // ============================================
    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    function mostrarNotificacion(mensaje, tipo = 'exito') {
        // Eliminar notificaciones existentes
        const notificacionExistente = document.querySelector('.notificacion');
        if (notificacionExistente) {
            notificacionExistente.remove();
        }

        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        notificacion.textContent = mensaje;

        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${tipo === 'exito' ? '#DC2626' : '#EF4444'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            animation: deslizarEntrada 0.3s ease;
        `;

        document.body.appendChild(notificacion);

        // Eliminar después de 3 segundos
        setTimeout(() => {
            notificacion.style.animation = 'deslizarSalida 0.3s ease';
            setTimeout(() => {
                notificacion.remove();
            }, 300);
        }, 3000);
    }

    // ============================================
    // ANIMACIONES AL HACER SCROLL
    // ============================================
    const opcionesObservador = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, opcionesObservador);

    // Observar tarjetas de características y productos
    const elementosAnimados = document.querySelectorAll('.tarjeta-caracteristica, .tarjeta-producto-catalogo');
    elementosAnimados.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observador.observe(el);
    });

});

// ============================================
// ANIMACIONES CSS
// ============================================
const estilos = document.createElement('style');
estilos.textContent = `
    @keyframes deslizarEntrada {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes deslizarSalida {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes aparecer {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .imagen-producto {
        transition: transform 0.3s ease;
    }

    .notificacion {
        animation: deslizarEntrada 0.3s ease;
    }
`;
document.head.appendChild(estilos);