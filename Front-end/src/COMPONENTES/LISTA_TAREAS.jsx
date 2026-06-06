import { useEffect, useState } from "react"
import { leernomina, leertareas } from "../API/TAREAS.API"
import { MOSTRAR, MOSTRAR_NOMIMA } from "./MOSTRAR";

const SearchInput = ({ value, onChange, placeholder }) => (
    <div className="relative mb-8">
        <input
            type="text"
            placeholder={placeholder}
            className="w-full p-4 pl-6 rounded-2xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] placeholder-[#7fa68f] focus:outline-none focus:border-[#42d0ff] shadow-inner transition-all"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute right-4 top-4 text-[#7fa68f]">
            🔍
        </div>
    </div>
);
export function LISTA_TAREAS() {
    const [tareas, settareas] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    async function cargartareas() {
        const res = await leertareas();
        settareas(res.data);
    }
    useEffect(() => {
        cargartareas();
    }, []);
    const tareasFiltradas = tareas.filter((tarea) =>
        tarea.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="w-full">
            <SearchInput 
                value={busqueda} 
                onChange={setBusqueda} 
                placeholder="Filtrar inventario por nombre..." 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tareasFiltradas.length > 0 ? (
                    tareasFiltradas.map((tarea) => (
                        <MOSTRAR key={tarea.id} tareas={tarea} alActualizar={cargartareas}/>
                    ))
                ) : (
                    <p className="text-[#7fa68f] col-span-full text-center py-10">No hay productos que coincidan.</p>
                )}
            </div>
        </div>
    );
}

export function LISTA_MONINA() {
    const [nomina, setnomina] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        async function cargarnomina() {
            const resnomina = await leernomina();
            setnomina(resnomina.data);
        }
        cargarnomina();
    }, []);

    const nominaFiltrada = nomina.filter((n) =>
        n.nombre_empleado.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="w-full">
            <SearchInput 
                value={busqueda} 
                onChange={setBusqueda} 
                placeholder="Buscar empleado en nómina..." 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {nominaFiltrada.map(n => (
                    <MOSTRAR_NOMIMA key={n.id} nomina={n} />
                ))}
            </div>
        </div>
    );
}