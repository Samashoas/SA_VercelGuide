import React, { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Piezas reutilizables                                               */
/* ------------------------------------------------------------------ */

function CodeBlock({ label, code, tone = 'text-slate-200' }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (e) {
      // Respaldo para entornos donde el portapapeles está bloqueado
      try {
        const ta = document.createElement('textarea');
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (e2) {
        return;
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-black/50 overflow-hidden min-w-0">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-3 py-1.5">
        <span className="text-[11px] font-mono text-slate-400 truncate">{label}</span>
        <button
          onClick={copy}
          className="shrink-0 px-2 py-0.5 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className={`p-3 text-xs font-mono leading-relaxed overflow-x-auto ${tone}`}>{code}</pre>
    </div>
  );
}

const calloutStyles = {
  info: 'bg-blue-950/40 border-blue-800/60 text-blue-200',
  warn: 'bg-amber-950/30 border-amber-800/50 text-amber-200',
  ok: 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200',
};

function Callout({ kind = 'info', title, children }) {
  return (
    <div className={`border rounded-lg p-3 text-xs leading-relaxed ${calloutStyles[kind]}`}>
      {title && <strong className="block mb-1">{title}</strong>}
      {children}
    </div>
  );
}

function Mono({ children }) {
  return <code className="text-amber-300 font-mono">{children}</code>;
}

function Step({ n, title, children }) {
  return (
    <div className="flex gap-3 min-w-0">
      <div className="shrink-0 h-6 w-6 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center justify-center">
        {n}
      </div>
      <div className="flex-1 min-w-0 space-y-3">
        <h4 className="text-sm font-semibold text-white leading-6">{title}</h4>
        {children}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 mb-1">{eyebrow}</p>
      <h2 className="text-2xl font-bold text-white mb-2 text-balance">{title}</h2>
      <p className="text-slate-300 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function Panel({ title, dot = 'bg-blue-500', children }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 min-w-0">
      {title && (
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${dot}`} />
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Contenido de código                                                */
/* ------------------------------------------------------------------ */

const code = {
  tree: `mi-proyecto/
├── index.html           # Contenedor DOM donde se monta React
├── package.json         # Dependencias y scripts de compilación
├── vite.config.js       # Configuración del compilador JSX
├── .gitignore           # Archivos que NO se suben a GitHub
└── src/
    ├── main.jsx         # Punto de entrada (createRoot)
    └── MiComponente.jsx # Tu archivo JSX actual`,

  install: `# 1. Crear la carpeta y entrar en ella
mkdir mi-proyecto && cd mi-proyecto

# 2. Iniciar el paquete
npm init -y

# 3. Instalar el core de React
npm install react react-dom

# 4. Instalar Vite y el plugin de JSX como dependencias de desarrollo
npm install -D vite @vitejs/plugin-react`,

  pkg: `{
  "name": "mi-proyecto",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^7.0.0"
  }
}`,

  viteConfig: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,

  indexHtml: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi aplicación</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,

  mainJsx: `import React from 'react';
import { createRoot } from 'react-dom/client';
import MiComponente from './MiComponente.jsx';

createRoot(document.getElementById('root')).render(<MiComponente />);`,

  gitignore: `node_modules
dist
.env
.env.*
!.env.example
.vercel`,

  localTest: `# Servidor de desarrollo en http://localhost:5173
npm run dev

# Compilación de producción (genera la carpeta dist/)
npm run build

# Sirve dist/ localmente, igual que lo verá Vercel
npm run preview`,

  tailwindInstall: `npm install tailwindcss @tailwindcss/vite`,

  tailwindVite: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`,

  tailwindCss: `@import "tailwindcss";`,

  tailwindMain: `import './index.css';   // <- agrega esta línea arriba en main.jsx`,

  cli: `# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Iniciar sesión (abre el navegador)
vercel login

# 3. Desplegar en modo Preview (URL de prueba)
vercel

# 4. Desplegar a Producción
vercel --prod`,

  cliPrompts: `Set up and deploy "~/mi-proyecto"? yes
Which scope should contain your project? (tu usuario)
Link to existing project? no
What's your project's name? mi-proyecto
In which directory is your code located? ./
Auto-detected Project Settings (Vite)  -> Enter para aceptar`,

  git: `# 1. Iniciar git y hacer el primer commit
git init
git add .
git commit -m "feat: setup inicial"

# 2. Crear un repositorio vacío en github.com y conectarlo
git remote add origin https://github.com/usuario/repo.git
git branch -M main
git push -u origin main`,

  router: `import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}`,

  rewrites: `{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`,

  rewritesApi: `{
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}`,

  monoTree: `mi-repo/
├── client/              # <- Root Directory = client
│   ├── package.json
│   ├── vercel.json      # vercel.json va DENTRO del Root Directory
│   └── src/
├── server/
│   └── ...
└── README.md`,

  monoCli: `# Entra a la subcarpeta antes de ejecutar vercel
cd client
vercel`,

  nextCreate: `npx create-next-app@latest mi-app
cd mi-app
npm run dev`,

  nextClient: `'use client';

import { useState } from 'react';

export default function Contador() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Clicks: {n}</button>;
}`,

  nextImg: `// next.config.js: dominios externos permitidos para <Image />
module.exports = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.example.com' }],
  },
};`,

  envUse: `// Vite
const api = import.meta.env.VITE_API_URL;

// Next.js (variable pública, llega al navegador)
const api2 = process.env.NEXT_PUBLIC_API_URL;

// Next.js (variable privada, solo servidor / API routes)
const secret = process.env.DATABASE_URL;`,

  envCli: `# Agregar una variable desde la terminal
vercel env add VITE_API_URL production

# Listar las variables del proyecto
vercel env ls

# Descargar las variables a un archivo local
vercel env pull .env.local`,

  envExample: `# .env.example  (este SÍ se sube al repo, sin valores reales)
VITE_API_URL=
VITE_PUBLIC_KEY=`,

  domainDns: `Dominio raíz (midominio.com)   ->  Registro A      76.76.21.21
Subdominio (www.midominio.com) ->  Registro CNAME  cname.vercel-dns.com`,

  rollback: `# Ver el historial de despliegues
vercel ls

# Volver a promover un despliegue anterior a producción
vercel promote <url-del-despliegue>

# Ver los logs de un despliegue
vercel logs <url-del-despliegue>`,
};

/* ------------------------------------------------------------------ */
/*  Escenarios                                                         */
/* ------------------------------------------------------------------ */

function ScenarioSingleFile() {
  const resources = [
    ['Node.js 20 o superior', 'Ejecuta npm y el compilador. Verifica con node -v.'],
    ['Cuenta en Vercel', 'Gratuita en vercel.com/signup. Puedes entrar con GitHub.'],
    ['package.json', 'Lista las dependencias reales y los scripts de build.'],
    ['index.html', 'Página base con <div id="root">. React se monta ahí.'],
    ['src/main.jsx', 'Punto de entrada que importa tu componente y lo renderiza.'],
    ['Vite', 'El empaquetador que convierte JSX en JavaScript para el navegador.'],
  ];

  return (
    <section className="space-y-8">
      <SectionTitle eyebrow="Escenario 1 · Principiante" title="Desplegar un único archivo .jsx">
        Un archivo <Mono>.jsx</Mono> contiene sintaxis que los navegadores no entienden por sí solos. Vercel no puede publicar un archivo suelto: necesita un proyecto con un HTML de entrada, las dependencias de React y un empaquetador (bundler). Esta sección arma ese proyecto mínimo y lo publica de dos formas.
      </SectionTitle>

      <Panel title="Recursos necesarios">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resources.map(([t, d]) => (
            <div key={t} className="bg-black/40 border border-slate-800 rounded-lg p-3">
              <p className="text-xs font-semibold text-white">{t}</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          Para el método B también necesitas Git instalado y una cuenta en GitHub.
        </p>
      </Panel>

      <Panel title="Estructura final del proyecto">
        <CodeBlock label="estructura" code={code.tree} tone="text-slate-300" />
      </Panel>

      <div className="space-y-6">
        <h3 className="text-base font-semibold text-white">Preparar el proyecto</h3>

        <Step n="1" title="Instalar dependencias">
          <p className="text-xs text-slate-400">En una terminal, en la ubicación donde quieras crear el proyecto:</p>
          <CodeBlock label="terminal" code={code.install} tone="text-emerald-400" />
        </Step>

        <Step n="2" title="Revisar el package.json">
          <p className="text-xs text-slate-400">
            Confirma que tenga <Mono>"type": "module"</Mono> y los tres scripts. Las versiones pueden variar según lo que instaló npm.
          </p>
          <CodeBlock label="package.json" code={code.pkg} />
        </Step>

        <Step n="3" title="Crear vite.config.js">
          <CodeBlock label="vite.config.js" code={code.viteConfig} />
        </Step>

        <Step n="4" title="Crear index.html en la raíz">
          <CodeBlock label="index.html" code={code.indexHtml} />
        </Step>

        <Step n="5" title="Crear src/main.jsx y mover tu archivo">
          <p className="text-xs text-slate-400">
            Copia tu archivo a <Mono>src/MiComponente.jsx</Mono>. Debe terminar con <Mono>export default</Mono> para que <Mono>main.jsx</Mono> pueda importarlo.
          </p>
          <CodeBlock label="src/main.jsx" code={code.mainJsx} />
        </Step>

        <Step n="6" title="Crear .gitignore">
          <p className="text-xs text-slate-400">Evita subir carpetas pesadas y credenciales.</p>
          <CodeBlock label=".gitignore" code={code.gitignore} />
        </Step>

        <Step n="7" title="Probar en local antes de desplegar">
          <CodeBlock label="terminal" code={code.localTest} tone="text-emerald-400" />
          <Callout kind="ok" title="Regla de oro">
            Si <Mono>npm run build</Mono> falla en tu computadora, también fallará en Vercel. Corrige los errores aquí primero.
          </Callout>
        </Step>
      </div>

      <Panel title="Si tu archivo usa Tailwind CSS" dot="bg-amber-400">
        <p className="text-xs text-slate-400 leading-relaxed">
          Muchos archivos .jsx generados por IA usan clases como <Mono>bg-slate-900</Mono> o <Mono>px-4</Mono>. Sin Tailwind instalado, la página se verá sin estilos. Agrega Tailwind v4 así:
        </p>
        <CodeBlock label="terminal" code={code.tailwindInstall} tone="text-emerald-400" />
        <CodeBlock label="vite.config.js" code={code.tailwindVite} />
        <CodeBlock label="src/index.css" code={code.tailwindCss} />
        <CodeBlock label="src/main.jsx" code={code.tailwindMain} />
        <Callout kind="warn" title="Otras librerías">
          Cada <Mono>import</Mono> de un paquete externo (por ejemplo <Mono>lucide-react</Mono> o <Mono>recharts</Mono>) necesita su propio <Mono>npm install</Mono>. Si falta alguno, el build falla con "Cannot find module".
        </Callout>
      </Panel>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-4 min-w-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Método A</span>
            <h4 className="text-sm font-semibold text-white mt-1">Despliegue manual con Vercel CLI</h4>
            <p className="text-xs text-slate-400 mt-1">Directo desde la terminal, sin pasar por GitHub.</p>
          </div>
          <CodeBlock label="terminal" code={code.cli} />
          <p className="text-xs text-slate-400">En el primer <Mono>vercel</Mono> responde las preguntas así:</p>
          <CodeBlock label="preguntas de la CLI" code={code.cliPrompts} tone="text-slate-300" />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Vercel detecta Vite y usa la carpeta de salida <Mono>dist</Mono>. Con <Mono>vercel</Mono> obtienes una URL de prueba; con <Mono>vercel --prod</Mono> publicas en la URL definitiva.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-4 min-w-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Método B</span>
            <h4 className="text-sm font-semibold text-white mt-1">Despliegue vía repositorio de GitHub</h4>
            <p className="text-xs text-slate-400 mt-1">Cada <Mono>git push</Mono> publica una nueva versión automáticamente.</p>
          </div>
          <CodeBlock label="terminal" code={code.git} />
          <ol className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside leading-relaxed">
            <li>Entra a <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" className="text-blue-400 underline">vercel.com/dashboard</a>.</li>
            <li>Haz clic en <strong className="text-slate-200">Add New… &gt; Project</strong>.</li>
            <li>Si es la primera vez, autoriza a Vercel a leer tus repositorios de GitHub.</li>
            <li>Selecciona el repositorio y pulsa <strong className="text-slate-200">Import</strong>.</li>
            <li>Verifica que el Framework Preset sea <strong className="text-slate-200">Vite</strong> y pulsa <strong className="text-slate-200">Deploy</strong>.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function ScenarioSpa() {
  return (
    <section className="space-y-6">
      <SectionTitle eyebrow="Escenario 2 · Configuración SPA" title="Rutas del cliente y error 404 al recargar">
        Con librerías como <Mono>react-router-dom</Mono>, URLs como <Mono>/perfil</Mono> solo existen dentro del navegador. Si el usuario recarga la página o entra directo por esa URL, Vercel busca un archivo físico llamado <Mono>perfil</Mono>, no lo encuentra y responde <strong>404 NOT_FOUND</strong>.
      </SectionTitle>

      <Panel title="Ejemplo de rutas en la aplicación" dot="bg-slate-500">
        <CodeBlock label="src/App.jsx" code={code.router} />
      </Panel>

      <Panel title="Solución: rewrites en vercel.json" dot="bg-amber-400">
        <p className="text-xs text-slate-400">
          Crea un archivo llamado exactamente <Mono>vercel.json</Mono> en la raíz del proyecto. Redirige toda petición al <Mono>index.html</Mono>:
        </p>
        <CodeBlock label="vercel.json" code={code.rewrites} />
        <Callout title="¿Qué hace esto?">
          Cuando llega una petición que no corresponde a un archivo estático (.js, .css, imágenes), Vercel entrega <Mono>index.html</Mono>. React Router lee la dirección y dibuja la vista correcta. Los archivos que sí existen se siguen sirviendo normalmente.
        </Callout>
        <p className="text-xs text-slate-400">
          Si además tienes funciones serverless en una carpeta <Mono>api/</Mono>, exclúyela del rewrite:
        </p>
        <CodeBlock label="vercel.json (con api/)" code={code.rewritesApi} />
      </Panel>

      <Callout kind="ok" title="Alternativa sin vercel.json">
        Puedes usar <Mono>HashRouter</Mono> en lugar de <Mono>BrowserRouter</Mono>. Las URLs quedan como <Mono>/#/perfil</Mono> y nunca generan 404, pero son menos limpias para compartir y para SEO.
      </Callout>
    </section>
  );
}

function ScenarioMonorepo() {
  return (
    <section className="space-y-6">
      <SectionTitle eyebrow="Escenario 3 · Estructuras complejas" title="Frontend dentro de una subcarpeta o monorepo">
        Es común tener frontend y backend en el mismo repositorio (por ejemplo <Mono>/client</Mono> y <Mono>/server</Mono>). Si conectas el repo sin indicar dónde está el frontend, Vercel no encuentra el <Mono>package.json</Mono> en la raíz y el build falla.
      </SectionTitle>

      <Panel title="Ejemplo de estructura">
        <CodeBlock label="estructura" code={code.monoTree} tone="text-slate-300" />
      </Panel>

      <Panel title="Configurar el Root Directory" dot="bg-amber-400">
        <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 leading-relaxed">
          <li>Durante la importación, o luego en <strong className="text-slate-200">Project Settings &gt; General</strong>.</li>
          <li>Busca <strong className="text-slate-200">Root Directory</strong> y pulsa <strong className="text-slate-200">Edit</strong>.</li>
          <li>Escribe la ruta relativa del frontend, por ejemplo <Mono>client</Mono>.</li>
          <li>Activa <em>"Include source files outside of the Root Directory in the Build Cache"</em> solo si el cliente depende de paquetes compartidos fuera de esa carpeta.</li>
          <li>Guarda y vuelve a desplegar.</li>
        </ol>
        <div className="border-t border-slate-800 pt-4 space-y-2">
          <p className="text-xs text-slate-400">Con la CLI, ejecuta el comando desde dentro de la subcarpeta:</p>
          <CodeBlock label="terminal" code={code.monoCli} tone="text-emerald-400" />
        </div>
      </Panel>

      <Callout kind="warn" title="Detalles que suelen causar errores">
        El <Mono>vercel.json</Mono> debe estar dentro del Root Directory, no en la raíz del repo. Si el backend vive en el mismo repo y no debe desplegarse aquí, no lo incluyas en el Root Directory. Si usas npm workspaces o Turborepo, deja que Vercel detecte el framework y revisa que el Install Command se ejecute desde la raíz del monorepo.
      </Callout>
    </section>
  );
}

function ScenarioNext() {
  return (
    <section className="space-y-6">
      <SectionTitle eyebrow="Escenario 4 · Framework nativo" title="Proyectos Next.js (App Router, Pages, SSR)">
        Next.js lo desarrolla Vercel, así que el despliegue es nativo. No necesitas rewrites ni carpeta de salida manual, y el renderizado en servidor, los Server Components y las API routes funcionan sin configuración.
      </SectionTitle>

      <Panel title="Crear un proyecto nuevo">
        <CodeBlock label="terminal" code={code.nextCreate} tone="text-emerald-400" />
        <p className="text-xs text-slate-400 leading-relaxed">
          Para convertir un solo archivo .jsx en página de Next.js, cópialo a <Mono>app/page.jsx</Mono> y exporta el componente como <Mono>default</Mono>. Luego despliega con el Método A o el Método B del Escenario 1; Vercel detecta Next.js solo.
        </p>
      </Panel>

      <Panel title="Puntos clave de verificación">
        <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
          {[
            ['Build Command', <>Vercel ejecuta <Mono>next build</Mono> automáticamente.</>],
            ['Output Directory', <>Se detecta como <Mono>.next</Mono>. No lo cambies.</>],
            ['Imágenes', <>El componente <Mono>&lt;Image /&gt;</Mono> se optimiza a AVIF/WebP en el edge de Vercel.</>],
            ['API routes', <>Los archivos en <Mono>app/api</Mono> se convierten en funciones serverless sin configuración extra.</>],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong className="text-white">{t}:</strong> {d}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Componentes con hooks" dot="bg-amber-400">
        <p className="text-xs text-slate-400 leading-relaxed">
          En App Router los componentes son de servidor por defecto. Si usan <Mono>useState</Mono>, <Mono>useEffect</Mono> o eventos del navegador, agrega la directiva en la primera línea:
        </p>
        <CodeBlock label="app/contador.jsx" code={code.nextClient} />
      </Panel>

      <Panel title="Imágenes de dominios externos" dot="bg-slate-500">
        <p className="text-xs text-slate-400 leading-relaxed">
          Si usas <Mono>&lt;Image /&gt;</Mono> con URLs de otro sitio, debes autorizar el dominio o Next.js responderá con error:
        </p>
        <CodeBlock label="next.config.js" code={code.nextImg} />
      </Panel>
    </section>
  );
}

function ScenarioEnv() {
  return (
    <section className="space-y-6">
      <SectionTitle eyebrow="Escenario 5 · Seguridad" title="Variables de entorno">
        Nunca subas llaves de API, tokens ni contraseñas a GitHub. Vercel guarda esas variables de forma segura y las inyecta al compilar.
      </SectionTitle>

      <Panel title="Prefijo requerido según el framework">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
            <span className="text-blue-400 font-bold block mb-1">Vite + React</span>
            <p className="text-slate-400 mb-2">El nombre debe empezar con:</p>
            <Mono>VITE_</Mono>
            <p className="text-slate-500 text-[11px] mt-2">Ejemplo: <span className="font-mono text-slate-300">VITE_API_URL</span></p>
          </div>
          <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
            <span className="text-purple-400 font-bold block mb-1">Next.js</span>
            <p className="text-slate-400 mb-2">Para el navegador, empieza con:</p>
            <Mono>NEXT_PUBLIC_</Mono>
            <p className="text-slate-500 text-[11px] mt-2">Sin prefijo, la variable solo existe en el servidor.</p>
          </div>
        </div>
        <CodeBlock label="cómo se leen en el código" code={code.envUse} />
        <Callout kind="warn" title="Las variables con prefijo son públicas">
          Todo lo que lleva <Mono>VITE_</Mono> o <Mono>NEXT_PUBLIC_</Mono> queda dentro del JavaScript que descarga el visitante. Nunca pongas ahí una clave secreta. Los secretos van sin prefijo y se usan solo desde una función de servidor.
        </Callout>
      </Panel>

      <Panel title="Configurarlas en el panel de Vercel" dot="bg-emerald-400">
        <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-400 leading-relaxed">
          <li>Abre tu proyecto en el <strong className="text-slate-200">Dashboard de Vercel</strong>.</li>
          <li>Ve a <strong className="text-slate-200">Settings &gt; Environment Variables</strong>.</li>
          <li>Escribe el nombre (Key) y el valor (Value).</li>
          <li>
            Elige los entornos donde aplica:
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li><strong className="text-slate-200">Production:</strong> despliegues de la rama <Mono>main</Mono>.</li>
              <li><strong className="text-slate-200">Preview:</strong> pull requests y otras ramas.</li>
              <li><strong className="text-slate-200">Development:</strong> se descarga con <Mono>vercel env pull</Mono>.</li>
            </ul>
          </li>
          <li>Guarda y vuelve a desplegar.</li>
        </ol>
        <Callout kind="warn" title="Hay que redesplegar">
          Una variable nueva o modificada no afecta despliegues ya hechos. Ve a <strong>Deployments</strong>, abre el menú del último despliegue y elige <strong>Redeploy</strong>.
        </Callout>
      </Panel>

      <Panel title="Desde la terminal y en local" dot="bg-slate-500">
        <CodeBlock label="terminal" code={code.envCli} tone="text-emerald-400" />
        <p className="text-xs text-slate-400">Para que otros sepan qué variables necesita el proyecto, sube un archivo de ejemplo sin valores:</p>
        <CodeBlock label=".env.example" code={code.envExample} />
      </Panel>
    </section>
  );
}

function ScenarioDomains() {
  return (
    <section className="space-y-6">
      <SectionTitle eyebrow="Escenario 6 · Después del despliegue" title="Dominio propio y gestión de versiones">
        Una vez publicado, Vercel te da una URL tipo <Mono>mi-proyecto.vercel.app</Mono>. Aquí se explica cómo usar tu propio dominio y cómo trabajar con las distintas versiones.
      </SectionTitle>

      <Panel title="Tipos de despliegue">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
            <p className="text-emerald-400 font-bold mb-1">Production</p>
            <p className="text-slate-400 leading-relaxed">Se crea con cada push a la rama principal (o con <Mono>vercel --prod</Mono>). Es la versión que ve el público.</p>
          </div>
          <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
            <p className="text-blue-400 font-bold mb-1">Preview</p>
            <p className="text-slate-400 leading-relaxed">Se crea con cada push a otra rama o pull request. Tiene una URL única para revisar cambios antes de publicarlos.</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Los previews pueden tener protección activa (Vercel Authentication). Si alguien no puede abrir la URL, revisa <strong className="text-slate-300">Settings &gt; Deployment Protection</strong>.
        </p>
      </Panel>

      <Panel title="Conectar un dominio propio" dot="bg-amber-400">
        <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-400 leading-relaxed">
          <li>En el proyecto, ve a <strong className="text-slate-200">Settings &gt; Domains</strong>.</li>
          <li>Escribe tu dominio y pulsa <strong className="text-slate-200">Add</strong>.</li>
          <li>Vercel muestra los registros DNS exactos. Créalos en el panel de tu registrador (GoDaddy, Namecheap, Cloudflare, etc.).</li>
          <li>Espera la propagación (de minutos a unas horas). El certificado HTTPS se genera solo.</li>
        </ol>
        <CodeBlock label="registros DNS habituales" code={code.domainDns} tone="text-slate-300" />
        <p className="text-[11px] text-slate-500">Usa siempre los valores que muestre tu panel de Vercel; pueden diferir de estos.</p>
      </Panel>

      <Panel title="Volver a una versión anterior" dot="bg-emerald-400">
        <p className="text-xs text-slate-400 leading-relaxed">
          Si un despliegue sale mal, en <strong className="text-slate-200">Deployments</strong> abre una versión que funcionaba y elige <strong className="text-slate-200">Promote to Production</strong> (o Instant Rollback). También se puede desde la CLI:
        </p>
        <CodeBlock label="terminal" code={code.rollback} tone="text-emerald-400" />
      </Panel>
    </section>
  );
}

const problems = [
  ['Pantalla en blanco al abrir el sitio', 'Error de JavaScript o ruta de assets incorrecta.', <>Abre la consola del navegador (F12). Revisa que <Mono>index.html</Mono> apunte a <Mono>/src/main.jsx</Mono> y que exista <Mono>&lt;div id="root"&gt;</Mono>.</>],
  ['404 al recargar una ruta', 'SPA con router sin rewrites.', <>Agrega el <Mono>vercel.json</Mono> del Escenario 2.</>],
  ['"vite: command not found"', 'Vite no está en package.json.', <>Ejecuta <Mono>npm install -D vite @vitejs/plugin-react</Mono> y sube el cambio.</>],
  ['"Cannot find module" o "Could not resolve"', 'Falta una dependencia, o el nombre del archivo tiene otra capitalización.', <>Instala el paquete con npm. Revisa mayúsculas y minúsculas en cada import: Linux las distingue, Windows y macOS no.</>],
  ['"No Output Directory named dist found"', 'La carpeta de salida configurada no coincide con la real.', <>En <strong>Settings &gt; Build &amp; Development</strong>, pon Output Directory en <Mono>dist</Mono> (Vite) o <Mono>build</Mono> (Create React App).</>],
  ['El sitio se ve sin estilos', 'Tailwind no está instalado en el proyecto.', <>Sigue la sección de Tailwind del Escenario 1 y confirma que <Mono>main.jsx</Mono> importa <Mono>index.css</Mono>.</>],
  ['La variable de entorno es undefined', 'Falta el prefijo, o no se redesplegó.', <>Usa <Mono>VITE_</Mono> o <Mono>NEXT_PUBLIC_</Mono> y ejecuta Redeploy tras cambiarla.</>],
  ['Build falla solo en Vercel', 'Versión de Node distinta a la local.', <>En <strong>Settings &gt; General &gt; Node.js Version</strong> elige la misma versión que usas en tu equipo.</>],
  ['Funciona local y falla en Vercel con "Module not found"', 'Archivo no subido a Git o capitalización distinta.', <>Revisa <Mono>git status</Mono> y que el nombre del archivo en Git coincida con el del import.</>],
];

function ScenarioTroubleshooting() {
  return (
    <section className="space-y-6">
      <SectionTitle eyebrow="Escenario 7 · Referencia rápida" title="Solución de problemas comunes">
        Los errores más frecuentes al desplegar, con su causa probable y qué hacer. Para ver el detalle de un fallo, abre el despliegue en <strong>Deployments</strong> y revisa el log de build.
      </SectionTitle>

      <div className="space-y-3">
        {problems.map(([symptom, cause, fix]) => (
          <div key={symptom} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 min-w-0">
            <p className="text-sm font-semibold text-white">{symptom}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="text-slate-500 uppercase tracking-wide text-[10px] font-semibold mr-2">Causa</span>
              {cause}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <span className="text-emerald-400 uppercase tracking-wide text-[10px] font-semibold mr-2">Solución</span>
              {fix}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Aplicación                                                         */
/* ------------------------------------------------------------------ */

const scenarios = [
  { id: 'single-file', title: '1. Archivo único .jsx', tag: 'Principiante', view: ScenarioSingleFile },
  { id: 'spa-routing', title: '2. React Router y error 404', tag: 'Configuración SPA', view: ScenarioSpa },
  { id: 'monorepo', title: '3. Subcarpetas y monorepos', tag: 'Estructuras complejas', view: ScenarioMonorepo },
  { id: 'nextjs', title: '4. Next.js', tag: 'Framework nativo', view: ScenarioNext },
  { id: 'env-vars', title: '5. Variables de entorno', tag: 'Seguridad', view: ScenarioEnv },
  { id: 'domains', title: '6. Dominio y versiones', tag: 'Después del deploy', view: ScenarioDomains },
  { id: 'troubleshooting', title: '7. Solución de problemas', tag: 'Referencia', view: ScenarioTroubleshooting },
];

const checklist = [
  <>El archivo <Mono>.gitignore</Mono> incluye <Mono>node_modules</Mono> y <Mono>.env</Mono></>,
  <><Mono>npm run build</Mono> compila sin errores en tu equipo</>,
  <>El <Mono>package.json</Mono> lista todas las dependencias que importa tu código</>,
  <>Los imports respetan mayúsculas y minúsculas (Linux distingue)</>,
  <>Si usas React Router, existe el <Mono>vercel.json</Mono> con rewrites</>,
  <>Las variables de entorno están cargadas en Vercel con el prefijo correcto</>,
  <>Si usas Tailwind, está instalado y <Mono>index.css</Mono> se importa en <Mono>main.jsx</Mono></>,
  <>La versión de Node en Vercel coincide con la de tu equipo</>,
];

export default function VercelDeploymentGuide() {
  const [activeTab, setActiveTab] = useState('single-file');
  const [checked, setChecked] = useState({});

  const Active = scenarios.find((s) => s.id === activeTab).view;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Encabezado */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-black border border-slate-700 p-2 rounded-lg shrink-0">
              <svg className="w-5 h-5 text-white" viewBox="0 0 1155 1000" fill="currentColor" aria-hidden="true">
                <path d="m577.3 0 577.4 1000H0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold tracking-tight text-white truncate">Vercel Deployment Playbook</h1>
              <p className="text-xs text-slate-400 truncate">Guía práctica de despliegue para proyectos React</p>
            </div>
          </div>
          <span className="hidden sm:inline text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium shrink-0">
            7 escenarios
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navegación */}
          <aside className="lg:col-span-1 min-w-0">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-1">Escenarios</p>
              <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                {scenarios.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveTab(s.id)}
                    className={`shrink-0 w-52 lg:w-full text-left px-3 py-3 rounded-lg text-sm transition-all flex flex-col gap-1 border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      activeTab === s.id
                        ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 font-medium'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border-transparent'
                    }`}
                  >
                    <span>{s.title}</span>
                    <span className="text-[11px] text-slate-500 font-normal">{s.tag}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Contenido */}
          <main className="lg:col-span-3 space-y-10 min-w-0">
            <Active />

            {/* Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                  Checklist antes de pulsar Deploy
                </h3>
                <span className="text-xs text-slate-500 tabular-nums">
                  {Object.values(checked).filter(Boolean).length} / {checklist.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                {checklist.map((item, i) => (
                  <label
                    key={i}
                    className="flex items-start gap-2 bg-black/30 p-2.5 rounded-lg border border-slate-800 cursor-pointer min-w-0"
                  >
                    <input
                      id={`check-${i}`}
                      type="checkbox"
                      checked={!!checked[i]}
                      onChange={() => setChecked({ ...checked, [i]: !checked[i] })}
                      className="mt-0.5 rounded accent-blue-600"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
