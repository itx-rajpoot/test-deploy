const defaultData = {
  personal:{name:"Your Name",title:"Web Developer",email:"example@email.com",phone:"+92 300 0000000",location:"Pakistan",description:"I create modern, responsive and user-friendly websites and web applications.",github:"#",linkedin:"#",facebook:"#"},
  about:{heading:"I'm a passionate Web Developer",text:"I am a passionate developer who enjoys creating clean, modern and responsive websites. I focus on writing simple and maintainable code while creating a great user experience."},
  experience:[
    {date:"2024 - Present",role:"Web Developer",company:"Company Name",description:"Developed responsive websites and web applications using modern technologies."},
    {date:"2022 - 2024",role:"Frontend Developer",company:"Company Name",description:"Created user interfaces and implemented responsive layouts for web applications."}
  ],
  skills:[
    {name:"HTML",level:95},{name:"CSS",level:90},{name:"JavaScript",level:85},{name:"React",level:80}
  ],
  projects:[
    {title:"Portfolio Website",description:"A modern responsive portfolio website built with HTML, CSS and JavaScript.",icon:"💻",link:"#"},
    {title:"E-Commerce Website",description:"A responsive online shopping interface with modern UI components.",icon:"🛒",link:"#"},
    {title:"Dashboard",description:"A professional dashboard interface for managing application data.",icon:"📊",link:"#"}
  ],
  contact:{email:"example@email.com",phone:"+92 300 0000000",location:"Pakistan"},
  messages:[]
};

function loadData(){
  const saved=localStorage.getItem("portfolioData");
  if(!saved){localStorage.setItem("portfolioData",JSON.stringify(defaultData));return structuredClone(defaultData)}
  try{return {...defaultData,...JSON.parse(saved)}}catch(e){return structuredClone(defaultData)}
}
const data=loadData();
const $=id=>document.getElementById(id);
function text(id,value){if($(id))$(id).textContent=value}
text("hero-name",data.personal.name);text("nav-name",data.personal.name.split(" ")[0]);text("footer-name",data.personal.name.split(" ")[0]);
text("hero-title",data.personal.title);text("hero-description",data.personal.description);
text("about-heading",data.about.heading);text("about-text",data.about.text);text("about-name",data.personal.name);text("about-email",data.personal.email);text("about-location",data.personal.location);
text("contact-email",data.contact.email);text("contact-phone",data.contact.phone);text("contact-location",data.contact.location);text("current-year",new Date().getFullYear());
$("github-link").href=data.personal.github||"#";$("linkedin-link").href=data.personal.linkedin||"#";$("facebook-link").href=data.personal.facebook||"#";
$("experience-container").innerHTML=data.experience.map(x=>`<article class="experience-card"><div class="experience-date">${x.date}</div><div class="experience-content"><h3>${x.role}</h3><h4>${x.company}</h4><p>${x.description}</p></div></article>`).join("");
$("skills-container").innerHTML=data.skills.map(x=>`<div class="skill-card"><div class="skill-header"><h3>${x.name}</h3><span>${x.level}%</span></div><div class="skill-bar"><div class="skill-progress" style="width:${Math.min(100,Math.max(0,x.level))}%"></div></div></div>`).join("");
$("projects-container").innerHTML=data.projects.map(x=>`<article class="project-card"><div class="project-image">${x.icon||"💻"}</div><div class="project-content"><h3>${x.title}</h3><p>${x.description}</p><a class="project-link" href="${x.link||"#"}" target="_blank">View Project →</a></div></article>`).join("");
text("project-count",data.projects.length);text("experience-count",data.experience.length);text("skill-count",data.skills.length);
$("menu-btn").addEventListener("click",()=>{$("navbar").classList.toggle("open")});
document.querySelectorAll(".navbar a").forEach(a=>a.addEventListener("click",()=>$("navbar").classList.remove("open")));
$("contact-form").addEventListener("submit",e=>{e.preventDefault();data.messages.push({name:$("contact-name-input").value,email:$("contact-email-input").value,message:$("contact-message").value,date:new Date().toISOString()});localStorage.setItem("portfolioData",JSON.stringify(data));alert("Thank you! Your message has been saved locally.");e.target.reset()});