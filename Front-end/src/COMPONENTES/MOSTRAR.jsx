import { useNavigate } from "react-router-dom"
import { editartarea } from "../API/TAREAS.API";

export function MOSTRAR({tareas, alActualizar}) {
    const navigate = useNavigate();

    const Cantidad = async (nuevaCantidad) => {
        if (nuevaCantidad < 0) return;
        const dataActualizada = {
            title: tareas.title,
            description: tareas.description,
            prioridad: nuevaCantidad,
            precio: tareas.precio
        };
        try {
            await editartarea(tareas.id, dataActualizada);
            if (alActualizar) alActualizar();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="group bg-[#0d1d15] border border-[#16392a] p-5 rounded-3xl hover:border-[#42d0ff] transition-all duration-300 shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-[#7fa68f] text-[10px] uppercase tracking-widest mb-1">Producto</p>
                    <h3 className="text-[#d4f4e3] font-bold text-lg">{tareas.title}</h3>
                </div>

            </div>
            
            <p className="text-sm text-[#7fa68f] mb-4 italic">"{tareas.description}"</p>
            
            <div className="bg-[#08150f] rounded-2xl p-4 mb-5 border border-[#16392a] flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => Cantidad(tareas.prioridad - 1)} className="w-8 h-8 rounded-full bg-[#11312a] border border-red-900/50 text-red-400 hover:bg-red-900/20 transition-colors">-</button>
                    <span className="text-xl font-mono text-[#56d2ff]">{tareas.prioridad}</span>
                    <button onClick={() => Cantidad(tareas.prioridad + 1)} className="w-8 h-8 rounded-full bg-[#11312a] border border-green-900/50 text-green-400 hover:bg-green-900/20 transition-colors">+</button>
                </div>
            </div>

            <div className="mb-4 bg-[#08150f] p-3 rounded-xl border border-[#16392a] flex justify-between items-center text-sm">
                <span className="text-[#7fa68f]">Unitario:</span>
                <span className="text-[#56d2ff] font-mono font-bold">${tareas.precio}</span>
            </div>

            <button 
                onClick={() => navigate(`/l/${tareas.id}`)}
                className="w-full py-2 bg-[#11312a] hover:bg-[#173a2b] text-[#d4f4e3] text-xs font-bold rounded-xl border border-[#16392a] transition-all uppercase tracking-tighter"
            >
                Configurar Registro
            </button>
        </div>
    );
}

export function MOSTRAR_NOMIMA({ nomina }) {
    const navigate = useNavigate();
    return (
        <div className="relative overflow-hidden bg-[#0d1d15] border border-[#16392a] p-6 rounded-3xl hover:border-[#56d2ff] transition-all duration-300 shadow-xl group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#42d0ff] opacity-50"></div>
            
            <div className="mb-6">
                <p className="text-[#7fa68f] text-[10px] uppercase tracking-widest mb-1 font-bold">Registro de Empleado</p>
                <h3 className="text-[#d4f4e3] font-bold text-xl leading-tight">{nomina.nombre_empleado}</h3>
                <p className="text-[#7fa68f] text-sm">{nomina.apellido_empleado}</p>
            </div>

            <div className="space-y-3 mb-6 bg-[#08150f] p-4 rounded-2xl border border-[#16392a]">
                <div className="flex justify-between text-sm">
                    <span className="text-[#7fa68f]">Posición:</span>
                    <span className="text-[#d4f4e3] font-medium">{nomina.cargo}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[#7fa68f]">Salario:</span>
                    <span className="text-[#56d2ff] font-bold">${nomina.salario}</span>
                </div>
            </div>

            <button 
                className="w-full py-3 bg-[#11312a] text-[#42d0ff] rounded-2xl border border-[#16392a] hover:border-[#42d0ff] hover:bg-[#08150f] transition-all font-bold text-xs uppercase tracking-widest"
                onClick={() => navigate(`/n_añadir/${nomina.id}`)}
            >
                Editar Perfil
            </button>
        </div>
    );
}