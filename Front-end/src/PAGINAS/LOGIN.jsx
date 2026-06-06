import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginContrasenaMaestra } from '../API/TAREAS.API';

export function LOGIN() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Por favor, ingresa tu contraseña.');
      return;
    }

    try {
      setCargando(true);
      const respuesta = await loginContrasenaMaestra(password);
      

      localStorage.setItem('session_token', respuesta.data.token);
      

      navigate('/');
      window.location.reload(); 
    } catch (err) {
      setError(err.response?.data?.error || 'Contraseña incorrecta.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08150f] p-4">
      <div className="w-full max-w-sm p-6 bg-[#0d1d15] border border-[#16392a] rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#42d0ff] opacity-5 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-6">
          <p className="text-xs text-[#7fa68f] mt-1 uppercase tracking-widest font-bold">Terminal de Acceso</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#7fa68f] text-xs uppercase tracking-widest ml-1 font-semibold">Contraseña Maestra</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] focus:border-[#42d0ff] focus:outline-none text-center font-mono tracking-widest"
              placeholder="••••••••"
              disabled={cargando}
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-900 text-red-400 text-xs text-center font-medium">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-[#11312a] border border-[#16392a] text-[#42d0ff] font-bold p-3.5 rounded-xl hover:bg-[#42d0ff] hover:text-[#08150f] hover:border-[#42d0ff] transition-all duration-300"
          >
            {cargando ? 'Verificando firma...' : 'DESBLOQUEAR SISTEMA'}
          </button>
        </form>
      </div>
    </div>
  );
}