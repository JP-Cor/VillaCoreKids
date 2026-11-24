'use strict';
const phone='50688111444';
const menu=document.querySelector('.menu');
const links=document.querySelector('#links');
menu.addEventListener('click',()=>{const opened=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'Cerrar menú':'Abrir menú');});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');}));
const date=document.querySelector('#fecha');
const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Costa_Rica',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).reduce((o,p)=>(o[p.type]=p.value,o),{});
const local=today();date.min=`${local.year}-${local.month}-${local.day}`;
document.querySelectorAll('.choose').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#modelo').value=a.dataset.product;}));
document.querySelector('#booking-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const [y,m,d]=f.get('fecha').split('-');const message=`¡Hola, VillaCore Kids! 🎈\nQuiero consultar disponibilidad para un evento.\n\nNombre: ${f.get('nombre').trim()}\nInflable: ${f.get('modelo')}\nFecha: ${d}/${m}/${y}\nHora de inicio: ${f.get('hora')}\nLocalidad: ${f.get('lugar').trim()}\n\n¿Me pueden confirmar disponibilidad y precio? Muchas gracias.`;window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');});
const status=document.querySelector('#share-status');
function publicUrl(){if(!/^https?:$/.test(location.protocol)||['localhost','127.0.0.1','0.0.0.0'].includes(location.hostname)){status.textContent='Publicá el sitio en GitHub Pages para compartir su enlace público.';return null;}const u=new URL(location.href);u.hash='';u.search='';return u.href;}
document.querySelector('#share-wa').addEventListener('click',()=>{const url=publicUrl();if(url)window.open('https://wa.me/?text='+encodeURIComponent('¡Conocé VillaCore Kids! 🎈 '+url),'_blank','noopener,noreferrer');});
document.querySelector('#share-fb').addEventListener('click',()=>{const url=publicUrl();if(url)window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url),'_blank','noopener,noreferrer');});
document.querySelector('#share-copy').addEventListener('click',async()=>{const url=publicUrl();if(!url)return;try{await navigator.clipboard.writeText(url);status.textContent='Enlace copiado.';}catch{status.textContent='Copiá este enlace: '+url;}});
