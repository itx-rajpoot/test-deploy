const defaults={
  personal:{name:"Your Name",title:"Web Developer",email:"example@email.com",phone:"+92 300 0000000",location:"Pakistan",description:"I create modern, responsive and user-friendly websites and web applications.",github:"#",linkedin:"#",facebook:"#"},
  about:{heading:"I'm a passionate Web Developer",text:"I am a passionate developer who enjoys creating clean, modern and responsive websites. I focus on writing simple and maintainable code while creating a great user experience."},
  experience:[{date:"2024 - Present",role:"Web Developer",company:"Company Name",description:"Developed responsive websites and web applications using modern technologies."},{date:"2022 - 2024",role:"Frontend Developer",company:"Company Name",description:"Created user interfaces and implemented responsive layouts for web applications."}],
  skills:[{name:"HTML",level:95},{name:"CSS",level:90},{name:"JavaScript",level:85},{name:"React",level:80}],
  projects:[{title:"Portfolio Website",description:"A modern responsive portfolio website built with HTML, CSS and JavaScript.",icon:"💻",link:"#"},{title:"E-Commerce Website",description:"A responsive online shopping interface with modern UI components.",icon:"🛒",link:"#"},{title:"Dashboard",description:"A professional dashboard interface for managing application data.",icon:"📊",link:"#"}],
  contact:{email:"example@email.com",phone:"+92 300 0000000",location:"Pakistan"},messages:[]
};
function getData(){try{return JSON.parse(localStorage.getItem("portfolioData"))||structuredClone(defaults)}catch(e){return structuredClone(defaults)}}
let data=getData();
const $=id=>document.getElementById(id);
function save(){localStorage.setItem("portfolioData",JSON.stringify(data));updateDashboard();toast("Saved successfully!")}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800)}
function fill(){
  Object.entries(data.personal).forEach(([k,v])=>{if($(k))$(k).value=v});
  $("about-heading-input").value=data.about.heading;$("about-text-input").value=data.about.text;
  $("contact-email-admin").value=data.contact.email;$("contact-phone-admin").value=data.contact.phone;$("contact-location-admin").value=data.contact.location;
  renderExperience();renderSkills();renderProjects();updateDashboard();
}
function updateDashboard(){$("dash-projects").textContent=data.projects.length;$("dash-experience").textContent=data.experience.length;$("dash-skills").textContent=data.skills.length;$("dash-messages").textContent=data.messages.length}
$("personal-form").addEventListener("submit",e=>{e.preventDefault();["name","title","email","phone","location","description","github","linkedin","facebook"].forEach(k=>data.personal[k]=$(k).value);save()});
$("about-form").addEventListener("submit",e=>{e.preventDefault();data.about.heading=$("about-heading-input").value;data.about.text=$("about-text-input").value;save()});
$("contact-form-admin").addEventListener("submit",e=>{e.preventDefault();data.contact={email:$("contact-email-admin").value,phone:$("contact-phone-admin").value,location:$("contact-location-admin").value};save()});

function renderExperience(){
  $("experience-list").innerHTML=data.experience.map((x,i)=>`<div class="editor-item"><div class="editor-item-grid">
  <label>Date<input data-i="${i}" data-k="date" value="${esc(x.date)}"></label><label>Role<input data-i="${i}" data-k="role" value="${esc(x.role)}"></label>
  <label>Company<input data-i="${i}" data-k="company" value="${esc(x.company)}"></label><label>Description<textarea data-i="${i}" data-k="description">${esc(x.description)}</textarea></label>
  </div><div class="editor-actions"><button class="delete-btn" onclick="deleteExperience(${i})">Delete</button><button class="small-save" onclick="saveExperience(${i})">Save</button></div></div>`).join("");
}
function saveExperience(i){document.querySelectorAll(`#experience-list [data-i="${i}"]`).forEach(el=>data.experience[i][el.dataset.k]=el.value);save()}
function deleteExperience(i){if(confirm("Delete this experience?")){data.experience.splice(i,1);save();renderExperience()}}
$("add-experience").onclick=()=>{data.experience.push({date:"2026 - Present",role:"New Role",company:"Company Name",description:"Describe your responsibilities and achievements."});save();renderExperience()};

function renderSkills(){
  $("skills-list").innerHTML=data.skills.map((x,i)=>`<div class="editor-item"><div class="editor-item-grid"><label>Skill Name<input data-i="${i}" data-k="name" value="${esc(x.name)}"></label><label>Scale (0-100)<input type="number" min="0" max="100" data-i="${i}" data-k="level" value="${x.level}"></label></div><div class="editor-actions"><button class="delete-btn" onclick="deleteSkill(${i})">Delete</button><button class="small-save" onclick="saveSkill(${i})">Save</button></div></div>`).join("");
}
function saveSkill(i){document.querySelectorAll(`#skills-list [data-i="${i}"]`).forEach(el=>data.skills[i][el.dataset.k]=el.dataset.k==="level"?Number(el.value):el.value);save()}
function deleteSkill(i){if(confirm("Delete this skill?")){data.skills.splice(i,1);save();renderSkills()}}
$("add-skill").onclick=()=>{data.skills.push({name:"New Skill",level:50});save();renderSkills()};

function renderProjects(){
  $("projects-list").innerHTML=data.projects.map((x,i)=>`<div class="editor-item"><div class="editor-item-grid">
  <label>Project Title<input data-i="${i}" data-k="title" value="${esc(x.title)}"></label><label>Icon / Emoji<input data-i="${i}" data-k="icon" value="${esc(x.icon||"💻")}"></label>
  <label>Project URL<input data-i="${i}" data-k="link" value="${esc(x.link||"#")}"></label><label>Description<textarea data-i="${i}" data-k="description">${esc(x.description)}</textarea></label>
  </div><div class="editor-actions"><button class="delete-btn" onclick="deleteProject(${i})">Delete</button><button class="small-save" onclick="saveProject(${i})">Save</button></div></div>`).join("");
}
function saveProject(i){document.querySelectorAll(`#projects-list [data-i="${i}"]`).forEach(el=>data.projects[i][el.dataset.k]=el.value);save()}
function deleteProject(i){if(confirm("Delete this project?")){data.projects.splice(i,1);save();renderProjects()}}
$("add-project").onclick=()=>{data.projects.push({title:"New Project",description:"Describe your project here.",icon:"💻",link:"#"});save();renderProjects()};

function esc(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}
$("reset-data").onclick=()=>{if(confirm("Reset all portfolio data to the default data?")){data=structuredClone(defaults);save();fill()}};
fill();