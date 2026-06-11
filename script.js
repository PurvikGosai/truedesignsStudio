const header=document.getElementById("header");
window.addEventListener("scroll",()=>{header.style.background=window.scrollY>30?"rgba(6,17,31,.94)":"rgba(6,17,31,.72)"});
const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")})},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
function sendToWhatsApp(event){
 event.preventDefault();
 const name=document.getElementById("name").value;
 const phone=document.getElementById("phone").value;
 const property=document.getElementById("property").value;
 const project=document.getElementById("project").value;
 const budget=document.getElementById("budget").value;
 const message=document.getElementById("message").value;
 const text=`Hi True Designs, I want a free interior design consultation.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AProperty Type: ${encodeURIComponent(property)}%0AProject Type: ${encodeURIComponent(project)}%0ABudget: ${encodeURIComponent(budget)}%0AMessage: ${encodeURIComponent(message)}`;
 window.open(`https://wa.me/919409649255?text=${text}`,"_blank");
}