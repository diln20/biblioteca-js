const lessons = [
{
 id:"que-es-api",num:"01",cat:"inicio",title:"¿Qué es una API?",subtitle:"Cliente, servidor, recurso y endpoint.",
 why:"Una API permite que dos aplicaciones se comuniquen. Desde el navegador, JavaScript actúa como cliente y solicita datos a un servidor.",
 key:"Piensa en una API como una ventanilla: haces una solicitud concreta y recibes una respuesta concreta.",
 code:"// Una URL de API puede devolver datos\nhttps://jsonplaceholder.typicode.com/users/1",
 result:`<h4>Idea visual</h4><p>🌐 Navegador → <b>GET /users/1</b> → 🖥 Servidor</p><p>🖥 Servidor → <b>JSON del usuario</b> → 🌐 Navegador</p>`,
 tip:"Un endpoint es una URL diseñada para acceder a un recurso específico.",
 task:"Abre el endpoint en una pestaña del navegador. Identifica al menos 3 propiedades del usuario que devuelve.",
 mini:"Mini proyecto: dibuja el flujo Navegador → API → Respuesta y escribe debajo qué dato quieres mostrar en una tarjeta."
},
{
 id:"http",num:"02",cat:"inicio",title:"HTTP sin complicarlo",subtitle:"Métodos, rutas y códigos de estado.",
 why:"Las APIs web suelen comunicarse mediante HTTP. El método indica la intención de la petición y el status describe el resultado.",
 key:"GET consulta · POST crea · PUT/PATCH actualizan · DELETE elimina.",
 code:"GET    /users/1\nPOST   /users\nPATCH  /users/1\nDELETE /users/1",
 result:`<div class='table-wrap'><table class='http-table'><tr><th>Status</th><th>Significa</th></tr><tr><td>200</td><td>Solicitud correcta</td></tr><tr><td>201</td><td>Recurso creado</td></tr><tr><td>204</td><td>Correcto, sin contenido</td></tr><tr><td>400</td><td>Petición inválida</td></tr><tr><td>401</td><td>Falta autenticación</td></tr><tr><td>403</td><td>Sin permiso</td></tr><tr><td>404</td><td>No encontrado</td></tr><tr><td>429</td><td>Demasiadas peticiones</td></tr><tr><td>500</td><td>Error del servidor</td></tr></table></div>`,
 tip:"No memorices todos los códigos. Aprende primero las familias 2xx, 4xx y 5xx.",
 task:"Explica con tus palabras la diferencia entre 200, 404 y 500.",
 mini:"Mini proyecto: crea una pequeña tabla HTML con los 5 status que te parezcan más útiles."
},
{
 id:"json",num:"03",cat:"inicio",title:"JSON: el formato que vas a recibir",subtitle:"Objetos y arrays que llegan como texto.",
 why:"Muchas APIs devuelven JSON. JavaScript puede convertir esa respuesta en objetos y arrays que luego puedes recorrer y mostrar.",
 key:"Objeto: { } · Array: [ ] · Propiedad: clave + valor.",
 code:'const texto = \'{"id":1,"name":"Ana"}\';\nconst usuario = JSON.parse(texto);\nconsole.log(usuario.name);',
 result:`<span class='status'>Resultado</span><div class='json'>{\n  "id": 1,\n  "name": "Ana"\n}</div><p><b>usuario.name</b> → Ana</p>`,
 tip:"response.json() hace el trabajo de convertir el cuerpo JSON de una respuesta HTTP.",
 task:"Observa un usuario de JSONPlaceholder y distingue cuáles propiedades son strings, números y objetos.",
 mini:"Mini proyecto: crea manualmente un objeto usuario con nombre, correo y ciudad; después muéstralo en una tarjeta HTML."
},
{
 id:"fetch-get",num:"04",cat:"fetch",title:"Tu primer fetch GET",subtitle:"Pedir datos con JavaScript.",
 why:"fetch() inicia una petición y devuelve una Promise. Con .then() puedes esperar la respuesta paso a paso.",
 key:"fetch(URL) → Response → response.json() → datos.",
 code:'fetch("https://jsonplaceholder.typicode.com/users/1")\n  .then(function(response) {\n    return response.json();\n  })\n  .then(function(user) {\n    console.log(user.name);\n  });',
 result:`<h4>Flujo</h4><p>1. fetch inicia la petición</p><p>2. llega Response</p><p>3. json() convierte el cuerpo</p><p>4. el segundo then recibe el usuario</p>`,
 tip:"El primer .then() todavía no recibe el usuario listo; recibe el objeto Response.",
 task:"Cambia /users/1 por /users/2 y predice qué parte del resultado debería cambiar.",
 mini:"Mini proyecto: consulta un usuario y escribe en el HTML su nombre y correo."
},
{
 id:"status-ok",num:"05",cat:"fetch",title:"response.status y response.ok",subtitle:"No asumir que todo salió bien.",
 why:"fetch no lanza un error automáticamente por un 404 o un 500. Debes revisar la respuesta HTTP.",
 key:"response.ok es true cuando el status está dentro del rango 200–299.",
 code:'fetch("https://jsonplaceholder.typicode.com/users/1")\n  .then(function(response) {\n    console.log(response.status);\n    console.log(response.ok);\n\n    if (!response.ok) {\n      throw new Error("HTTP " + response.status);\n    }\n\n    return response.json();\n  });',
 result:`<p><b>response.status</b> → 200</p><p><b>response.ok</b> → true</p><p>Si el servidor responde 404: <b>response.ok → false</b>.</p>`,
 tip:"Esta comprobación debe aparecer antes de response.json() cuando quieres controlar errores HTTP.",
 task:"Usa una ruta que no exista y observa el status. Luego explica por qué response.ok vale false.",
 mini:"Mini proyecto: muestra en pantalla “Datos cargados” o “No se pudo consultar” según response.ok."
},
{
 id:"async-await",num:"06",cat:"fetch",title:"La misma petición con async/await",subtitle:"Una forma más lineal de leer código asincrónico.",
 why:"async/await trabaja sobre Promises, pero permite leer la petición casi de arriba hacia abajo.",
 key:"await solo puede usarse dentro de una función async o en contextos que soporten top-level await.",
 code:'async function cargarUsuario() {\n  const response = await fetch(\n    "https://jsonplaceholder.typicode.com/users/1"\n  );\n\n  if (!response.ok) {\n    throw new Error("HTTP " + response.status);\n  }\n\n  const user = await response.json();\n  return user;\n}',
 result:`<h4>Dos esperas diferentes</h4><p><b>await fetch(...)</b> espera la respuesta HTTP.</p><p><b>await response.json()</b> espera leer y convertir el cuerpo.</p>`,
 tip:"Una función async siempre devuelve una Promise, incluso si haces return user.",
 task:"Explica por qué const user = cargarUsuario() no entrega directamente el objeto usuario.",
 mini:"Mini proyecto: llama cargarUsuario() desde otra función async y escribe user.name en el DOM."
},
{
 id:"errores",num:"07",cat:"fetch",title:"try/catch + estado de carga",subtitle:"Una interfaz debe explicar qué está pasando.",
 why:"Una petición puede tardar o fallar. El usuario necesita ver estados de carga, éxito y error.",
 key:"try ejecuta el flujo normal · catch recibe el error · finally sirve para limpiar el estado.",
 code:'async function cargar() {\n  estado.textContent = "Cargando...";\n\n  try {\n    const response = await fetch(URL);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n\n    const datos = await response.json();\n    estado.textContent = "Listo";\n    return datos;\n  } catch (error) {\n    estado.textContent = "No se pudo cargar";\n    console.error(error);\n  }\n}',
 result:`<p>⏳ Cargando...</p><p>✅ Listo</p><p>o</p><p>❌ No se pudo cargar</p>`,
 tip:"No dejes un error solo en console.error; muestra también un mensaje entendible en la interfaz.",
 task:"Añade finally para habilitar de nuevo un botón después de terminar la petición.",
 mini:"Mini proyecto: crea un botón “Cargar usuario” que se deshabilite mientras fetch está trabajando."
},
{
 id:"dom",num:"08",cat:"web",title:"Mostrar los datos en HTML",subtitle:"De JSON a una interfaz visible.",
 why:"Consumir una API no termina en console.log. El objetivo habitual es convertir los datos en contenido de la página.",
 key:"Guarda la respuesta en una variable y después crea o actualiza elementos del DOM.",
 code:'function mostrarUsuario(user) {\n  const tarjeta = document.createElement("article");\n  const nombre = document.createElement("h3");\n  const correo = document.createElement("p");\n\n  nombre.textContent = user.name;\n  correo.textContent = user.email;\n\n  tarjeta.append(nombre, correo);\n  contenedor.append(tarjeta);\n}',
 result:`<div style='border:1px solid #ccd9e1;border-radius:12px;padding:13px'><b>Leanne Graham</b><br><span style='color:#647887'>Sincere@april.biz</span></div>`,
 tip:"textContent es una opción segura para insertar texto recibido desde una API.",
 task:"Agrega ciudad y teléfono a la tarjeta usando user.address.city y user.phone.",
 mini:"Mini proyecto: consulta /users y crea una tarjeta por cada usuario usando un for o for...of."
},
{
 id:"query",num:"09",cat:"fetch",title:"Parámetros de consulta",subtitle:"Filtrar o pedir una parte específica.",
 why:"Muchas APIs usan query parameters para buscar, ordenar, paginar o filtrar resultados.",
 key:"Los parámetros aparecen después de ? y se separan con &.",
 code:'const params = new URLSearchParams({\n  userId: 1\n});\n\nconst url = "https://jsonplaceholder.typicode.com/posts?" + params;\nconst response = await fetch(url);\nconst posts = await response.json();',
 result:`<p><b>URL final:</b></p><div class='json'>.../posts?userId=1</div><p>La respuesta contiene únicamente posts del usuario 1.</p>`,
 tip:"URLSearchParams evita concatenar manualmente muchos parámetros.",
 task:"Prueba /comments?postId=1 e identifica cuántos comentarios devuelve.",
 mini:"Mini proyecto: crea un select con userId 1–5 y consulta los posts del usuario seleccionado."
},
{
 id:"post",num:"10",cat:"crud",title:"POST: enviar JSON",subtitle:"Crear un recurso.",
 why:"Para enviar datos normalmente usarás method POST, un header Content-Type y un body convertido con JSON.stringify().",
 key:"headers describe el contenido · body contiene los datos enviados.",
 code:'const nuevoPost = {\n  title: "Mi primer post",\n  body: "Aprendiendo APIs",\n  userId: 1\n};\n\nconst response = await fetch(\n  "https://jsonplaceholder.typicode.com/posts",\n  {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(nuevoPost)\n  }\n);\n\nconst creado = await response.json();',
 result:`<span class='status'>201 Created</span><div class='json'>{\n  "title": "Mi primer post",\n  "body": "Aprendiendo APIs",\n  "userId": 1,\n  "id": 101\n}</div>`,
 tip:"JSONPlaceholder simula la creación: responde como si guardara, pero no persiste cambios reales.",
 task:"Cambia title, body y userId por datos propios; inspecciona el objeto que responde la API.",
 mini:"Mini proyecto: crea un formulario de título y contenido; al enviarlo, haz POST y muestra la respuesta."
},
{
 id:"put-patch",num:"11",cat:"crud",title:"PUT vs PATCH",subtitle:"Actualizar todo o solo una parte.",
 why:"PATCH suele enviar únicamente los campos que cambian. PUT suele representar el recurso completo.",
 key:"PATCH = cambio parcial · PUT = reemplazo completo según el diseño de la API.",
 code:'const response = await fetch(\n  "https://jsonplaceholder.typicode.com/posts/1",\n  {\n    method: "PATCH",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ title: "Título actualizado" })\n  }\n);\n\nconst actualizado = await response.json();',
 result:`<p>El recurso conserva sus demás campos y cambia el título solicitado.</p><div class='json'>{\n  "userId": 1,\n  "id": 1,\n  "title": "Título actualizado",\n  ...\n}</div>`,
 tip:"La semántica exacta de PUT/PATCH depende de la documentación de cada API.",
 task:"Haz un PATCH cambiando únicamente body y observa qué devuelve.",
 mini:"Mini proyecto: agrega un botón “Editar título” a un post y envía un PATCH."
},
{
 id:"delete",num:"12",cat:"crud",title:"DELETE",subtitle:"Solicitar la eliminación de un recurso.",
 why:"DELETE indica que quieres eliminar un recurso identificado por una ruta concreta.",
 key:"Una respuesta correcta puede traer JSON vacío o incluso no incluir cuerpo.",
 code:'const response = await fetch(\n  "https://jsonplaceholder.typicode.com/posts/1",\n  { method: "DELETE" }\n);\n\nif (!response.ok) {\n  throw new Error("HTTP " + response.status);\n}\n\nconsole.log("Eliminación solicitada");',
 result:`<span class='status'>200 OK</span><p>JSONPlaceholder confirma la operación con una respuesta vacía.</p>`,
 tip:"No llames response.json() a ciegas cuando una API responde 204 No Content.",
 task:"Investiga qué diferencia habría si el servidor respondiera 204 en vez de 200.",
 mini:"Mini proyecto: elimina visualmente una tarjeta solo cuando la petición DELETE termine correctamente."
},
{
 id:"headers-auth",num:"13",cat:"web",title:"Headers y autenticación",subtitle:"Información adicional que viaja con la petición.",
 why:"Algunas APIs requieren tokens. Estos suelen enviarse en un header Authorization.",
 key:"Nunca publiques claves secretas reales dentro del JavaScript del navegador.",
 code:'const response = await fetch(url, {\n  headers: {\n    "Accept": "application/json",\n    "Authorization": "Bearer TOKEN_DE_EJEMPLO"\n  }\n});',
 result:`<p><b>Request headers</b></p><div class='json'>Accept: application/json\nAuthorization: Bearer ...</div><p>El servidor decide si el token permite acceder.</p>`,
 tip:"Si una clave debe permanecer secreta, normalmente la petición sensible debe pasar por un backend.",
 task:"Abre DevTools → Network, entra a una petición y localiza Request Headers y Response Headers.",
 mini:"Mini proyecto: crea un diagrama Frontend → Backend → API externa para mostrar dónde debería vivir una clave secreta."
},
{
 id:"cors",num:"14",cat:"web",title:"CORS",subtitle:"Cuando el navegador bloquea una petición entre orígenes.",
 why:"CORS es una política aplicada por el navegador. El servidor debe autorizar qué orígenes pueden leer su respuesta.",
 key:"No es un error que se solucione desactivando seguridad del navegador en un proyecto real.",
 code:'// Ejemplo conceptual:\n// Tu web: https://mi-sitio.com\n// API:    https://api-externa.com\n//\n// El servidor de la API debe responder con\n// los headers CORS apropiados.',
 result:`<p>✅ API permite tu origen → JavaScript puede leer la respuesta.</p><p>⛔ API no lo permite → el navegador bloquea el acceso.</p>`,
 tip:"Si controlas el backend, configura CORS allí. Si no lo controlas, consulta la documentación de la API.",
 task:"Explica por qué Postman puede funcionar con una API mientras el navegador muestra un error CORS.",
 mini:"Mini proyecto: escribe un checklist de diagnóstico: URL, status, consola, Network, headers CORS."
},
{
 id:"paralelo",num:"15",cat:"fetch",title:"Varias peticiones con Promise.all",subtitle:"Esperar recursos independientes al mismo tiempo.",
 why:"Si dos peticiones no dependen una de otra, Promise.all puede esperarlas en paralelo.",
 key:"Promise.all devuelve un array con los resultados en el mismo orden de las Promises.",
 code:'const [usersResponse, postsResponse] = await Promise.all([\n  fetch("https://jsonplaceholder.typicode.com/users"),\n  fetch("https://jsonplaceholder.typicode.com/posts")\n]);\n\nconst [users, posts] = await Promise.all([\n  usersResponse.json(),\n  postsResponse.json()\n]);',
 result:`<p>👥 users y 📝 posts comienzan a consultarse sin esperar uno por uno.</p><p>Al final tienes ambos conjuntos de datos disponibles.</p>`,
 tip:"Úsalo cuando las peticiones sean independientes. Si B necesita un ID obtenido en A, hazlas en secuencia.",
 task:"Explica un caso donde Promise.all sí conviene y otro donde no.",
 mini:"Mini proyecto: carga usuarios y posts; muestra cuántos usuarios y cuántos posts llegaron."
},
{
 id:"cancelar",num:"16",cat:"web",title:"Cancelar una petición",subtitle:"AbortController para búsquedas o pantallas que cambian.",
 why:"A veces una petición deja de ser necesaria. AbortController permite cancelarla.",
 key:"signal conecta fetch con el controlador; abort() cancela la operación.",
 code:'const controller = new AbortController();\n\nfetch(url, { signal: controller.signal })\n  .catch(function(error) {\n    if (error.name === "AbortError") {\n      console.log("Petición cancelada");\n    }\n  });\n\ncontroller.abort();',
 result:`<p>La petición pendiente se interrumpe y puede controlarse como AbortError.</p>`,
 tip:"Es útil en buscadores donde el usuario escribe rápidamente y la consulta anterior ya no interesa.",
 task:"Describe qué problema puede ocurrir si llegan respuestas antiguas después de una búsqueda más reciente.",
 mini:"Mini proyecto: diseña un buscador que cancele la petición anterior antes de iniciar una nueva."
},
{
 id:"debug",num:"17",cat:"web",title:"Depurar APIs en DevTools",subtitle:"Console y Network son tus aliados.",
 why:"Cuando algo falla, mirar solo el código no basta. Network muestra qué petición salió, qué status llegó y qué respondió el servidor.",
 key:"Revisa: URL → método → status → request headers → response → console.",
 code:'console.log("URL:", url);\nconsole.log("Status:", response.status);\nconsole.log("OK:", response.ok);\nconsole.log("Datos:", datos);',
 result:`<h4>Checklist rápido</h4><p>1. ¿La URL es correcta?</p><p>2. ¿La petición aparece en Network?</p><p>3. ¿Cuál es el status?</p><p>4. ¿Qué trae Response?</p><p>5. ¿Hay error CORS o JavaScript?</p>`,
 tip:"Diagnostica primero el tipo de fallo; después corrige.",
 task:"Provoca un 404 a propósito y encuentra la petición en Network.",
 mini:"Mini proyecto: crea una ficha de diagnóstico con URL, método, status y mensaje de error."
},
{
 id:"estructura",num:"18",cat:"web",title:"Estructura mínima del proyecto",subtitle:"Separar interfaz, estilos y lógica de API.",
 why:"Para un proyecto pequeño bastan tres archivos. El HTML define la vista, CSS presenta y app.js realiza peticiones y actualiza el DOM.",
 key:"No necesitas un framework para aprender APIs.",
 code:"mi-proyecto-api/\n├── index.html\n├── style.css\n└── app.js",
 result:`<p><b>index.html</b> → botones, inputs y contenedores</p><p><b>style.css</b> → diseño</p><p><b>app.js</b> → fetch, errores y DOM</p>`,
 tip:"En HTML enlaza style.css y usa <code>&lt;script src='app.js' defer&gt;&lt;/script&gt;</code>.",
 task:"Crea esa estructura vacía y comprueba que app.js se ejecute con un console.log.",
 mini:"Mini proyecto: prepara la carpeta del proyecto final y deja listo un botón “Cargar usuarios”."
}
];

const content = document.getElementById("content");
const nav = document.getElementById("nav");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const progress = document.getElementById("progress");
let done = JSON.parse(localStorage.getItem("api-js-progress") || "{}");

function escapeCode(text){
  return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function render(){
  const q = search.value.toLowerCase().trim();
  const f = filter.value;
  content.innerHTML = "";
  nav.innerHTML = "";
  lessons.forEach(function(l){
    const hay = (l.title+" "+l.subtitle+" "+l.why+" "+l.code+" "+l.tip).toLowerCase().includes(q);
    const categoria = f === "all" || l.cat === f;
    if(!hay || !categoria) return;

    const n = document.createElement("button");
    n.className = "navbtn";
    n.innerHTML = l.num+" · "+l.title+"<small>"+l.subtitle+"</small>";
    n.onclick = function(){ document.getElementById(l.id).scrollIntoView({behavior:"smooth"}); };
    nav.appendChild(n);

    const s = document.createElement("section");
    s.className = "section";
    s.id = l.id;
    s.innerHTML =
      "<div class='section-head'><div class='num'>"+l.num+"</div><div><h2>"+l.title+"</h2><p>"+l.subtitle+"</p></div></div>"+
      "<article class='lesson'><div class='lesson-grid'>"+
      "<div class='panel explain'><div class='kicker'>QUÉ NECESITAS ENTENDER</div><h3>"+l.title+"</h3><p>"+l.why+"</p><div class='key'><b>Clave:</b> "+l.key+"</div><div class='tip'>💡 "+l.tip+"</div></div>"+
      "<div class='panel code'><div class='panel-head'><span>CÓDIGO / EJEMPLO</span><button class='copy'>Copiar</button></div><pre>"+escapeCode(l.code)+"</pre></div>"+
      "<div class='panel preview'><div class='panel-head'><span>ASÍ SE VE / QUÉ OCURRE</span></div><div class='output'>"+l.result+"</div></div>"+
      "</div></article>"+
      "<div class='activity'><div class='task'><h4>✍ Ejercicio corto</h4><p>"+l.task+"</p></div><div class='mini'><h4>🧩 Mini proyecto</h4><p>"+l.mini+"</p><label class='check'><input type='checkbox' data-id='"+l.id+"' "+(done[l.id]?"checked":"")+"> Marcar esta lección como completada</label></div></div>";
    s.querySelector(".copy").onclick = function(){
      navigator.clipboard.writeText(l.code);
      this.textContent = "Copiado ✓";
      const b = this;
      setTimeout(function(){ b.textContent = "Copiar"; },1200);
    };
    content.appendChild(s);
  });
  bindChecks();
  updateProgress();
}
function bindChecks(){
  document.querySelectorAll("[data-id]").forEach(function(c){
    c.onchange = function(){
      done[c.dataset.id] = c.checked;
      localStorage.setItem("api-js-progress", JSON.stringify(done));
      updateProgress();
    };
  });
}
function updateProgress(){
  const count = lessons.filter(function(l){ return done[l.id]; }).length;
  progress.style.width = Math.round(count/lessons.length*100)+"%";
}
search.oninput = render;
filter.onchange = render;
document.getElementById("resetProgress").onclick = function(){
  done={}; localStorage.removeItem("api-js-progress"); render();
};
document.getElementById("themeBtn").onclick = function(){
  document.body.classList.toggle("light");
};

document.getElementById("sendRequest").onclick = async function(){
  const box = document.getElementById("apiConsole");
  const endpoint = document.getElementById("endpoint").value.trim();
  const method = document.getElementById("method").value;
  box.textContent = "Enviando "+method+" "+endpoint+" ...";
  try{
    const options = {method:method};
    if(method === "POST"){
      options.headers = {"Content-Type":"application/json"};
      options.body = JSON.stringify({title:"Prueba desde API JS Academy",body:"Hola API",userId:1});
    }
    const response = await fetch(endpoint, options);
    const text = await response.text();
    let pretty = text;
    try{ pretty = JSON.stringify(JSON.parse(text), null, 2); }catch(e){}
    box.textContent = "HTTP "+response.status+" · ok="+response.ok+"\n\n"+pretty;
  }catch(error){
    box.textContent = "Error: "+error.message+"\n\nRevisa la URL, la consola y posibles restricciones CORS.";
  }
};

let usersCache=[];
function drawUsers(list){
  const grid=document.getElementById("userGrid");
  grid.innerHTML="";
  list.forEach(function(user){
    const card=document.createElement("article");
    card.className="user-card";
    const name=document.createElement("b");
    const email=document.createElement("small");
    name.textContent=user.name;
    email.textContent=user.email+" · "+user.address.city;
    card.append(name,email);
    grid.appendChild(card);
  });
}
document.getElementById("loadUsers").onclick=async function(){
  const status=document.getElementById("userStatus");
  const searchInput=document.getElementById("userSearch");
  status.textContent="Cargando usuarios...";
  try{
    const response=await fetch("https://jsonplaceholder.typicode.com/users");
    if(!response.ok) throw new Error("HTTP "+response.status);
    usersCache=await response.json();
    status.textContent="Listo: "+usersCache.length+" usuarios.";
    searchInput.disabled=false;
    drawUsers(usersCache);
  }catch(error){
    status.textContent="No se pudieron cargar los usuarios: "+error.message;
  }
};
document.getElementById("userSearch").oninput=function(){
  const q=this.value.toLowerCase();
  drawUsers(usersCache.filter(function(u){return u.name.toLowerCase().includes(q);}));
};

render();
