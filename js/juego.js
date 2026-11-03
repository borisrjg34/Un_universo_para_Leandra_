(() => {
  'use strict';
  const D = window.UNIVERSO;
  const app = document.getElementById('app');
  if (!D || !app) return;

  // RESPUESTAS EN MEMORIA: persisten al cambiar de capítulo o ruta.
  // Se eliminan al recargar o cerrar; sin localStorage, sessionStorage ni servidores.
  const S = {
    unlocked: false,
    view: 'login',
    route: null,
    chapter: 0,
    // La carta se desbloquea únicamente cuando se descubren las 11 flores.
    visited: new Set(),
    solved: new Set(),
    answers: Object.create(null), // {idDeEscena: {tipo, valor}} durante esta partida
    editingAnswers: new Set(),
    revealedSurprises: new Set(),
    celebratedUnlock: false,
    platform: 'spotify',
    catalogSong: 'creep',
    loveAttempts: 0,
    lastDodgeTime: 0
  };
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const findSong = id => D.canciones.find(x => x.id === id) || D.canciones[0];
  const findRoute = () => D.rutas.find(x => x.id === S.route);
  const findScene = () => {
    const route = findRoute();
    return route ? D.escenas.find(x => x.id === route.escenas[S.chapter]) : null;
  };
  const stamp = (value, label) => `<span class="tag">${escapeHTML(value)}${label ? ` · ${escapeHTML(label)}` : ''}</span>`;
  const btn = (label, action, extra = '') => `<button class="btn ${extra}" data-action="${action}" type="button">${escapeHTML(label)}</button>`;
  const top = (body, bottom = '') => {
    app.innerHTML = `<div class="shell"><header class="top"><a class="logo" href="#" data-action="home">✦ ${escapeHTML(D.nombre)}</a><div class="top-right">${S.unlocked ? '<button class="btn ghost small" data-action="home">Inicio</button><button class="btn ghost small" data-action="reset">Reiniciar</button>' : ''}<span class="micro">Una historia hecha por los dos ♡</span></div></header><main>${body}</main><footer class="footer">Un universo de recuerdos, sueños y flores ✦</footer>${bottom}</div>`;
    loadImages();
  };
  const photoMarkup = (src, symbol = '📷') => src ? `<div class="photo" data-photo-src="${escapeHTML(src)}"><span class="symbol" aria-hidden="true">${symbol}</span><strong>Una fotografía para este recuerdo ♡</strong></div>` : '';
  function loadImages(){
    document.querySelectorAll('[data-photo-src]').forEach(slot => {
      const src = slot.dataset.photoSrc;
      const image = new Image();
      image.alt = 'Uno de nuestros recuerdos';
      image.onload = () => {
        if (!slot.isConnected) return;
        slot.textContent = '';
        slot.classList.add('ready');
        slot.append(image);
      };
      image.src = src;
    });
  }
  const login = () => top(`<section class="hero"><div class="orb">🌷</div><div class="tag" style="margin-top:24px">Una historia solo nuestra</div><h1>${escapeHTML(D.nombre)}</h1><p>${escapeHTML(D.inicio.subtitulo)}</p></section><section class="card narrow center"><h2>Tu clave especial ✦</h2><p class="muted">Hay una fecha que abre la primera puerta...</p><form id="login-form" class="form-space"><label class="hidden" for="clave">Fecha especial</label><input class="input" id="clave" inputmode="numeric" autocomplete="off" maxlength="8" placeholder="DD/MM/AA" aria-label="Fecha especial" required><div id="login-error" class="error" role="alert"></div><button class="btn" type="submit">Entrar a nuestra historia ♡</button></form></section>`);
  const home = () => top(`<section class="hero"><div class="orb">🌸</div><div class="tag" style="margin-top:26px">Bienvenida a tu universo</div><h1>${escapeHTML(D.inicio.titulo)}</h1><p>${escapeHTML(D.inicio.dedicatoria)}</p></section><section class="card"><div class="row"><div>${stamp('Elige tu camino')}<h2>¿Por dónde empezamos?</h2></div><div class="pill">${S.visited.size} de ${D.escenas.length} flores descubiertas</div></div><div class="route-grid">${D.rutas.map(route=>`<button class="route" type="button" data-route="${route.id}"><span class="symbol" aria-hidden="true">${route.icono}</span><h3>${escapeHTML(route.titulo)}</h3><p>${escapeHTML(route.descripcion)}</p></button>`).join('')}</div><div class="actions">${btn('Nuestro jardín 🌷','garden','secondary')}${btn('Galería 📸','gallery','ghost')}${btn('Nuestras canciones 🎶','catalog','ghost')}</div></section>`);
  function questionMarkup(scene){
    const q=scene.pregunta;
    if(!q)return '';
    const saved=S.answers[scene.id];
    const editing=S.editingAnswers.has(scene.id);
    const surprise=scene.respuestaSorpresa&&saved
      ? `<div class="surprise-message">${scene.respuestaSorpresa.map(x=>`<p>${escapeHTML(x)}</p>`).join('')}</div>` : '';
    if(q.tipo==='abierta'){
      if(saved&&!editing){
        return `<section class="question" id="question-panel"><div class="tag">Una pregunta para ti</div><h3>${escapeHTML(q.titulo)}</h3><div class="saved-answer"><span>Tu respuesta ♡</span><p>${escapeHTML(saved.valor)}</p></div>${surprise}<div class="actions"><button class="btn secondary" type="button" data-action="edit-answer">Cambiar respuesta ✎</button></div><div class="feedback" id="question-feedback" aria-live="polite"></div></section>`;
      }
      return `<section class="question" id="question-panel"><div class="tag">Una pregunta para ti</div><h3>${escapeHTML(q.titulo)}</h3><label class="hidden" for="open-answer">Tu respuesta</label><textarea id="open-answer" class="area" placeholder="Escribe lo que quieras..." maxlength="1500">${saved?escapeHTML(saved.valor):''}</textarea><div class="actions"><button class="btn secondary" type="button" data-action="save-answer">Guardar respuesta ♡</button>${saved?'<button class="btn ghost" type="button" data-action="cancel-edit">Cancelar</button>':''}</div><div class="feedback" id="question-feedback" aria-live="polite"></div></section>`;
    }
    if(q.tipo==='opcion'){
      if(saved&&!editing){
        const answer=q.opciones[saved.valor] || '';
        return `<section class="question" id="question-panel"><div class="tag">¿Te acuerdas?</div><h3>${escapeHTML(q.titulo)}</h3><div class="saved-answer"><span>Tu respuesta ♡</span><p>${escapeHTML(answer)}</p></div><div class="feedback" id="question-feedback">¡Siiii, te acordaste! 💗</div><div class="actions"><button type="button" class="btn secondary" data-action="edit-answer">Cambiar respuesta ✎</button></div></section>`;
      }
      return `<section class="question" id="question-panel"><div class="tag">¿Te acuerdas?</div><h3>${escapeHTML(q.titulo)}</h3><div class="choices">${q.opciones.map((opt,i)=>`<button type="button" class="choice" data-choice="${i}">${escapeHTML(opt)}</button>`).join('')}</div><div class="feedback" id="question-feedback" aria-live="polite"></div></section>`;
    }
    if(saved&&!editing){
      return `<section class="question" id="question-panel"><div class="tag">Una preguntita especial</div><h3>${escapeHTML(q.titulo)}</h3><div class="saved-answer"><span>Tu respuesta ♡</span><p>Chi 💗</p></div><div class="love-bubble">TIIIIII DIJO QUE CHII💗, pedooo yo te amo mashh</div><div class="actions"><button type="button" class="btn secondary" data-action="edit-answer">Volver a jugar ♡</button></div></section>`;
    }
    return `<section class="question" id="question-panel"><div class="tag">Una preguntita especial</div><h3>${escapeHTML(q.titulo)}</h3><div class="love-arena" id="love-arena"><button class="btn love-yes" type="button" data-action="love-yes">Chi 💗</button><button class="btn secondary love-no" id="love-no" type="button">No</button></div><div class="love-bubble" id="love-bubble" aria-live="polite"></div></section>`;
  }
  function renderQuestion(){
    const panel=document.getElementById('question-panel');
    const current=findScene();
    if(panel&&current)panel.outerHTML=questionMarkup(current);
    // Solo se reemplaza la pregunta. El reproductor no se toca.
  }
  function platformControls(){
    return `<div class="platforms" role="group" aria-label="Plataforma musical"><button class="platform ${S.platform==='spotify'?'active':''}" data-platform="spotify" type="button" aria-pressed="${S.platform==='spotify'}">Spotify</button><button class="platform ${S.platform==='youtube'?'active':''}" data-platform="youtube" type="button" aria-pressed="${S.platform==='youtube'}">YouTube</button></div>`;
  }
  function sceneMusic(scene){
    const song=findSong(scene.musica);
    return `<section class="music" aria-label="Música del capítulo"><div class="music-head"><div>${stamp('Nuestra música ♫')}<strong>${escapeHTML(song.nombre)}</strong></div><span aria-hidden="true">🎶</span></div>${platformControls()}<div class="frame" id="music-frame"></div></section>`;
  }
  function mountMusic(track){
    const spot=document.getElementById('music-frame');
    if(!spot)return;
    const song=findSong(track);
    const frame=document.createElement('iframe');
    frame.loading='eager';
    frame.referrerPolicy='strict-origin-when-cross-origin';
    frame.allow='autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture';
    frame.title=`${S.platform==='spotify'?'Spotify':'YouTube'}: ${song.nombre}`;
    if(S.platform==='spotify'){
      frame.src=`https://open.spotify.com/embed/track/${encodeURIComponent(song.spotify)}?utm_source=generator`;
    }else{
      frame.className='youtube';
      frame.allowFullscreen=true;
      frame.src=`https://www.youtube.com/embed/${encodeURIComponent(song.youtube)}?autoplay=1&playsinline=1&rel=0`;
    }
    // Al elegir plataforma sustituimos solo el iframe; las preguntas no lo tocan.
    spot.replaceChildren(frame);
  }
  function scene(){
    const data=findScene(),route=findRoute();
    if(!data||!route){S.view='home';return home();}
    const n=route.escenas.length;
    const prev=S.chapter>0?btn('← Anterior','previous','secondary'):'';
    const imageVisible=Boolean(data.foto && (!data.fotoTrasAcierto || S.solved.has(data.id)));
    const giftHidden=Boolean(data.foto && data.fotoTrasAcierto && !S.solved.has(data.id));
    const aside = imageVisible?`<aside id="scene-photo">${photoMarkup(data.foto,data.icono)}</aside>`:giftHidden?`<aside id="scene-photo" hidden></aside>`:'';
    top(`<section class="row" style="margin:16px 0 12px">${stamp(route.icono+' '+route.titulo,`Capítulo ${S.chapter+1} de ${n}`)}<span class="pill">${Math.round((S.chapter+1)/n*100)}% del camino</span></section><div class="progress"><div style="width:${(S.chapter+1)/n*100}%"></div></div><p class="welcome-lane">${escapeHTML(route.inicio)}</p><div class="story-grid ${imageVisible?'':'single'}" id="story-grid"><section class="card story-card">${stamp(data.icono+' '+data.subtitulo)}<h2>${escapeHTML(data.titulo)}</h2><div class="lead">${data.texto.map(t=>`<p>${escapeHTML(t)}</p>`).join('')}</div>${questionMarkup(data)}${sceneMusic(data)}<div class="actions">${prev}${btn(S.chapter===n-1?'Llegar al jardín 🌷':'Siguiente capítulo →','next')}</div></section>${aside}</div>`);
    mountMusic(data.musica);
  }
  // La celebración se activa cuando el jardín YA ES VISIBLE, nunca durante el desplazamiento.
  // Los temporizadores y pétalos se limpian al navegar a otra pantalla.
  let bloomTimers = [];
  let bloomFrame = null;
  function bloomLater(fn, delay){
    const id=window.setTimeout(fn,delay);
    bloomTimers.push(id);
    return id;
  }
  function stopGardenCelebration(){
    bloomTimers.forEach(id=>window.clearTimeout(id));
    bloomTimers=[];
    if(bloomFrame!==null){window.cancelAnimationFrame(bloomFrame);bloomFrame=null;}
    document.querySelector('.bloom-overlay')?.remove();
  }
  function startGardenCelebration(){
    if(S.view!=='garden'||!allFlowersDiscovered())return;
    const garden=document.getElementById('flower-garden');
    const lock=document.querySelector('.letter-lock');
    const lockIcon=lock?.querySelector('.lock-symbol');
    const action=document.querySelector('.unlock-action');
    if(!garden||!lock||!lockIcon||!action)return;
    stopGardenCelebration();
    S.celebratedUnlock=true;
    // Primero mostramos las flores (no la parte inferior con el botón).
    const y=window.scrollY+garden.getBoundingClientRect().top-22;
    window.scrollTo({top:Math.max(0,y),behavior:'instant'});
    lockIcon.textContent='🔒';
    lockIcon.classList.remove('open');
    lock.classList.remove('finish-glow');
    action.hidden=true;
    action.classList.remove('appeared');
    garden.classList.remove('celebrate');
    // Reflow necesario para reiniciar las animaciones CSS al pulsar Volver a florecer.
    void garden.offsetWidth;
    const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if(reduceMotion){
      lockIcon.textContent='🔓';
      lockIcon.classList.add('open');
      lock.classList.add('finish-glow');
      action.hidden=false;
      return;
    }
    const overlay=document.createElement('div');
    overlay.className='bloom-overlay';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML='<div class="bloom-overlay-content"><span class="bloom-overlay-icon">🌸</span><strong>¡Nuestro jardín floreció!</strong><span>11 flores, 11 pedacitos de nuestra historia ♡</span></div>'+
      Array.from({length:18},(_,i)=>`<span class="bloom-petal" style="--petal-x:${(i*37+11)%94}%;--petal-delay:${(i%7)*.24}s;--petal-time:${3.1+(i%5)*.25}s;--petal-drift:${(i%2?1:-1)*(30+i%6*14)}px">${i%3===0?'🌷':'🌸'}</span>`).join('');
    document.body.append(overlay);
    bloomFrame=window.requestAnimationFrame(()=>{
      bloomFrame=null;
      if(S.view!=='garden'||!garden.isConnected){overlay.remove();return;}
      garden.classList.add('celebrate');
      overlay.classList.add('visible');
    });
    // Las flores se animan en cadena durante más de 4 segundos.
    // Después, el candado se abre y aparece la carta.
    bloomLater(()=>{
      if(S.view!=='garden'||!lock.isConnected)return;
      lockIcon.textContent='🔓';
      lockIcon.classList.add('open');
      lock.classList.add('finish-glow');
      action.hidden=false;
      action.classList.add('appeared');
      overlay.classList.add('out');
    },5100);
    bloomLater(()=>{
      overlay.remove();
      garden.classList.remove('celebrate');
      if(S.view==='garden'&&lock.isConnected){
        // Guiar la mirada al candado recién abierto.
        const target=Math.max(0,window.scrollY+lock.getBoundingClientRect().top-window.innerHeight*.32);
        window.scrollTo({top:target,behavior:'smooth'});
      }
    },6500);
  }
  function allFlowersDiscovered(){
    return D.escenas.every(item=>S.visited.has(item.id));
  }
  function garden(){
    const ready=allFlowersDiscovered();
    const firstBloom=ready&&!S.celebratedUnlock;
    const lockMarkup=ready
      ? `<div class="letter-lock unlocked" role="status"><span class="lock-symbol" aria-hidden="true">${firstBloom?'🔒':'🔓'}</span><strong>¡El jardín está completo!</strong><p>Descubriste todas las flores y la última sorpresa te está esperando.</p></div><div class="unlock-action" ${firstBloom?'hidden':''}>${btn('Abrir tu carta 💌','letter')}</div>`
      : `<div class="letter-lock" role="status"><span class="lock-symbol" aria-hidden="true">🔒</span><strong>La carta todavía está cerrada</strong><p>Cuando descubras todas las flores, la última sorpresa te estará esperando.</p></div>`;
    top(`<section class="hero"><div class="orb">🌷</div><div class="tag" style="margin-top:25px">El jardín de nuestra historia</div><h1>Un jardín para ti</h1><p>Cada flor guarda un pedacito de nosotros.</p></section><section class="card center"><div class="garden ${ready?'unlocked':''}" id="flower-garden">${D.escenas.map((scene,i)=>`<div class="flower ${S.visited.has(scene.id)?'bloom':''}" style="--flower-order:${i}"><span aria-hidden="true">${scene.icono==='✦'?'🌷':scene.icono==='⚡'?'🌸':scene.icono==='🎬'?'🌹':scene.icono==='🎁'?'🌺':scene.icono==='🌊'?'💐':'🌼'}</span><strong>${escapeHTML(scene.titulo)}</strong></div>`).join('')}</div><p class="muted">${S.visited.size} de ${D.escenas.length} flores descubiertas</p><div class="garden-finale"><h2>Hay algo más para ti ♡</h2><p>Unas palabras que he querido dejarte aquí...</p>${lockMarkup}</div><div class="actions center">${btn('Explorar otro camino','home','secondary')}${btn('Ver nuestra galería','gallery','ghost')}${ready?btn('Volver a florecer ✨','replay-bloom','ghost'):''}</div></section>`);
    if(firstBloom){
      // Dar tiempo al navegador para dibujar la página y terminar el salto al jardín.
      bloomLater(()=>{if(S.view==='garden')startGardenCelebration();},700);
    }
  }
  function letter(){
    if(!allFlowersDiscovered()){S.view='garden';return garden();}
    top(`<section class="hero"><div class="orb">💌</div><div class="tag" style="margin-top:25px">Para Leandra</div><h1>Una carta para ti</h1></section><article class="card narrow"><div class="letter">${D.carta.map(paragraph=>`<p>${escapeHTML(paragraph)}</p>`).join('')}</div><div class="actions">${btn('Nuestra galería 📷','gallery')}${btn('Explorar otra ruta','home','secondary')}</div></article>`);
  }
  function gallery(){
    top(`<section class="hero"><div class="orb small">📷</div><div class="tag" style="margin-top:25px">Momentos para recordar</div><h1>Nuestra galería</h1></section><div class="gallery-grid">${D.galeria.map(item=>`<article class="card">${photoMarkup(item.foto)}<h3>${escapeHTML(item.titulo)}</h3>${item.texto?`<p class="muted">${escapeHTML(item.texto)}</p>`:''}</article>`).join('')}</div><div class="actions center">${btn('Volver al inicio','home','secondary')}</div>`);
  }
  function catalog(){
    const selected=findSong(S.catalogSong);
    top(`<section class="hero"><div class="orb small">🎶</div><div class="tag" style="margin-top:25px">Las canciones de nuestra historia</div><h1>Nuestra música</h1></section><section class="card"><div class="story-grid"><div><div class="tag">Selecciona una canción</div><h2>19 canciones para nosotros</h2><div class="catalog" id="song-catalog">${D.canciones.map((song,i)=>`<button type="button" class="song ${song.id===S.catalogSong?'active':''}" data-song="${song.id}"><strong>${String(i+1).padStart(2,'0')}. ${escapeHTML(song.nombre)}</strong><small>${escapeHTML(song.artista)}</small></button>`).join('')}</div></div><aside><div class="music" style="margin-top:0;position:sticky;top:20px"><div class="music-head"><div>${stamp('Nuestra música ♫')}<strong id="song-title">${escapeHTML(selected.nombre)}</strong></div><span aria-hidden="true">🎶</span></div>${platformControls()}<div class="frame" id="music-frame"></div></div></aside></div><div class="actions">${btn('Volver al inicio','home','secondary')}</div></section>`);
    mountMusic(S.catalogSong);
  }
  function render(){
    switch(S.view){case 'login':login();break;case 'home':home();break;case 'scene':scene();break;case 'garden':garden();break;case 'letter':letter();break;case 'gallery':gallery();break;case 'catalog':catalog();break;default:home();}
  }
  function goto(page){
    stopGardenCelebration();
    S.view=page;
    render();
    window.scrollTo({top:0,behavior:page==='garden'?'instant':'smooth'});
  }
  function feedback(message){
    const spot=document.getElementById('question-feedback');
    if(spot)spot.textContent=message;
  }
  function saveAnswer(){
    const current=findScene();
    if(!current||current.pregunta?.tipo!=='abierta')return false;
    const area=document.getElementById('open-answer');
    const value=area?.value.trim();
    if(!value){
      feedback('Escribe primero tu respuesta, mi niñita ♡');
      area?.focus();
      return false;
    }
    S.answers[current.id]={tipo:'abierta',valor:value};
    S.editingAnswers.delete(current.id);
    if(current.respuestaSorpresa)S.revealedSurprises.add(current.id);
    renderQuestion();
    return true;
  }
  function handleChoice(index){
    const current=findScene();if(!current||current.pregunta.tipo!=='opcion')return;
    const correct=index===current.pregunta.correcta;
    if(!correct){feedback(current.pregunta.pista);return;}
    S.solved.add(current.id);
    S.answers[current.id]={tipo:'opcion',valor:index};
    S.editingAnswers.delete(current.id);
    renderQuestion();
    if(current.fotoTrasAcierto){
      const photo=document.getElementById('scene-photo');
      const grid=document.getElementById('story-grid');
      if(photo&&photo.hidden){
        photo.hidden=false;
        photo.innerHTML=photoMarkup(current.foto,current.icono);
        grid?.classList.remove('single');
        loadImages();
      }
    }
  }
  function loveDodge(evt){
    evt?.preventDefault();
    if(!findScene()||findScene().pregunta.tipo!=='amor'||(S.answers[findScene().id]&&!S.editingAnswers.has(findScene().id)))return;
    const now=Date.now();
    if(now-S.lastDodgeTime<180)return;
    S.lastDodgeTime=now;
    const no=document.getElementById('love-no');
    const bubble=document.getElementById('love-bubble');
    if(!no||!bubble)return;
    const text=['A','okk','jumm','bnoooo','okeeey','seguro al otro sí, jum'];
    bubble.textContent=text[Math.min(S.loveAttempts,text.length-1)];
    S.loveAttempts++;
    const positions=[[65,12],[10,69],[70,69],[27,12],[72,39],[11,38],[39,76],[55,9]];
    const [x,y]=positions[(S.loveAttempts-1)%positions.length];
    no.style.left=x+'%';no.style.top=y+'%';
  }
  function next(){
    const current=findScene();const route=findRoute();if(!current||!route)return;
    const q=current.pregunta;
    if(q?.tipo==='opcion'&&!S.solved.has(current.id)){
      feedback('Intenta recordar la respuesta, AJAJ 💗');return;
    }
    if(q?.tipo==='abierta'){
      if(S.editingAnswers.has(current.id)||!S.answers[current.id]){
        if(!saveAnswer())return;
        // Dejar que lea la sorpresa de cumpleaños antes de continuar.
        if(current.respuestaSorpresa)return;
      }
    }
    if(q?.tipo==='amor'&&!S.solved.has(current.id)){
      const bubble=document.getElementById('love-bubble');
      if(bubble)bubble.textContent='Primero responde a la preguntita ♡';
      return;
    }
    S.visited.add(current.id);
    if(S.chapter<route.escenas.length-1){S.chapter++;goto('scene');}
    else{goto('garden');}
  }
  function handleAction(action){
    if(action==='home'){goto(S.unlocked?'home':'login');return;}
    if(action==='reset'){
      if(!window.confirm('¿Quieres reiniciar la historia? Se perderán todas las respuestas y las flores de esta partida.'))return;
      S.view='home';S.route=null;S.chapter=0;
      S.visited.clear();S.solved.clear();S.revealedSurprises.clear();S.editingAnswers.clear();
      S.answers=Object.create(null);S.celebratedUnlock=false;
      S.loveAttempts=0;S.lastDodgeTime=0;
      goto('home');return;
    }
    if(action==='garden'){goto('garden');return;}
    if(action==='gallery'){goto('gallery');return;}
    if(action==='catalog'){goto('catalog');return;}
    if(action==='letter'){goto('letter');return;}
    if(action==='replay-bloom'){
      if(allFlowersDiscovered())startGardenCelebration();
      return;
    }
    if(action==='next'){next();return;}
    if(action==='save-answer'){saveAnswer();return;}
    if(action==='cancel-edit'){
      const current=findScene();if(current){S.editingAnswers.delete(current.id);renderQuestion();}return;
    }
    if(action==='edit-answer'){
      const current=findScene();if(!current)return;
      S.editingAnswers.add(current.id);
      if(current.pregunta.tipo==='amor'){S.loveAttempts=0;S.lastDodgeTime=0;}
      renderQuestion();
      document.getElementById('open-answer')?.focus();
      return;
    }
    if(action==='previous'){
      if(S.chapter>0){S.chapter--;goto('scene');}return;
    }
    if(action==='love-yes'){
      const current=findScene();if(!current||current.pregunta?.tipo!=='amor')return;
      S.solved.add(current.id);
      S.answers[current.id]={tipo:'amor',valor:'chi'};
      S.editingAnswers.delete(current.id);
      renderQuestion();
      return;
    }
  }
  function dateFormat(digits){
    digits=String(digits).replace(/\D/g,'').slice(0,6);
    let text=digits.slice(0,2);
    if(digits.length>=2)text+='/';
    if(digits.length>2)text+=digits.slice(2,4);
    if(digits.length>=4)text+='/';
    if(digits.length>4)text+=digits.slice(4,6);
    return text;
  }
  function caretAfterDigits(text,count){
    if(count===0)return 0;
    let seen=0;
    for(let i=0;i<text.length;i++)if(/\d/.test(text[i])){
      seen++;if(seen===count){let pos=i+1;while(text[pos]==='/')pos++;return pos;}
    }
    return text.length;
  }
  app.addEventListener('input', e=>{
    const el=e.target;
    if(el.id!=='clave')return;
    const before=el.value.slice(0,el.selectionStart||0).replace(/\D/g,'').length;
    const digits=el.value.replace(/\D/g,'').slice(0,6);
    el.value=dateFormat(digits);
    const pos=caretAfterDigits(el.value,before);
    try{el.setSelectionRange(pos,pos);}catch{}
  });
  app.addEventListener('beforeinput', e=>{
    const el=e.target;
    if(el.id!=='clave'||e.inputType!=='deleteContentBackward')return;
    // Si el cursor quedó después de una barra automática, retrocede
    // borrando el número anterior, sin bloquear Backspace.
    const pos=el.selectionStart;
    if(pos!==el.selectionEnd||!pos||el.value[pos-1]!=='/')return;
    e.preventDefault();
    const digits=el.value.replace(/\D/g,'');
    const prior=el.value.slice(0,pos).replace(/\D/g,'').length;
    const changed=digits.slice(0,prior-1)+digits.slice(prior);
    el.value=dateFormat(changed);
    const caret=caretAfterDigits(el.value,prior-1);
    el.setSelectionRange(caret,caret);
  });
  app.addEventListener('submit',e=>{
    if(e.target.id!=='login-form')return;
    e.preventDefault();
    const value=document.getElementById('clave')?.value.replace(/\D/g,'');
    if(value===D.clave){S.unlocked=true;goto('home');}
    else document.getElementById('login-error').textContent='Jummm, esa no es la fecha especial 👀';
  });
  app.addEventListener('pointerdown',e=>{
    if(e.target.closest('#love-no')){
      // En móvil no hay hover: el botón esquiva cada intento de tocarlo.
      loveDodge(e);
    }
  });
  app.addEventListener('mouseover',e=>{
    if(e.target.closest('#love-no')&&e.pointerType!=='touch'){
      // No moverlo dos veces al tocar pantalla; mouseover se usa en escritorio.
      loveDodge(e);
    }
  });
  app.addEventListener('click', e=>{
    const route=e.target.closest('[data-route]');
    if(route){
      S.route=route.dataset.route;S.chapter=0;
      S.loveAttempts=0;
      goto('scene');return;
    }
    const platform=e.target.closest('[data-platform]');
    if(platform){
      const name=platform.dataset.platform;
      if(name!==S.platform){
        S.platform=name;
        document.querySelectorAll('[data-platform]').forEach(b=>{
          b.classList.toggle('active',b.dataset.platform===name);
          b.setAttribute('aria-pressed',String(b.dataset.platform===name));
        });
        mountMusic(S.view==='catalog'?S.catalogSong:findScene()?.musica);
      }
      return;
    }
    const song=e.target.closest('[data-song]');
    if(song){
      if(S.view!=='catalog')return;
      S.catalogSong=song.dataset.song;
      document.querySelectorAll('[data-song]').forEach(button=>button.classList.toggle('active',button.dataset.song===S.catalogSong));
      const title=document.getElementById('song-title');if(title)title.textContent=findSong(S.catalogSong).nombre;
      mountMusic(S.catalogSong);return;
    }
    const choice=e.target.closest('[data-choice]');
    if(choice){handleChoice(Number(choice.dataset.choice));return;}
    if(e.target.closest('#love-no')){
      e.preventDefault();loveDodge(e);return;
    }
    const act=e.target.closest('[data-action]');
    if(act){e.preventDefault();handleAction(act.dataset.action);}
  });
  // Aviso propio y fiable cuando ella decide comenzar desde cero.
  // La advertencia del navegador al recargar/cerrar depende de Chrome/Safari
  // y no permite establecer un texto personalizado.
  window.addEventListener('beforeunload',e=>{
    const hasAnswers=Object.keys(S.answers).length>0;
    if(S.visited.size===0&&!hasAnswers)return;
    e.preventDefault();
    e.returnValue='';
  });
  render();
})();
