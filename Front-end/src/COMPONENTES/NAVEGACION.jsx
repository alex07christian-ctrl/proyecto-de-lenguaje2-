import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export function NAVEGACION() {
  const [mostrarNav, setMostrarNav] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('session_token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex bg-[#08150f] text-white">
      <aside 
        className={`bg-[#0d1d15] transition-all duration-300 ease-in-out border-[#16392a] ${
          mostrarNav 
            ? 'w-full md:w-72 p-6 border-r opacity-100' 
            : 'w-0 p-0 border-r-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="mb-8 flex items-center justify-between whitespace-nowrap">
          <h1 className="text-2xl font-bold text-[#56d2ff]">Gestión de Datos</h1>
          
          {mostrarNav && (
            <button
              onClick={() => setMostrarNav(false)}
              className="md:hidden text-xs text-red-400 rounded-full border border-[#16392a] bg-[#11312a] hover:border-red-500 transition-all duration-300 px-3 py-2 font-bold shadow-md"
            >
              ✕ Cerrar
            </button>
          )}
        </div>

        <div className="mb-6 whitespace-nowrap">
          <p className="text-center mb-4 text-sm uppercase tracking-[0.3em] text-[#7fa68f]">Menú</p>
          <Link
            to="/"
            className="block rounded-2xl border border-[#16392a] bg-[#11312a] px-5 py-4 mb-3 text-sm font-semibold text-[#d4f4e3] transition hover:border-[#42d0ff] hover:bg-[#173a2b]"
          >
            INICIO
          </Link>
          <Link
            to="/t"
            className="block rounded-2xl border border-[#16392a] bg-[#11312a] px-5 py-4 mb-3 text-sm font-semibold text-[#d4f4e3] transition hover:border-[#42d0ff] hover:bg-[#173a2b]"
          >
            INVENTARIO
          </Link>
          <Link
            to="/n"
            className="block rounded-2xl border border-[#16392a] bg-[#11312a] px-5 py-4 mb-3 text-sm font-semibold text-[#d4f4e3] transition hover:border-[#42d0ff] hover:bg-[#173a2b]"
          >
            NÓMINA
          </Link>
          <Link
            to="/seguridad"
            className="block rounded-2xl border border-[#16392a] bg-[#11312a] border-dashed px-5 py-4 text-sm font-semibold text-[#7fa68f] transition hover:border-[#42d0ff] hover:bg-[#173a2b]"
          >
            SEGURIDAD CLAVE
          </Link>
        </div>
      </aside>

      <main 
        className={`p-6 transition-all duration-300 ${
          mostrarNav ? 'hidden md:block md:flex-1' : 'flex-1'
        }`}
      >
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#7fa68f]">Panel</p>
            <h2 className="text-2xl font-bold text-white">Bienvenido</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setMostrarNav(!mostrarNav)}
              className="text-xs uppercase tracking-widest text-[#42d0ff] rounded-full border border-[#16392a] bg-[#11312a] hover:border-[#42d0ff] hover:bg-[#173a2b] transition-all duration-300 px-5 py-2 font-bold shadow-md"
            >
              {mostrarNav ? '⚠️ ' : '👁️'}
            </button>

            <button
              onClick={handleLogout}
              className="text-sm text-white rounded-full border border-red-500 bg-red-600 hover:border-red-700 hover:bg-red-700 transition-all duration-300 px-4 py-2 font-semibold shadow-md cursor-pointer"
            >
              Salir
            </button>
          </div>
        </header>

        <div className="rounded-3xl border border-[#16392a] bg-[#0d1d15] p-6 shadow-[0_0_40px_rgba(0,0,0,0.15)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}