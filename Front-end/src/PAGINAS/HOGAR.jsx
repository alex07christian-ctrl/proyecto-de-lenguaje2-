import { useState, useEffect } from 'react';
import { leertareas, leernomina } from '../API/TAREAS.API';

export function HOGAR() {
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalStock: 0,
    totalEmpleados: 0,
    totalNomina: 0,
  });
  const [cargandoDatos, setCargandoDatos] = useState(true);

  useEffect(() => {
    async function cargarMetricas() {
      try {
        setCargandoDatos(true);
       
        const [resTareas, resNomina] = await Promise.all([leertareas(), leernomina()]);
        const listaTareas = resTareas.data || [];
        const listaNomina = resNomina.data || [];

        
        const stockAcumulado = listaTareas.reduce((acc, item) => acc + parseInt(item.prioridad || 0, 10), 0);
        const nominaTotal = listaNomina.reduce((acc, emp) => acc + parseFloat(emp.salario || 0), 0);

        setStats({
          totalProductos: listaTareas.length,
          totalStock: stockAcumulado,
          totalEmpleados: listaNomina.length,
          totalNomina: nominaTotal,
        });
      } catch (error) {
        console.error("Error al cargar las métricas del sistema:", error);
      } finally {
        setCargandoDatos(false);
      }
    }
    
    cargarMetricas();
  }, []);

  return (
    <div className="w-full space-y-6">
      
      <div className="border-b border-[#16392a] pb-4">
        <h2 className="text-[#56d2ff] text-2xl font-bold uppercase tracking-wider">
          Métricas del Sistema Integrado
        </h2>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        
        <div className="bg-[#0d1d15] border border-[#16392a] p-5 rounded-2xl shadow-md relative overflow-hidden group hover:border-[#42d0ff] transition-all duration-300">
          <p className="text-xs text-[#7fa68f] uppercase font-semibold tracking-wider">Tipos de Productos</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-mono font-bold text-white">
              {cargandoDatos ? '...' : stats.totalProductos}
            </span>
            <span className="text-xs text-[#7fa68f] bg-[#11312a] px-2 py-0.5 rounded-md">Items</span>
          </div>
        </div>

        
        <div className="bg-[#0d1d15] border border-[#16392a] p-5 rounded-2xl shadow-md relative overflow-hidden group hover:border-[#42d0ff] transition-all duration-300">
          <p className="text-xs text-[#7fa68f] uppercase font-semibold tracking-wider">Volumen de Inventario</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-mono font-bold text-white">
              {cargandoDatos ? '...' : stats.totalStock}
            </span>
            <span className="text-xs text-[#42d0ff] bg-[#11312a] px-2 py-0.5 rounded-md">Unidades</span>
          </div>
        </div>

        
        <div className="bg-[#0d1d15] border border-[#16392a] p-5 rounded-2xl shadow-md relative overflow-hidden group hover:border-[#42d0ff] transition-all duration-300">
          <p className="text-xs text-[#7fa68f] uppercase font-semibold tracking-wider">Personal de Nómina</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-mono font-bold text-white">
              {cargandoDatos ? '...' : stats.totalEmpleados}
            </span>
            <span className="text-xs text-[#7fa68f] bg-[#11312a] px-2 py-0.5 rounded-md">Activos</span>
          </div>
        </div>

        
        <div className="bg-[#0d1d15] border border-[#16392a] p-5 rounded-2xl shadow-md relative overflow-hidden group hover:border-[#42d0ff] transition-all duration-300">
          <p className="text-xs text-[#7fa68f] uppercase font-semibold tracking-wider">Inversión Salarial</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-mono font-bold text-[#56d2ff]">
              ${cargandoDatos ? '...' : stats.totalNomina.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-[#56d2ff] bg-[#11312a] px-2 py-0.5 rounded-md">Mensual</span>
          </div>
        </div>

      </div>
    </div>
  );
}