/*
  ================================================================
                 ARCHIVO EDITABLE PARA BORIS
  ================================================================
  1. FOTOS: copia tus JPG/PNG/WEBP en la carpeta imagenes/.
     Edita solo el campo foto: 'imagenes/archivo.jpg'.
     Si falta el archivo se mostrará UNA tarjeta discreta por foto.
  2. TEXTOS: modifica las propiedades texto o carta al final.
  3. MÚSICA: cada escena tiene su canción fija por "musica: 'id'".
     Puedes cambiarla por otro id de la lista canciones.
  4. FALTA COMPLETAR: se mantiene en comentarios para ti;
     NO aparece como mensaje técnico dirigido a Leandra.
  5. SOLO FOTOS: no hay archivos ni reproductores de video personal.
  6. Las respuestas se conservan mientras juegas y vuelves a un capítulo.
     Al actualizar o cerrar la página se borran. NO se usa localStorage.

  IMPORTANTE: GitHub Pages es público. La contraseña es decorativa,
  no impide acceder a fotografías y textos publicados.
  ================================================================
*/
window.UNIVERSO = {
  nombre: 'Un universo para Leandra',
  clave: '031125',
  inicio: {
    titulo: 'Hola, mi niñita ♡',
    subtitulo: 'Hay historias que empiezan sin que uno se dé cuenta. Esta es la nuestra. ✨',
    dedicatoria: 'Para ti, que llegaste y cambiaste mi mundo entero.'
  },
  // Una lista compartida establece el mismo orden en Spotify y YouTube.
  canciones: [
    {id:'creep',nombre:'Creep',artista:'Radiohead',spotify:'70LcF31zb1H0PyJoS1Sx1r',youtube:'XFkzRNyygfk'},
    {id:'ritmo',nombre:'El Ritmo de Mi Corazón',artista:'Grupo 5',spotify:'3SQRqRJ4xl2FZ8B5eswvvU',youtube:'o1HSd7QldRs'},
    {id:'delator',nombre:'Corazón Delator',artista:'Soda Stereo',spotify:'4L3TjNmQXBLC4zmqGCW5eM',youtube:'tX1nCmFUaVM'},
    {id:'tuyyo',nombre:'Tú y Yo',artista:'La Misma Gente',spotify:'17LdmV5cIcTvxB0O18tD2Z',youtube:'pf7_auXRrYE'},
    {id:'brillas',nombre:'Brillas',artista:'León Larregui',spotify:'0SRddBTphQwQcfqw4Br1uX',youtube:'Mcj75l2gJcY'},
    {id:'motor',nombre:'Motor y Motivo',artista:'Grupo 5',spotify:'2yjHvbMtfyoXXJYpsR3rYP',youtube:'w_LWtxTDr44'},
    {id:'bonitademas',nombre:'Bonita de Más',artista:'Erreway',spotify:'5flsxti4z1h20X9hW6Ee7c',youtube:'n2Uj-fXZeAQ'},
    {id:'elvis',nombre:"Can't Help Falling in Love",artista:'Elvis Presley',spotify:'44AyOl4qVkzS48vBsbNXaC',youtube:'eTKeQhYVvbQ'},
    {id:'eres',nombre:'Eres',artista:'Café Tacvba',spotify:'6kdCN6gTWLcLxmLXoUcwuI',youtube:'98Akpf1ph2o'},
    {id:'enamore',nombre:'Me Enamoré de Ti, y Qué',artista:'Grupo 5',spotify:'74YyaEKsvXvCUUoL635zlN',youtube:'1NdS5LxkzFw'},
    {id:'beatles',nombre:'Here, There and Everywhere',artista:'The Beatles',spotify:'2B4Y9u4ERAFiMo13XPJyGP',youtube:'FusIKjztap8'},
    {id:'nota',nombre:'Nota de Amor',artista:'Wisin, Carlos Vives y Daddy Yankee',spotify:'4YW2Fr25fHwUt6qgvM1iE1',youtube:'wZRWpr1G1Qw'},
    {id:'porfa',nombre:'Porfa no te vayas',artista:'Beret y Morat',spotify:'4J2HLNTxiVxxs6kWgTIN43',youtube:'zMvWTnVlYww'},
    {id:'poeta',nombre:'El Poeta',artista:'Chino & Nacho',spotify:'2RpIevYYdiQJrQtaILchnG',youtube:'NudmLhxEx_s'},
    {id:'paris',nombre:'Paris in the Rain',artista:'Lauv',spotify:'2WdAV1VqmllcEznKlVOFxG',youtube:'JZELmUooBlY'},
    {id:'sanctuary',nombre:'Sanctuary',artista:'Joji',spotify:'4VQH4VluDUOsOuDxccTeyN',youtube:'rsC6wVdiqWA'},
    {id:'vago',nombre:'Amor de Vago',artista:'La T y La M con Malandro',spotify:'5MKbWaXeSQSmzmo7gPQha1',youtube:'wRPCDOFebHQ'},
    {id:'binge',nombre:'To Binge',artista:'Gorillaz feat. Little Dragon',spotify:'1dvOwoHwZB9SwvRw2Gv3nz',youtube:'sY20vr7-MpM'},
    // FALTA COMPLETAR (opcional): confirmar artista de Mi Bonita.
    {id:'mibonita',nombre:'Mi Bonita',artista:'',spotify:'4u5xLMRN0dgKBFFN8FiNgv',youtube:'Oe1fRwgGu5E'}
  ],
  rutas: [
    {id:'recuerdos',icono:'📸',titulo:'El camino de los recuerdos',descripcion:'Volvamos a esas primeras veces.',inicio:'Cada recuerdo tiene una puerta. Esta es la de nuestros primeros momentos.',escenas:['comienzo','fisica','cine','regalos','ancon']},
    {id:'detalles',icono:'🌸',titulo:'El camino de los detalles',descripcion:'Descubramos las pequeñas cosas.',inicio:'Hay cositas pequeñitas que para mí significan muchísimo.',escenas:['cositas','cariños','corazon']},
    {id:'suenos',icono:'🌙',titulo:'El camino de los sueños',descripcion:'Imaginemos todo lo que viene.',inicio:'Hay tanto que todavía me ilusiona compartir contigo.',escenas:['futuro','metas','siempre']}
  ],
  escenas: [
    {
      id:'comienzo',icono:'✦',titulo:'El comienzo',subtitulo:'Antes de que todo cambiara',
      texto:[
        'Al principio yo pensaba que me reclamabas por distraído y hablador en el colegio, JAJA. Y luego empezaste a hablarme. Sin que te dieras cuenta, cambiaste mi mundo entero.'
      ],
      foto:'imagenes/inicio.jpg', // FALTA COMPLETAR: fotografía del comienzo.
      musica:'brillas',
      pregunta:{tipo:'abierta',titulo:'¿Qué fue lo primero que pensaste de mí?'}
    },
    {
      id:'fisica',icono:'⚡',titulo:'La clase de Física',subtitulo:'Un día que no olvido',
      texto:[
        'Ti me acuerdo de la clase de Física, octubre de 2024, cuando me pediste ayuda para tener la nota de participación. Recuerdo que me sorprendió que me escribieras, porque según yo, te caía mal, pero fue de lo mejor que me pudo pasar.',
        'Ahí fue cuando molestamos al profesor de psicología con el pitido. Recuerdo que me dio risa cómo tú estabas de miedo de que te reclamaran o que nos llevaran a dirección. Yo no tenía miedo; bueno, no me importaba mucho si nos reclamaban. Solo sé que me la estaba pasando bien contigo, me reí mucho ese día.',
        'Fue uno de los muchos momentos en que, sin darte cuenta, cambiaste totalmente mi estado de ánimo y la forma en cómo me sentía. Aunque no lo creas, o no siempre lo notes, siempre encuentras una forma de hacerme el hombre más feliz.'
      ],
      foto:null, // Esta escena NO lleva fotografía por pedido de Boris.
      musica:'creep',
      pregunta:{tipo:'opcion',titulo:'¿Qué utilizábamos para hacer aquel pitido?',opciones:['Meet Plus','Una alarma','Un videojuego'],correcta:0,pista:'Jummm, piensa en el Meet 👀'}
    },
    {
      id:'cine',icono:'🎬',titulo:'Nuestra primera salida',subtitulo:'Una película y una pizza',
      texto:[
        'Fuimos al cine a ver «Siempre nos quedará mañana». Estaba subtitulada y a veces no entendíamos bien, pero igual la pasamos muy bien. Recuerdo que los dos íbamos intentando entenderla poco a poco.',
        'También te llevé a comer en Little Caesars. No habías ido antes ahí, y aunque no te gustaba mucho la pizza, recuerdo que ahí comiste bastante y me dijiste que sí te había gustado, JAJA.'
      ],
      foto:'imagenes/cine.jpg', // FALTA COMPLETAR: fotografía del cine o de la salida.
      musica:'eres',
      pregunta:{tipo:'opcion',titulo:'¿De qué país era la película que vimos?',opciones:['Italia','Francia','España'],correcta:0,pista:'Una pista: se titulaba «C’è ancora domani» 🎬'}
    },
    {
      id:'regalos',icono:'🎁',titulo:'Un regalo muy especial',subtitulo:'Los pequeños grandes detalles',
      texto:[
        'El primer regalo que me diste fue el Funko en el intercambio de regalos por el colegio. Me lo diste en tu casa, ahí fue la reunión. Me gustó mucho tu regalo, porque a mí me gusta mucho Marvel, y el Funko Pop era de Avengers, con Spiderman usando el guantelete de Thanos.',
        'Recuerdo también la historia del regalo, porque en el colegio me preguntabas mucho qué me gustaría y qué no. Ahí empecé a sospechar si tú eras la que me daría el regalo. Al final sí fuiste túu, mi niñitaaa.'
      ],
      foto:'imagenes/regalos.jpg', // FALTA COMPLETAR: esta foto SOLO aparece tras acertar.
      fotoTrasAcierto:true,
      musica:'beatles',
      pregunta:{tipo:'opcion',titulo:'¿Qué te regalé cuando estábamos en el colegio?',opciones:['Dos barquitos de papel','Un peluche','Un dibujo'],correcta:0,pista:'Pista: eran dos cositas hechas de papel ⛵'}
    },
    {
      id:'ancon',icono:'🌊',titulo:'Un recuerdo en Ancón',subtitulo:'Un lugar que guardo conmigo',
      texto:[
        'Uno de los lugares que también guardo con mucho cariño es Ancón, cuando fuimos por tu cumpleaños. Es un recuerdo muy especial que tengo contigo. Estuvimos mucho tiempo juntos, mucho tiempo riéndonos, jugando, hablando y siendo felices. Verte feliz es lo que más me alegra.',
        'Nadábamos en la piscina, en la playa, íbamos a los juegos y paseábamos por la plaza.',
        'Ahí también hay un recuerdo que nunca olvidaré. Fue en la piscina, estábamos ya por salir, y tú me paraste. Nos apartamos un poco y me dijiste algo; al inicio no te escuché bien, y me dijiste que ya luego, pero te paré y te pregunté qué era. Me dijiste que querías besarme, te dije que nos hundamos en el agua, cerraste los ojos y te besé. Fue nuestro primer beso, un beso bajo el agua, un beso contigo que jamás olvidaré.'
      ],
      foto:'imagenes/ancon.jpg', // FALTA COMPLETAR: foto de Ancón.
      musica:'sanctuary',
      pregunta:{tipo:'abierta',titulo:'¿Qué lugar de nuestra historia recuerdas con más cariño?'}
    },
    {
      id:'cositas',icono:'🍓',titulo:'Tus cositas favoritas',subtitulo:'El camino de los detalles',
      texto:[
        'Me gusta consentirte con las cositas que te gustan y compartirlas juntos, como cuando vamos a comer crepas, o cuando te compro tu jugo de naranja. Incluso cuando fuimos a comer makis por primera vez, aunque no me gusten mucho, JAJA. Las fresas con crema y los cuchareables que ahora tanto te gustan.'
      ],
      foto:'imagenes/cositas.jpg', // FALTA COMPLETAR: foto de comida o un detalle.
      musica:'mibonita',
      pregunta:{tipo:'abierta',titulo:'¿Qué es lo que más disfrutas hacer conmigo?'}
    },
    {
      id:'cariños',icono:'🧸',titulo:'Nuestros detalles',subtitulo:'Todo eso que hacemos nuestro',
      // FALTA COMPLETAR: si quieres añadir un relato propio de la vaquita, la ovejita o los besitos.
      texto:[
        'Me gusta darte las cositas que te hacen feliz: nuestros hijitos, la vaquita y la ovejita, las flores, consentirte muchooo y darte muchos besitos mua mua muaaaaaaa.',
        'No sabes cuánto quisiera poder hacerte feliz siempre.'
      ],
      foto:'imagenes/carinos.jpg', // FALTA COMPLETAR: foto de la vaquita y la ovejita.
      musica:'bonitademas',
      pregunta:{tipo:'abierta',titulo:'¿Cuál dirías que ha sido el mejor regalo que te he dado?'},
      // Esta sorpresa aparece DESPUÉS de que Leandra responda, sin calificar su respuesta.
      respuestaSorpresa:[
        'Yo me acuerdo de aquella vez en tu cumpleaños, cuando me dijiste que te habías sentido muy consentida.',
        'No sabes cuánto me alegró escucharlo, mi niñita hermosa.'
      ]
    },
    {
      id:'corazon',icono:'💗',titulo:'Lo que significas para mí',subtitulo:'Tú y yo',
      texto:[
        'Te amo muchísimo, chimena. Te amo ayer, te amo mañana, te amo siempre. Lo nuestro es algo muy especial, algo muy lindo y sincero. Es nuestro, es nuestra historia, es algo de los dos que nadie nos podrá quitar. Tenemos algo que nadie podrá romper ni separar, somos uno, somos tú y yooo. Recuérdalo siempre, ¿sí? Estoy para ti y tú estás para mí.',
        'Sé que te lo digo mil veces, pero te amo, te amo, te amo. Te amo con locura, te amo por completo y quiero que nunca, nunca te vayas, porque sin ti no tengo camino. Tú eres mi guía, mi camino, mi lugar, mi meta. Tener todo contigo, renatitos chiquititos y chimenitas chiquitas, y ser felices, hacerte feliz, hacerte muy feliz es lo que tanto quisiera.'
      ],
      foto:'imagenes/corazon.jpg', // FALTA COMPLETAR: foto especial.
      musica:'elvis',
      pregunta:{tipo:'amor',titulo:'¿Me amas, amorcito?'}
    },
    {
      id:'futuro',icono:'🌙',titulo:'Nuestros sueños',subtitulo:'Lo que todavía viene',
      // FALTA COMPLETAR: si quieres añadir una dedicatoria propia para este capítulo.
      texto:[
        'Quiero pasar contigo todo lo que venga, seguir enamorándome cada día más de ti y cumplir todo lo que nos proponemos juntos.'
      ],
      foto:'imagenes/suenos.jpg', // FALTA COMPLETAR: foto del futuro o de un recuerdo.
      musica:'paris',
      pregunta:{tipo:'abierta',titulo:'¿Qué lugar te gustaría conocer conmigo?'}
    },
    {
      id:'metas',icono:'✈️',titulo:'Nuestros planes',subtitulo:'Cosas que soñamos juntos',
      texto:[
        'Tener nuestros hijitos, nuestra casa, nuestros perritos; que tú seas una gran piloto y yo tu ingeniero que estará acompañándote.',
        'Viajar y conocer el mundo, llevarte hasta la luna y enseñarte que mi amor llega hasta el infinito.'
      ],
      foto:'imagenes/planes.jpg', // FALTA COMPLETAR: foto para los planes.
      musica:'tuyyo',
      pregunta:{tipo:'abierta',titulo:'¿Qué actividad nueva te gustaría que hiciéramos juntos?'}
    },
    {
      id:'siempre',icono:'✨',titulo:'Donde tú vayas',subtitulo:'Una promesa para los dos',
      texto:[
        'Te amo, chimena. Te amo por siempre, nunca lo olvides. Nunca te olvides que sí te amo de verdad, que lo que siento es completamente sincero y que nadie nos quitará eso. Adonde tú vas, yo voy.'
      ],
      foto:null, // FALTA COMPLETAR: si quieres añadir un texto más aquí, sin foto.
      musica:'porfa',
      pregunta:{tipo:'abierta',titulo:'Si pudiéramos cumplir un sueño juntos, ¿cuál elegirías?'}
    }
  ],
  // Esta carta NO se resume ni se reordena. Solo se separa en párrafos
  // y se aplican las correcciones ortográficas aprobadas por Boris.
  carta: [
    `Mi amor, desde el inicio cambiaste mi mundo entero, incluso sin que me diera cuenta, cambió cómo era. Al inicio en el colegio fui estando más tranquilo, si a alguien le hacía caso, era a ti, hasta ahora AJAJ. Siempre contigo me he sentido amado, más tranquilo conmigo mismo y contigo también, me has demostrado siempre lo mucho que te importo y la manera tan linda en cómo me amas, te juro que no hay nadie como tú mi amor, llegaste a mi vida para darme amor y hacerme el más feliz del mundo, y aunque muchas veces no lo tienes muy en cuenta, o no sepas lo mucho que significó para mí, pero, el que siempre me has incluido, el que me has demostrado que me quieres, que me amas, o que te importo, es algo muy importante e impactante, en el buen sentido, para mí, porque siempre me ha gustado cómo desde el primer día que empezamos a hablar o que nos conocimos más, siempre me incluyeras en todo, en tus planes, en tus cosas, en lo que hacías, siempre me gustó que lo que sientas sea así de sincero.`,
    `Tengo mucho miedo de que algún día se acabe, porque yo sé lo estresante que soy como tú alguna vez lo dijiste, a veces te harto y te canso, y espero con todo mi corazón, que nunca pero nunca llegue a ser tan suficiente para que no quieras seguir. Pero ahora eres mi niñita, eres mi princesa mi reina, y me encanta consentirte y hacerte sentir especial, no importa si algo pienso, si estoy mal o bien, yo quiero hacerte sentir bien, aunque lamentablemente no siempre lo haga de la mejor manera, o hasta incluso, sea yo muchas veces la misma causa de que te sientas mal, y bueno, por eso también tengo miedo de perderte, de que algún día ya no estés, porque eres la persona más importante que tengo, y con la cual quiero cumplir metas, sueños, promesas y deseos juntos, crecer los dos, y mejorar uno al otro, porque donde tú vayas, yo voy, y no te dejaré nunca, en ningún momento, no estarás sola nunca, porque yo no me separaré de ti, ni el tiempo, ni el dinero, ni la distancia, ni nadie ni nada hará que deje de sentir el amor tan intenso que tengo contigo.`,
    `Me enamoré de ti por quien eres, por lo bueno y por lo malo, me enamoré de tu sonrisa, de tus ojitos lindos, de tus cachetitos, de cómo me tratas y cómo me haces sentir, de cómo eres, de las cosas que me enseñas, y lo muy valiente que eres, tú me haces sentir como nadie lo hace, me haces sentir muy bien, me haces sentir el hombre más afortunado, y por eso, tienes una versión de mí que solo tú puedes conocer y solo tú la podrás tener.`,
    `Aunque muchas veces sea un desastre, y siempre me culpe por todo, porque sé que termina siendo mi culpa, quisiera ser suficiente para ti, quiero mejorar y dar lo mejor de mí para estar contigo siempre, no quiero decepcionarte, no quiero hacerte sentir mal, esa no es nunca mi intención y mucho menos lo hago a propósito, porque tú eres un ángel, eres muy tierna y tienes un corazón increíble, quiero que de verdad seas feliz conmigo, que te sientas segura, y que algún día, cuando tengas un problema, sea el primero en quien vendrás a contármelo, ser el primero en el que buscarás ayuda o un refugio, ser yo a quien busques siempre, aunque no sea el mejor, me esforzaré por mejorar, agradecer que llegaste a mi vida y dar lo mejor de mí, quiero ser un buen novio, no quiero hacer que me quieras mejor ni hartarte, no quiero cansarte, no quiero que te aburras o que me dejes de amar, yo soy muy inseguro y siempre pienso en todo, y a veces eso te cansa, por eso también quiero mejorar.`,
    `Yo te amo muchisimisisisimooo, mi niña de ojos bonitos, y no hay un solo día que no quiera estar en otro lugar que no sea donde estés, que no agradezca por tenerte conmigo, de tu mirada que adoro cuando te tengo en frente mío mirándote yo a los ojitos, ver tu sonrisa que adoro cuando te ríes o cuando sonríes estando conmigo, adoro hacerte feliz, adoro verte feliz conmigo, porque cuando veo que te sientes bien, aunque sea por un rato, me alegras el corazón, y me haces sentir que no soy una mala persona, y que sí puedo hacerte feliz, que por lo menos a veces, sí hago las cosas bien.`,
    `Siempre estando contigo tiene un significado especial, eres la única en mi corazón, y cuando me abrazas, se siente como si ya nada más importara, porque cuando estoy contigo, todo lo malo se quita, todo lo feo se quita, todo lo que me puede estar angustiando se va, todo lo que me pone mal se me olvida, te juro que estando contigo todo un día feo se forma en el mejor del mundo solo porque te tengo a ti, y puedo escucharte decir que me amas, porque puedo verte, porque sé que estás conmigo, soy feliz estando contigo y soy feliz sabiendo que aún me amas, me haces sentir de una manera tan calmado y contento si sé que estás conmigo, porque te quiero cuando estás feliz, cuando estás enojadita o seria, cuando estás de buenas o de malas, cuando tienes tú un día difícil o malo, no te quiero solo por la parte bonita, te quiero por completo, te quiero entender y acompañar cada día, cuando lo necesites e incluso cuando no, porque sé que tú eres muy capaz de todo lo que te propones, eres una personita muy especial que me importas de verdad, a quien quiero cuidar y amar por la eternidad.`,
    `Yo no sé qué vaya a pasar mañana, en unas semanas, en meses o años, pero sé bien que quiero pasarlo contigo, seguir enamorándome cada día más de ti, cumplir todo lo que nos proponemos juntos, tener nuestros hijitos, nuestra casa, nuestros perritos, que tú seas una gran piloto, y yo tu ingeniero que estará acompañándote, viajar y conocer el mundo, llevarte hasta la luna, y enseñarte que mi amor llega hasta el infinito, te amo chimena, te amo por siempre, nunca lo olvides, nunca te olvides que sí te amo de verdad, que lo que siento es completamente sincero y que nadie nos quitará eso, adonde tú vas, yo voy.`,
    `Chimena y Renato por siempre chi? chii? por favor chi amor, nunca me dejes, soy tu niñito y no puedo vivir sin mi princesa, por favor nunca te vayas.`
  ],
  
galeria: [
  {id:'g01',foto:'imagenes/inicio.jpg',titulo:'Nuestra primera foto',texto:''},
  {id:'g02',foto:'imagenes/cine.jpg',titulo:'Nuestra salida al cine',texto:''},
  {id:'g03',foto:'imagenes/regalos.jpg',titulo:'Un regalo muy especial',texto:''},
  {id:'g04',foto:'imagenes/ancon.jpg',titulo:'Un recuerdo en Ancón',texto:''},
  {id:'g05',foto:'imagenes/cositas.jpg',titulo:'Tus cositas favoritas',texto:''},
  {id:'g06',foto:'imagenes/carinos.jpg',titulo:'Nuestros detalles',texto:''},
  {id:'g07',foto:'imagenes/corazon.jpg',titulo:'Lo que significas para mí',texto:''},
  {id:'g08',foto:'imagenes/suenos.jpg',titulo:'Nuestros sueños',texto:''},
  {id:'g09',foto:'imagenes/planes.jpg',titulo:'Nuestros planes',texto:''},
  {id:'g10',foto:'imagenes/foto-01.jpg',titulo:'Un momento nuestro',texto:''},
  {id:'g11',foto:'imagenes/foto-02.jpg',titulo:'Un recuerdo nuestro',texto:''}
]

};
