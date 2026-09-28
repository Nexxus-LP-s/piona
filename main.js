/* Piona Consórcios — Landing Page */
(function(){
  const header=document.querySelector('.header');
  const burger=document.getElementById('burger');
  const nav=document.getElementById('nav');
  const mcta=document.getElementById('mcta');
  const hero=document.getElementById('inicio');
  const form=document.getElementById('lead-form');
  const formSec=document.getElementById('simulacao');
  const goalSel=document.getElementById('f-goal');

  function setMenu(open){
    burger.setAttribute('aria-expanded',open);
    burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
    nav.classList.toggle('open',open);
    document.body.classList.toggle('menu-open',open);
  }
  burger.addEventListener('click',()=>setMenu(burger.getAttribute('aria-expanded')!=='true'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);burger.focus()}});
  window.matchMedia('(min-width: 1021px)').addEventListener('change',e=>{if(e.matches)setMenu(false)});

  let formVisible=false;
  function onScroll(){
    header.classList.toggle('scrolled',window.scrollY>8);
    const pastHero=hero.getBoundingClientRect().bottom<0;
    mcta.classList.toggle('show',pastHero && !formVisible);
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  new IntersectionObserver(es=>{formVisible=es[0].isIntersecting;onScroll()},{threshold:0.05}).observe(formSec);
  onScroll();

  const links=[...nav.querySelectorAll('a.link')];
  const map=new Map(links.map(l=>[l.getAttribute('href').slice(1),l]));
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        links.forEach(l=>l.classList.remove('active'));
        const l=map.get(en.target.id); if(l) l.classList.add('active');
      }
    });
  },{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('main section[id]').forEach(s=>io.observe(s));

  document.querySelectorAll('.cat').forEach(c=>c.addEventListener('click',()=>{
    const v=c.dataset.goal;
    if(v && [...goalSel.options].some(o=>o.value===v)){goalSel.value=v;clearErr('goal')}
    formSec.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    setTimeout(()=>document.getElementById('f-nome').focus({preventScroll:true}),600);
  }));


  // Reveal on scroll
  (function(){
    const root=document.documentElement;
    if(!root.classList.contains('anim')) return;
    const groups=[
      ['.sec-head',0,'rv'],['.pain-head',0,'rv'],['.pain-body > *',90,'rv'],['.track',0,'rv'],
      ['.steps .step',110,'rv'],['.cats .cat',70,'rv'],
      ['.statement blockquote',0,'rv'],['.statement .eyebrow',0,'rv'],['.statement-body > *',110,'rv'],
      ['.sec-copy > *',70,'rv'],['.feats .feat',90,'rv'],['.band',0,'rv'],
      ['.form-intro > *',80,'rv'],['.form-card',120,'rv'],['.faq-list details',70,'rv'],
      ['.closing .inner > *',90,'rv'],['.footer .top',0,'rv-fade'],['.footer .legal',100,'rv-fade']
    ];
    const els=[];
    groups.forEach(([sel,step,cls])=>{
      const list=[...document.querySelectorAll(sel)].filter(e=>!e.classList.contains('rv'));
      list.forEach((el,i)=>{el.classList.add(cls);el.style.setProperty('--d',(i*step)+'ms');els.push(el)});
    });
    document.querySelectorAll('.track li').forEach((li,i)=>li.style.setProperty('--i',i));
    const st=document.querySelector('.statement'); if(st) els.push(st);
    const obs=new IntersectionObserver(es=>es.forEach(en=>{
      if(en.isIntersecting){en.target.classList.add('in');obs.unobserve(en.target)}
    }),{rootMargin:'0px 0px -8% 0px',threshold:0.12});
    els.forEach(el=>obs.observe(el));
    // Safety: anything jumped to via anchor is shown
    window.addEventListener('hashchange',()=>setTimeout(()=>els.forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)el.classList.add('in')}),400));
  })();

  const wa=document.getElementById('f-whats');
  wa.addEventListener('input',()=>{
    let d=wa.value.replace(/\D/g,'').slice(0,11);
    let o=d;
    if(d.length>0) o='('+d.slice(0,2);
    if(d.length>=3) o+=') '+d.slice(2, d.length>10?7:6);
    if(d.length>=7) o+='-'+d.slice(d.length>10?7:6);
    wa.value=o;
  });

  const val=document.getElementById('f-valor');
  val.addEventListener('input',()=>{
    const d=val.value.replace(/\D/g,'').replace(/^0+/,'').slice(0,11);
    val.value=d?'R$ '+Number(d).toLocaleString('pt-BR'):'';
  });

  function setErr(k,msg){
    const e=document.getElementById('e-'+k); e.textContent=msg;
    e.closest('.field').classList.toggle('err',!!msg);
  }
  function clearErr(k){setErr(k,'')}
  [['nome','f-nome'],['whats','f-whats'],['email','f-email'],['valor','f-valor']].forEach(([k,id])=>document.getElementById(id).addEventListener('input',()=>clearErr(k)));
  goalSel.addEventListener('change',()=>clearErr('goal'));

  form.addEventListener('submit',e=>{
    e.preventDefault();
    let ok=true, first=null;
    const nomeEl=document.getElementById('f-nome'), emEl=document.getElementById('f-email');
    const nome=nomeEl.value.trim(), w=wa.value.replace(/\D/g,''), em=emEl.value.trim(), goal=goalSel.value, v=val.value.replace(/\D/g,'');
    function fail(k,msg,el){setErr(k,msg);ok=false;if(!first)first=el}
    if(nome.length<2) fail('nome','Informe seu nome.',nomeEl); else clearErr('nome');
    if(w.length<10) fail('whats','Informe um WhatsApp com DDD, por exemplo (11) 91234-5678.',wa); else clearErr('whats');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) fail('email','Informe um e-mail válido, por exemplo nome@email.com.',emEl); else clearErr('email');
    if(!goal) fail('goal','Escolha o que você deseja adquirir.',goalSel); else clearErr('goal');
    if(!v) fail('valor','Informe um valor aproximado. Pode ser uma estimativa.',val); else clearErr('valor');
    if(!ok){first.focus();return}
    // Integração: enviar {nome, whatsapp, email, objetivo, valor} para o CRM / webhook aqui.
    document.getElementById('success-title').textContent='Obrigado, '+nome.split(' ')[0]+'!';
    document.getElementById('success-text').textContent=(goal==='Ainda não decidi'?'Recebemos sua solicitação. Um especialista':'Recebemos sua solicitação de simulação para '+goal.toLowerCase()+'. Um especialista')+' da Piona vai entrar em contato pelo WhatsApp para entender seu objetivo e preparar sua simulação.';
    form.hidden=true;
    document.getElementById('success').hidden=false;
  });
  document.getElementById('again').addEventListener('click',()=>{
    form.reset(); form.hidden=false; document.getElementById('success').hidden=true; document.getElementById('f-nome').focus();
  });
})();
