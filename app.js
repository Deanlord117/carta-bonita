document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Configurar Partículas (Polvo de estrellas hacia arriba) ---
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            color: {
                value: ["#ffb7b2", "#e2f0cb", "#ffdac1", "#b5ead7"]
            },
            move: {
                enable: true,
                direction: "top", // Partículas flotando hacia arriba
                outModes: {
                    default: "out"
                },
                speed: 1, // Movimiento lento y suave
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 40 // Cantidad de partículas
            },
            opacity: {
                value: { min: 0.3, max: 0.7 },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1
                }
            },
            shape: {
                type: "square" // Estilo pixel art
            },
            size: {
                value: { min: 2, max: 5 }
            }
        },
        detectRetina: true
    });

    // --- 1. Lógica del Sobre ---
    const envelope = document.getElementById('envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const letterScreen = document.getElementById('letter-screen');

    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.add('open');
            
            setTimeout(() => {
                envelopeScreen.style.transition = 'opacity 0.8s ease';
                envelopeScreen.style.opacity = '0';
                
                setTimeout(() => {
                    envelopeScreen.classList.remove('active');
                    envelopeScreen.classList.add('hidden');
                    
                    letterScreen.classList.remove('hidden');
                    
                    const progressContainer = document.getElementById('progress-container');
                    if (progressContainer) {
                        progressContainer.classList.add('visible');
                        setTimeout(() => progressContainer.classList.add('fade-in'), 100);
                    }

                    initScrollReveal();
                }, 800);
            }, 600);
        });
    }

    // --- 1.5 Lógica de la Barra de Progreso ---
    window.addEventListener('scroll', () => {
        const progressBar = document.getElementById('progress-bar');
        const letterScreen = document.getElementById('letter-screen');
        if (progressBar && !letterScreen.classList.contains('hidden')) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            // Evitar división por cero
            if (height > 0) {
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + "%";
            }
        }
    });

    // --- 2. Lógica de TypeIt y Scroll Reveal ---
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        // Textos reales de la carta
        const typeItData = {
            'typeit-1': "Cada primer día de mes recuerdo aquel día, un día frío en febrero; estaba tan nervioso pero tan emocionado al mismo tiempo, mi corazón latía y en mi mente solo pasaba el pensamiento de cuánto te amaba, y el cómo deseaba con todo mi ser estar a tu lado, y en ese momento, en ese instante que me dijiste que sí, mi vida cambió completamente.",
            'typeit-2': "Hoy ya son 4 meses donde he visto la mujer que eres, donde cada día me demuestras por qué eres el amor de mi vida, donde cada día me despierto y veo en mi celular la foto de la mujer más bella de este mundo, donde cada fin de semana que voy a tener el gusto de pasar mi tiempo junto a ti, que quiero escuchar el sonido de tu voz todo el día, ver tu preciosa sonrisa, y besar tus labios sin parar.",
            'typeit-3': "Han sido solo 4 meses pero siento que es una vida completa juntos, con todas las cosas que hemos vivido, por todo por lo que hemos reído y llorado juntos, por días felices donde compartimos nuestra alegría mutuamente, y todos los otros donde nos consolamos, por cada mensaje de buenos días que mandé sabiendo lo afortunado que soy, y cada mensaje de buenas noches recordándote lo mucho que te amo.",
            'typeit-4': "Y en estos 4 meses, cada segundo me siento agradecido por tener a una novia tan maravillosa, una persona que simplemente es perfecta para mí, una persona con la que siempre soñé y estoy aun más agradecido de ya estar con la persona con la que me voy a casar.",
            'typeit-5': "Escribo esta carta derramando lágrimas, pero no de tristeza, sino de felicidad, porque finalmente entendí por qué decían que uno nunca sabe cuándo llegará el amor de su vida hasta que está con esa persona, y puedo decir muy firmemente que te he encontrado.",
            'typeit-6': "Tú eres el amor de mi vida, Yoselin. Tú y solo tú eres la mejor novia y futura esposa del mundo, y te prometo con mi alma que si tuviera mil vidas, mil y una veces elegiría estar contigo.<br><br>Te amo demasiado, con ternura e incluso devoción, y me esforzaré cada día de mi vida en hacerte la mujer más feliz del mundo. Porque eso es lo que te mereces, amor mío. Muchas gracias por haber nacido."
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    const typeItTarget = entry.target.querySelector('[id^="typeit-"]');
                    if (typeItTarget && !typeItTarget.dataset.typed) {
                        typeItTarget.dataset.typed = "true"; 
                        const textId = typeItTarget.id;
                        const textContent = typeItData[textId];
                        
                        let instance = new TypeIt(`#${textId}`, {
                            speed: 15,
                            waitUntilVisible: false,
                            lifeLike: true,
                            cursor: false
                        }).type(textContent);
                        
                        instance.go();
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px"
        });

        revealElements.forEach(el => observer.observe(el));
    }

});
