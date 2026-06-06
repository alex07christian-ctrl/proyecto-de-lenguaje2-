import { useState } from 'react';
import { configurarContrasenaMaestra } from '../API/TAREAS.API';

export function CONFIGURAR_ACCESO() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verPassword, setVerPassword] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleGuardar = async (e) => {
    e.preventDefault();
    setError('');
    setExito(false);

    if (!password || !confirmPassword) {
      setError('Por favor, rellena todos los campos.');
      return;
    }
    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      setCargando(true);
      await configurarContrasenaMaestra(password);
      setExito(true);
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el servidor al guardar.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-[#0d1d15] border border-[#16392a] rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-[0.2em] text-[#7fa68f] font-bold">Seguridad del Sistema</span>
        <h2 className="text-xl font-black text-white mt-1">Configurar Contraseña Maestra</h2>
        <p className="text-xs text-[#7fa68f] mt-1">Establece la clave única de acceso global.</p>
      </div>

      <form onSubmit={handleGuardar} className="space-y-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[#7fa68f] text-xs uppercase tracking-widest ml-1 font-semibold">Nueva Contraseña</label>
          <div className="relative">
            <input
              type={verPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 pr-12 rounded-xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] focus:border-[#42d0ff] focus:outline-none font-mono"
              placeholder="••••••••"
              disabled={cargando}
            />
            <button
              type="button"
              onClick={() => setVerPassword(!verPassword)}
              className="absolute right-4 top-3.5 text-sm text-[#7fa68f] hover:text-[#42d0ff]"
            >
              {verPassword ? '👁️' : '🔑'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#7fa68f] text-xs uppercase tracking-widest ml-1 font-semibold">Confirmar Contraseña</label>
          <input
            type={verPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] focus:border-[#42d0ff] focus:outline-none font-mono"
            placeholder="••••••••"
            disabled={cargando}
          />
        </div>

        {error && <div className="p-3 rounded-xl bg-red-950/40 border border-red-900 text-red-400 text-xs">⚠️ {error}</div>}
        {exito && <div className="p-3 rounded-xl bg-emerald-950/40 border border-[#16392a] text-[#42d0ff] text-xs">🧬 Contraseña guardada con éxito en el servidor.</div>}

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-[#11312a] border border-[#16392a] text-[#56d2ff] font-bold p-3.5 rounded-xl hover:bg-[#42d0ff] hover:text-[#08150f] hover:border-[#42d0ff] transition-all duration-300"
        >
          {cargando ? 'Guardando...' : 'ESTABLECER CLAVE ACCESO'}
        </button>
      </form>
    </div>
  );
}