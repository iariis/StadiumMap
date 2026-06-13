<!doctype html>
<html lang="es" class="h-full">
 <head><script src="/_sdk/telemetry_sdk.js"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StadiumMap 2026</title>
  <script src="https://cdn.tailwindcss.com/3.4.17"></script>
  <script src="https://cdn.jsdelivr.net/npm/lucide@0.263.0/dist/umd/lucide.min.js"></script>
  <script src="/_sdk/element_sdk.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: '#0A2540',
            fifa: '#00AEEF',
            gold: '#D4AF37',
            grass: '#2E7D32',
            surface: '#0F3052'
          },
          fontFamily: {
            outfit: ['Outfit', 'sans-serif']
          }
        }
      }
    }
  </script>
  <style>
    * { font-family: 'Outfit', sans-serif; }
    .nav-item.active { background: rgba(0,174,239,0.15); color: #00AEEF; border-left: 3px solid #00AEEF; }
    .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
    .fade-in { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0A2540; }
    ::-webkit-scrollbar-thumb { background: #1a3a5c; border-radius: 3px; }
    .mobile-nav { display: none; }
    @media (max-width: 768px) {
      .sidebar { display: none !important; }
      .mobile-nav { display: flex !important; }
      .main-content { margin-left: 0 !important; }
    }
  </style>
  <style>body { box-sizing: border-box; }</style>
  <script src="/_sdk/data_sdk.js" type="text/javascript"></script>
 </head>
 <body class="h-full bg-navy text-white overflow-hidden">
  <div id="app" class="h-full w-full flex flex-col"><!-- Login Screen -->
   <div id="login-screen" class="h-full w-full flex items-center justify-center" style="background: linear-gradient(135deg, #0A2540 0%, #0F3052 50%, #0A2540 100%);">
    <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22><rect fill=%22none%22 stroke=%2200AEEF%22 stroke-width=%220.5%22 width=%2260%22 height=%2260%22/></svg>');"></div>
    <div class="relative z-10 w-full max-w-md mx-4 bg-surface/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl fade-in">
     <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 mb-4">
       <div class="w-12 h-12 bg-fifa rounded-xl flex items-center justify-center"><i data-lucide="map-pin" class="w-6 h-6 text-white"></i>
       </div>
      </div>
      <h1 class="text-3xl font-bold text-white" id="login-title">StadiumMap 2026</h1>
      <p class="text-white/50 mt-1 text-sm">FIFA World Cup • Stadiums &amp; Venues</p>
     </div>
     <div class="space-y-4">
      <div><label class="text-xs text-white/60 mb-1 block">Usuario</label> <input type="text" placeholder="correo@ejemplo.com" class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fifa transition">
      </div>
      <div><label class="text-xs text-white/60 mb-1 block">Contraseña</label> <input type="password" placeholder="••••••••" class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fifa transition">
      </div><button onclick="navigateTo('home')" class="w-full bg-fifa hover:bg-fifa/80 text-white font-semibold py-3 rounded-xl transition mt-2">Iniciar Sesión</button>
      <p class="text-center text-white/40 text-sm">¿No tienes cuenta? <a href="#" onclick="navigateTo('register')" class="text-fifa hover:underline">Regístrate</a></p>
     </div>
    </div>
   </div><!-- Register Screen -->
   <div id="register-screen" class="h-full w-full flex items-center justify-center hidden" style="background: linear-gradient(135deg, #0A2540 0%, #0F3052 50%, #0A2540 100%);">
    <div class="relative z-10 w-full max-w-md mx-4 bg-surface/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl fade-in">
     <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white">Crear Cuenta</h1>
      <p class="text-white/50 text-sm">Únete a StadiumMap 2026</p>
     </div>
     <div class="space-y-3">
      <div>
       <label class="text-xs text-white/60 mb-1 block">Nombre</label><input type="text" placeholder="Tu nombre" class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fifa transition">
      </div>
      <div>
       <label class="text-xs text-white/60 mb-1 block">Correo electrónico</label><input type="email" placeholder="correo@ejemplo.com" class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fifa transition">
      </div>
      <div>
       <label class="text-xs text-white/60 mb-1 block">Contraseña</label><input type="password" placeholder="••••••••" class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fifa transition">
      </div>
      <div>
       <label class="text-xs text-white/60 mb-1 block">Confirmar contraseña</label><input type="password" placeholder="••••••••" class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fifa transition">
      </div><button onclick="navigateTo('home')" class="w-full bg-fifa hover:bg-fifa/80 text-white font-semibold py-3 rounded-xl transition">Crear Cuenta</button>
      <p class="text-center text-white/40 text-sm"><a href="#" onclick="navigateTo('login')" class="text-fifa hover:underline">← Volver al login</a></p>
     </div>
    </div>
   </div><!-- Main App -->
   <div id="main-app" class="h-full w-full hidden flex-col"><!-- Top Navbar -->
    <header class="w-full bg-surface/90 backdrop-blur border-b border-white/5 px-4 md:px-6 py-3 flex items-center justify-between shrink-0 z-50">
     <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-fifa rounded-lg flex items-center justify-center">
       <i data-lucide="map-pin" class="w-4 h-4 text-white"></i>
      </div><span class="font-bold text-lg hidden md:block" id="navbar-title">StadiumMap 2026</span>
     </div>
     <div class="flex-1 max-w-md mx-4">
      <div class="relative"><i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"></i> <input type="text" placeholder="Buscar partidos, estadios, ciudades..." class="w-full bg-navy/60 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-fifa transition">
      </div>
     </div>
     <div class="flex items-center gap-3"><button class="w-8 h-8 rounded-full bg-navy/60 flex items-center justify-center"><i data-lucide="bell" class="w-4 h-4 text-white/60"></i></button>
      <div onclick="navigateTo('profile')" class="w-9 h-9 rounded-full bg-gradient-to-br from-fifa to-grass flex items-center justify-center cursor-pointer text-sm font-bold">
       JD
      </div>
     </div>
    </header>
    <div class="flex flex-1 overflow-hidden"><!-- Sidebar -->
     <aside class="sidebar w-56 bg-surface/50 border-r border-white/5 py-4 flex flex-col shrink-0 overflow-y-auto">
      <nav class="space-y-1 px-3">
       <div class="nav-item active flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm" onclick="showPage('home')">
        <i data-lucide="home" class="w-4 h-4"></i>Inicio
       </div>
       <div class="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm text-white/60 hover:text-white hover:bg-white/5 transition" onclick="showPage('stadiums')">
        <i data-lucide="building" class="w-4 h-4"></i>Estadios
       </div>
       <div class="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm text-white/60 hover:text-white hover:bg-white/5 transition" onclick="showPage('map')">
        <i data-lucide="map" class="w-4 h-4"></i>Mapa
       </div>
       <div class="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm text-white/60 hover:text-white hover:bg-white/5 transition" onclick="showPage('admin')">
        <i data-lucide="settings" class="w-4 h-4"></i>Admin
       </div>
       <div class="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm text-white/60 hover:text-white hover:bg-white/5 transition" onclick="showPage('profile')">
        <i data-lucide="user" class="w-4 h-4"></i>Perfil
       </div>
      </nav>
      <div class="mt-auto px-4 pt-4 border-t border-white/5 mx-3">
       <div class="text-xs text-white/30">
        FIFA World Cup 2026
       </div>
       <div class="text-xs text-gold font-medium mt-1">
        🏆 USA • MEX • CAN
       </div>
      </div>
     </aside><!-- Content Area -->
     <main class="main-content flex-1 overflow-y-auto p-4 md:p-6"><!-- HOME PAGE -->
      <div id="page-home" class="fade-in">
       <div class="flex items-center justify-between mb-6">
        <div>
         <h2 class="text-2xl font-bold">Partidos del Mundial</h2>
         <p class="text-white/50 text-sm">Calendario completo FIFA World Cup 2026</p>
        </div>
        <div class="flex gap-2"><select class="bg-navy/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:outline-none"> <option>Todos los países</option><option>USA</option><option>México</option><option>Canadá</option> </select> <select class="bg-navy/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:outline-none"> <option>Todos los estadios</option> </select>
        </div>
       </div>
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="matches-grid"></div>
      </div><!-- MATCH DETAIL -->
      <div id="page-match-detail" class="fade-in hidden"><button onclick="showPage('home')" class="flex items-center gap-2 text-fifa text-sm mb-4 hover:underline"><i data-lucide="arrow-left" class="w-4 h-4"></i>Volver</button>
       <div id="match-detail-content"></div>
      </div><!-- STADIUMS PAGE -->
      <div id="page-stadiums" class="fade-in hidden">
       <div class="flex items-center justify-between mb-6">
        <div>
         <h2 class="text-2xl font-bold">Estadios Oficiales</h2>
         <p class="text-white/50 text-sm">16 sedes del Mundial 2026</p>
        </div>
        <div class="flex gap-2"><span class="px-3 py-1 bg-fifa/20 text-fifa rounded-full text-xs font-medium cursor-pointer" onclick="filterStadiums('all')">Todos</span> <span class="px-3 py-1 bg-white/5 text-white/60 rounded-full text-xs cursor-pointer hover:bg-white/10" onclick="filterStadiums('USA')">🇺🇸 USA</span> <span class="px-3 py-1 bg-white/5 text-white/60 rounded-full text-xs cursor-pointer hover:bg-white/10" onclick="filterStadiums('México')">🇲🇽 MEX</span> <span class="px-3 py-1 bg-white/5 text-white/60 rounded-full text-xs cursor-pointer hover:bg-white/10" onclick="filterStadiums('Canadá')">🇨🇦 CAN</span>
        </div>
       </div>
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="stadiums-grid"></div>
      </div><!-- STADIUM DETAIL -->
      <div id="page-stadium-detail" class="fade-in hidden"><button onclick="showPage('stadiums')" class="flex items-center gap-2 text-fifa text-sm mb-4 hover:underline"><i data-lucide="arrow-left" class="w-4 h-4"></i>Volver</button>
       <div id="stadium-detail-content"></div>
      </div><!-- MAP PAGE -->
      <div id="page-map" class="fade-in hidden">
       <h2 class="text-2xl font-bold mb-2">Mapa Interactivo</h2>
       <p class="text-white/50 text-sm mb-4">Sedes del Mundial 2026 en Norteamérica</p>
       <div class="relative w-full bg-surface rounded-2xl border border-white/10 overflow-hidden" style="height: 70%;">
        <svg viewbox="0 0 800 500" class="w-full h-full" id="map-svg"><!-- Simplified North America --> <path d="M100,80 L200,60 L350,50 L450,40 L550,60 L650,80 L700,120 L720,180 L700,240 L650,280 L600,300 L550,320 L500,340 L480,380 L450,400 L400,420 L350,400 L300,380 L280,350 L260,320 L240,300 L200,280 L160,260 L140,220 L120,180 L100,140 Z" fill="#1a3a5c" stroke="#00AEEF" stroke-width="0.5" opacity="0.4" /> <!-- Mexico --> <path d="M200,320 L280,300 L320,320 L350,350 L370,380 L350,400 L320,410 L280,400 L240,380 L220,360 L200,340 Z" fill="#1a4a3c" stroke="#2E7D32" stroke-width="0.5" opacity="0.4" /> <!-- Stadium markers will be added by JS -->
        </svg>
        <div id="map-tooltip" class="absolute hidden bg-surface/95 backdrop-blur border border-white/10 rounded-xl p-4 shadow-2xl z-10 w-64"></div>
       </div>
      </div><!-- ADMIN PAGE -->
      <div id="page-admin" class="fade-in hidden">
       <div class="flex items-center justify-between mb-6">
        <div>
         <h2 class="text-2xl font-bold">Panel Administrador</h2>
         <p class="text-white/50 text-sm">CRUD de Estadios</p>
        </div><button class="bg-fifa hover:bg-fifa/80 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition" onclick="showAdminModal()"><i data-lucide="plus" class="w-4 h-4"></i>Nuevo Estadio</button>
       </div>
       <div class="bg-surface/50 rounded-2xl border border-white/10 overflow-hidden">
        <div class="overflow-x-auto">
         <table class="w-full text-sm">
          <thead>
           <tr class="border-b border-white/10 text-white/50 text-xs">
            <th class="text-left px-4 py-3">Estadio</th>
            <th class="text-left px-4 py-3">Ciudad</th>
            <th class="text-left px-4 py-3">País</th>
            <th class="text-left px-4 py-3">Capacidad</th>
            <th class="text-left px-4 py-3">Acciones</th>
           </tr>
          </thead>
          <tbody id="admin-table"></tbody>
         </table>
        </div>
       </div>
      </div><!-- PROFILE PAGE -->
      <div id="page-profile" class="fade-in hidden">
       <h2 class="text-2xl font-bold mb-6">Mi Perfil</h2>
       <div class="bg-surface/50 rounded-2xl border border-white/10 p-6 max-w-lg">
        <div class="flex items-center gap-4 mb-6">
         <div class="w-16 h-16 rounded-full bg-gradient-to-br from-fifa to-grass flex items-center justify-center text-2xl font-bold">
          JD
         </div>
         <div>
          <h3 class="text-lg font-semibold">Juan Díaz</h3>
          <p class="text-white/50 text-sm">juan@ejemplo.com</p><span class="px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full font-medium">Admin</span>
         </div>
        </div>
        <div class="space-y-3 border-t border-white/10 pt-4">
         <div class="flex justify-between text-sm">
          <span class="text-white/50">Rol</span><span>Administrador</span>
         </div>
         <div class="flex justify-between text-sm">
          <span class="text-white/50">Búsquedas recientes</span><span>12</span>
         </div>
         <div class="flex justify-between text-sm">
          <span class="text-white/50">Estadios consultados</span><span>8</span>
         </div>
        </div>
        <div class="mt-6 pt-4 border-t border-white/10">
         <h4 class="text-sm font-medium mb-3 text-white/70">Estadios consultados recientemente</h4>
         <div class="flex flex-wrap gap-2"><span class="px-3 py-1 bg-navy/60 rounded-full text-xs text-white/70">MetLife Stadium</span> <span class="px-3 py-1 bg-navy/60 rounded-full text-xs text-white/70">Estadio Azteca</span> <span class="px-3 py-1 bg-navy/60 rounded-full text-xs text-white/70">SoFi Stadium</span>
         </div>
        </div><button onclick="navigateTo('login')" class="mt-6 w-full bg-red-500/20 text-red-400 py-2 rounded-xl text-sm hover:bg-red-500/30 transition">Cerrar Sesión</button>
       </div>
      </div>
     </main>
    </div><!-- Mobile Bottom Nav -->
    <nav class="mobile-nav fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur border-t border-white/10 px-2 py-2 justify-around z-50" style="display:none;"><button onclick="showPage('home')" class="flex flex-col items-center gap-0.5 text-fifa"><i data-lucide="home" class="w-5 h-5"></i><span class="text-[10px]">Inicio</span></button> <button onclick="showPage('stadiums')" class="flex flex-col items-center gap-0.5 text-white/50"><i data-lucide="building" class="w-5 h-5"></i><span class="text-[10px]">Estadios</span></button> <button onclick="showPage('map')" class="flex flex-col items-center gap-0.5 text-white/50"><i data-lucide="map" class="w-5 h-5"></i><span class="text-[10px]">Mapa</span></button> <button onclick="showPage('admin')" class="flex flex-col items-center gap-0.5 text-white/50"><i data-lucide="settings" class="w-5 h-5"></i><span class="text-[10px]">Admin</span></button> <button onclick="showPage('profile')" class="flex flex-col items-center gap-0.5 text-white/50"><i data-lucide="user" class="w-5 h-5"></i><span class="text-[10px]">Perfil</span></button>
    </nav>
   </div><!-- Admin Modal -->
   <div id="admin-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] hidden flex items-center justify-center p-4">
    <div class="bg-surface rounded-2xl border border-white/10 p-6 w-full max-w-md shadow-2xl">
     <h3 class="text-lg font-bold mb-4">Nuevo Estadio</h3>
     <div class="space-y-3"><input placeholder="Nombre del estadio" class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-fifa"> <input placeholder="Ciudad" class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-fifa"> <select class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 focus:outline-none"><option>USA</option><option>México</option><option>Canadá</option></select> <input placeholder="Capacidad" type="number" class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-fifa"> <input placeholder="Año inauguración" type="number" class="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-fifa">
     </div>
     <div class="flex gap-3 mt-5"><button onclick="hideAdminModal()" class="flex-1 bg-white/5 text-white/70 py-2.5 rounded-xl text-sm hover:bg-white/10 transition">Cancelar</button> <button onclick="hideAdminModal()" class="flex-1 bg-fifa text-white py-2.5 rounded-xl text-sm font-medium hover:bg-fifa/80 transition">Guardar</button>
     </div>
    </div>
   </div>
  </div>
  <script>
    // Data
    const stadiums = [
      {name:"MetLife Stadium",city:"Nueva Jersey",country:"USA",capacity:82500,year:2010,matches:4,lat:250,lng:580},
      {name:"AT&T Stadium",city:"Dallas",country:"USA",capacity:80000,year:2009,matches:4,lat:320,lng:420},
      {name:"Mercedes-Benz Stadium",city:"Atlanta",country:"USA",capacity:71000,year:2017,matches:4,lat:310,lng:530},
      {name:"SoFi Stadium",city:"Los Ángeles",country:"USA",capacity:70000,year:2020,matches:5,lat:310,lng:200},
      {name:"NRG Stadium",city:"Houston",country:"USA",capacity:72220,year:2002,matches:4,lat:350,lng:400},
      {name:"Arrowhead Stadium",city:"Kansas City",country:"USA",capacity:76416,year:1972,matches:3,lat:270,lng:400},
      {name:"Lincoln Financial Field",city:"Filadelfia",country:"USA",capacity:69176,year:2003,matches:4,lat:260,lng:570},
      {name:"Lumen Field",city:"Seattle",country:"USA",capacity:68740,year:2002,matches:4,lat:170,lng:180},
      {name:"Gillette Stadium",city:"Boston",country:"USA",capacity:65878,year:2002,matches:3,lat:230,lng:600},
      {name:"Hard Rock Stadium",city:"Miami",country:"USA",capacity:64767,year:1987,matches:4,lat:380,lng:560},
      {name:"Levi's Stadium",city:"San Francisco",country:"USA",capacity:68500,year:2014,matches:4,lat:270,lng:170},
      {name:"Estadio Azteca",city:"Ciudad de México",country:"México",capacity:87523,year:1966,matches:4,lat:380,lng:330},
      {name:"Estadio BBVA",city:"Monterrey",country:"México",capacity:53500,year:2015,matches:3,lat:350,lng:360},
      {name:"Estadio Akron",city:"Guadalajara",country:"México",capacity:49850,year:2010,matches:3,lat:370,lng:300},
      {name:"BC Place",city:"Vancouver",country:"Canadá",capacity:54500,year:1983,matches:4,lat:150,lng:190},
      {name:"BMO Field",city:"Toronto",country:"Canadá",capacity:45736,year:2007,matches:4,lat:200,lng:540}
    ];

    const matches = [
      {home:"México",away:"Irlanda",date:"2026-06-11",time:"18:00",stadium:11,phase:"Grupo"},
      {home:"USA",away:"Brasil",date:"2026-06-12",time:"21:00",stadium:0,phase:"Grupo"},
      {home:"Argentina",away:"Canadá",date:"2026-06-13",time:"16:00",stadium:15,phase:"Grupo"},
      {home:"Alemania",away:"Japón",date:"2026-06-14",time:"19:00",stadium:3,phase:"Grupo"},
      {home:"Francia",away:"Australia",date:"2026-06-15",time:"20:00",stadium:1,phase:"Grupo"},
      {home:"España",away:"Corea del Sur",date:"2026-06-16",time:"17:00",stadium:4,phase:"Grupo"},
      {home:"Inglaterra",away:"Senegal",date:"2026-06-17",time:"18:00",stadium:6,phase:"Grupo"},
      {home:"Portugal",away:"Ghana",date:"2026-06-18",time:"21:00",stadium:2,phase:"Grupo"},
      {home:"Países Bajos",away:"Ecuador",date:"2026-06-19",time:"16:00",stadium:7,phase:"Grupo"},
    ];

    const flags = {"México":"🇲🇽","USA":"🇺🇸","Brasil":"🇧🇷","Argentina":"🇦🇷","Canadá":"🇨🇦","Alemania":"🇩🇪","Japón":"🇯🇵","Francia":"🇫🇷","Australia":"🇦🇺","España":"🇪🇸","Corea del Sur":"🇰🇷","Inglaterra":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Senegal":"🇸🇳","Portugal":"🇵🇹","Ghana":"🇬🇭","Países Bajos":"🇳🇱","Ecuador":"🇪🇨","Irlanda":"🇮🇪"};

    // Navigation
    function navigateTo(screen) {
      document.querySelectorAll('#login-screen,#register-screen,#main-app').forEach(el => el.classList.add('hidden'));
      if(screen === 'login') document.getElementById('login-screen').classList.remove('hidden');
      else if(screen === 'register') document.getElementById('register-screen').classList.remove('hidden');
      else { document.getElementById('main-app').classList.remove('hidden'); document.getElementById('main-app').style.display='flex'; showPage('home'); }
    }

    function showPage(page) {
      document.querySelectorAll('[id^="page-"]').forEach(el => el.classList.add('hidden'));
      document.getElementById('page-'+page).classList.remove('hidden');
      // Update nav
      document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-item').forEach(el => { if(el.textContent.trim().toLowerCase().includes(page === 'home' ? 'inicio' : page === 'stadiums' ? 'estadio' : page)) el.classList.add('active'); });
      if(page === 'home') renderMatches();
      if(page === 'stadiums') renderStadiums();
      if(page === 'map') renderMap();
      if(page === 'admin') renderAdminTable();
    }

    function renderMatches() {
      const grid = document.getElementById('matches-grid');
      grid.innerHTML = matches.map((m,i) => `
        <div class="card-hover bg-surface/70 rounded-2xl border border-white/10 p-4 cursor-pointer" onclick="showMatchDetail(${i})">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs text-fifa bg-fifa/10 px-2 py-0.5 rounded-full">${m.phase}</span>
            <span class="text-xs text-white/40">${m.date}</span>
          </div>
          <div class="flex items-center justify-between mb-3">
            <div class="text-center flex-1"><span class="text-2xl">${flags[m.home]||'🏳️'}</span><p class="text-xs mt-1 text-white/80">${m.home}</p></div>
            <div class="text-center px-3"><span class="text-xs text-gold font-bold">VS</span><p class="text-xs text-white/40 mt-1">${m.time}</p></div>
            <div class="text-center flex-1"><span class="text-2xl">${flags[m.away]||'🏳️'}</span><p class="text-xs mt-1 text-white/80">${m.away}</p></div>
          </div>
          <div class="border-t border-white/5 pt-2 flex items-center gap-2">
            <i data-lucide="map-pin" class="w-3 h-3 text-white/40"></i>
            <span class="text-xs text-white/50">${stadiums[m.stadium].name} • ${stadiums[m.stadium].city}</span>
          </div>
        </div>
      `).join('');
      lucide.createIcons();
    }

    function showMatchDetail(idx) {
      const m = matches[idx]; const s = stadiums[m.stadium];
      document.getElementById('match-detail-content').innerHTML = `
        <div class="bg-surface/70 rounded-2xl border border-white/10 p-6 max-w-2xl">
          <div class="flex items-center justify-center gap-8 mb-6">
            <div class="text-center"><span class="text-5xl">${flags[m.home]||'🏳️'}</span><p class="text-lg font-semibold mt-2">${m.home}</p></div>
            <div class="text-center"><span class="text-2xl text-gold font-black">VS</span><p class="text-sm text-white/40 mt-1">${m.time}</p></div>
            <div class="text-center"><span class="text-5xl">${flags[m.away]||'🏳️'}</span><p class="text-lg font-semibold mt-2">${m.away}</p></div>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm border-t border-white/10 pt-4">
            <div><span class="text-white/50">Fecha</span><p class="font-medium">${m.date}</p></div>
            <div><span class="text-white/50">Fase</span><p class="font-medium">${m.phase}</p></div>
            <div><span class="text-white/50">Estadio</span><p class="font-medium">${s.name}</p></div>
            <div><span class="text-white/50">Ciudad</span><p class="font-medium">${s.city}, ${s.country}</p></div>
            <div><span class="text-white/50">Capacidad</span><p class="font-medium">${s.capacity.toLocaleString()}</p></div>
            <div><span class="text-white/50">Año apertura</span><p class="font-medium">${s.year}</p></div>
          </div>
          <button onclick="showPage('map')" class="mt-4 bg-fifa/20 text-fifa px-4 py-2 rounded-xl text-sm hover:bg-fifa/30 transition flex items-center gap-2"><i data-lucide="map" class="w-4 h-4"></i>Ver en mapa</button>
        </div>
      `;
      showPage('match-detail');
      lucide.createIcons();
    }

    function renderStadiums(filter) {
      const list = filter && filter!=='all' ? stadiums.filter(s=>s.country===filter) : stadiums;
      document.getElementById('stadiums-grid').innerHTML = list.map((s,i) => `
        <div class="card-hover bg-surface/70 rounded-2xl border border-white/10 overflow-hidden cursor-pointer" onclick="showStadiumDetail(${stadiums.indexOf(s)})">
          <div class="h-32 bg-gradient-to-br from-navy via-surface to-fifa/20 flex items-center justify-center"><i data-lucide="building" class="w-12 h-12 text-white/20"></i></div>
          <div class="p-4">
            <h3 class="font-semibold text-sm">${s.name}</h3>
            <p class="text-xs text-white/50 mt-1">${s.city}, ${s.country}</p>
            <div class="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
              <span class="text-xs text-white/40"><i data-lucide="users" class="w-3 h-3 inline mr-1"></i>${s.capacity.toLocaleString()}</span>
              <span class="text-xs text-gold">${s.matches} partidos</span>
            </div>
          </div>
        </div>
      `).join('');
      lucide.createIcons();
    }
    function filterStadiums(c){renderStadiums(c);}

    function showStadiumDetail(idx) {
      const s = stadiums[idx];
      const sMatches = matches.filter(m=>m.stadium===idx);
      document.getElementById('stadium-detail-content').innerHTML = `
        <div class="max-w-3xl">
          <div class="h-48 bg-gradient-to-br from-navy via-surface to-fifa/20 rounded-2xl flex items-center justify-center mb-6 border border-white/10"><i data-lucide="building" class="w-20 h-20 text-white/15"></i></div>
          <h2 class="text-2xl font-bold">${s.name}</h2>
          <p class="text-white/50 mb-4">${s.city}, ${s.country}</p>
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-surface/50 rounded-xl p-3 border border-white/10 text-center"><p class="text-2xl font-bold text-fifa">${s.capacity.toLocaleString()}</p><p class="text-xs text-white/50">Capacidad</p></div>
            <div class="bg-surface/50 rounded-xl p-3 border border-white/10 text-center"><p class="text-2xl font-bold text-gold">${s.year}</p><p class="text-xs text-white/50">Inauguración</p></div>
            <div class="bg-surface/50 rounded-xl p-3 border border-white/10 text-center"><p class="text-2xl font-bold text-grass">${s.matches}</p><p class="text-xs text-white/50">Partidos</p></div>
          </div>
          ${sMatches.length ? `<h3 class="font-semibold mb-3">Partidos programados</h3><div class="space-y-2">${sMatches.map(m=>`<div class="bg-surface/50 rounded-xl p-3 border border-white/10 flex items-center justify-between"><span class="text-sm">${flags[m.home]||''} ${m.home} vs ${m.away} ${flags[m.away]||''}</span><span class="text-xs text-white/40">${m.date}</span></div>`).join('')}</div>` : ''}
          <div class="flex gap-3 mt-6">
            <button class="bg-grass/20 text-grass px-4 py-2 rounded-xl text-sm flex items-center gap-2"><i data-lucide="edit" class="w-4 h-4"></i>Editar</button>
            <button class="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm flex items-center gap-2"><i data-lucide="trash-2" class="w-4 h-4"></i>Eliminar</button>
          </div>
        </div>
      `;
      showPage('stadium-detail');
      lucide.createIcons();
    }

    function renderMap() {
      const svg = document.getElementById('map-svg');
      // Remove old markers
      svg.querySelectorAll('.stadium-marker').forEach(el=>el.remove());
      stadiums.forEach((s,i) => {
        const g = document.createElementNS('http://www.w3.org/2000/svg','g');
        g.classList.add('stadium-marker');
        g.style.cursor = 'pointer';
        g.innerHTML = `<circle cx="${s.lng}" cy="${s.lat}" r="6" fill="#00AEEF" stroke="#fff" stroke-width="1.5" opacity="0.9"/><circle cx="${s.lng}" cy="${s.lat}" r="10" fill="#00AEEF" opacity="0.2"/>`;
        g.onclick = (e) => showMapTooltip(e, s, i);
        svg.appendChild(g);
      });
    }

    function showMapTooltip(e, s, idx) {
      const tooltip = document.getElementById('map-tooltip');
      const sMatches = matches.filter(m=>m.stadium===idx);
      tooltip.innerHTML = `
        <h4 class="font-bold text-sm">${s.name}</h4>
        <p class="text-xs text-white/50 mt-1">${s.city}, ${s.country}</p>
        <p class="text-xs text-white/40 mt-1">Capacidad: ${s.capacity.toLocaleString()}</p>
        <p class="text-xs text-gold mt-2">${sMatches.length} partido(s)</p>
        ${sMatches.slice(0,2).map(m=>`<p class="text-xs text-white/60 mt-1">${m.home} vs ${m.away}</p>`).join('')}
        <button onclick="document.getElementById('map-tooltip').classList.add('hidden')" class="mt-2 text-xs text-fifa hover:underline">Cerrar</button>
      `;
      tooltip.style.left = Math.min(e.offsetX + 10, 500) + 'px';
      tooltip.style.top = Math.min(e.offsetY - 10, 350) + 'px';
      tooltip.classList.remove('hidden');
    }

    function renderAdminTable() {
      document.getElementById('admin-table').innerHTML = stadiums.map((s,i) => `
        <tr class="border-b border-white/5 hover:bg-white/5 transition">
          <td class="px-4 py-3 font-medium">${s.name}</td>
          <td class="px-4 py-3 text-white/60">${s.city}</td>
          <td class="px-4 py-3 text-white/60">${s.country}</td>
          <td class="px-4 py-3 text-white/60">${s.capacity.toLocaleString()}</td>
          <td class="px-4 py-3"><div class="flex gap-2"><button class="text-fifa hover:text-white text-xs"><i data-lucide="edit" class="w-4 h-4"></i></button><button class="text-red-400 hover:text-red-300 text-xs"><i data-lucide="trash-2" class="w-4 h-4"></i></button></div></td>
        </tr>
      `).join('');
      lucide.createIcons();
    }

    function showAdminModal(){document.getElementById('admin-modal').classList.remove('hidden');}
    function hideAdminModal(){document.getElementById('admin-modal').classList.add('hidden');}

    // Element SDK
    const defaultConfig = {
      app_title: 'StadiumMap 2026',
      background_color: '#0A2540',
      surface_color: '#0F3052',
      text_color: '#FFFFFF',
      primary_action_color: '#00AEEF',
      secondary_action_color: '#D4AF37',
      font_family: 'Outfit',
      font_size: 14
    };

    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        const bg = config.background_color || defaultConfig.background_color;
        const sf = config.surface_color || defaultConfig.surface_color;
        const txt = config.text_color || defaultConfig.text_color;
        const pri = config.primary_action_color || defaultConfig.primary_action_color;
        const sec = config.secondary_action_color || defaultConfig.secondary_action_color;
        const font = config.font_family || defaultConfig.font_family;
        const size = config.font_size || defaultConfig.font_size;
        const title = config.app_title || defaultConfig.app_title;

        document.body.style.backgroundColor = bg;
        document.body.style.fontFamily = `${font}, sans-serif`;
        document.body.style.fontSize = size + 'px';
        document.body.style.color = txt;

        const nt = document.getElementById('navbar-title');
        if(nt) nt.textContent = title;
        const lt = document.getElementById('login-title');
        if(lt) lt.textContent = title;
      },
      mapToCapabilities: (config) => ({
        recolorables: [
          {get:()=>config.background_color||defaultConfig.background_color, set:(v)=>{config.background_color=v;window.elementSdk.setConfig({background_color:v})}},
          {get:()=>config.surface_color||defaultConfig.surface_color, set:(v)=>{config.surface_color=v;window.elementSdk.setConfig({surface_color:v})}},
          {get:()=>config.text_color||defaultConfig.text_color, set:(v)=>{config.text_color=v;window.elementSdk.setConfig({text_color:v})}},
          {get:()=>config.primary_action_color||defaultConfig.primary_action_color, set:(v)=>{config.primary_action_color=v;window.elementSdk.setConfig({primary_action_color:v})}},
          {get:()=>config.secondary_action_color||defaultConfig.secondary_action_color, set:(v)=>{config.secondary_action_color=v;window.elementSdk.setConfig({secondary_action_color:v})}}
        ],
        borderables: [],
        fontEditable: {get:()=>config.font_family||defaultConfig.font_family, set:(v)=>{config.font_family=v;window.elementSdk.setConfig({font_family:v})}},
        fontSizeable: {get:()=>config.font_size||defaultConfig.font_size, set:(v)=>{config.font_size=v;window.elementSdk.setConfig({font_size:v})}}
      }),
      mapToEditPanelValues: (config) => new Map([
        ["app_title", config.app_title || defaultConfig.app_title]
      ])
    });

    // Init
    lucide.createIcons();
  </script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'a0b3446a632d9b12',t:'MTc4MTM3NjQ4My4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>