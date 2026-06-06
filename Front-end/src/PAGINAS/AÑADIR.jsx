import { useForm } from 'react-hook-form'
import { creartarea, borrartarea, editartarea, leertareaUnica } from '../API/TAREAS.API'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export function AÑADIR() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function cargarTarea() {
            if (params.id) {
                const { data } = await leertareaUnica(params.id);
                setValue('title', data.title);
                setValue('prioridad', data.prioridad);
                setValue('precio', data.precio);

            }
        }
        cargarTarea();
    }, [params.id, setValue]);

    const opcionesDescripcion = ["Electrónica", "Oficina", "Mantenimiento", "Consumible"];

    const onSubmit = handleSubmit(async (data) => {
        const payload = {
            ...data,
            description: Array.isArray(data.description) ? data.description.join(", ") : data.description
        };
        params.id ? await editartarea(params.id, payload) : await creartarea(payload);
        navigate("/t");
    });

    return (
        <div >
            <h2 className="text-[#56d2ff] text-2xl font-bold mb-6 text-center">
                {params.id ? 'Actualizar Producto' : 'Nuevo Producto'}
            </h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label className="text-[#7fa68f] text-xs uppercase tracking-widest ml-2">Nombre del Producto</label>
                    <input type="text" placeholder="Ej. Monitor Dell"
                        className="w-full p-3 rounded-xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] focus:border-[#42d0ff] focus:outline-none transition-all"
                        {...register("title", { required: true })} />
                </div>

                <div className="bg-[#11312a]/50 p-5 rounded-2xl border border-[#16392a]">
                    <p className="mb-4 text-[#7fa68f] text-xs uppercase tracking-widest font-bold text-center">Categorías</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {opcionesDescripcion.map((opcion) => (
                            <label key={opcion} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#173a2b] cursor-pointer transition-colors text-[#d4f4e3]">
                                <input type="checkbox" value={opcion} className="accent-[#42d0ff] w-4 h-4"
                                    {...register("description", { required: "Selecciona una" })} />
                                {opcion}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#7fa68f] text-xs uppercase tracking-widest ml-2">Stock / Cantidad</label>
                    <input type="number" className="w-full p-3 rounded-xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] focus:border-[#42d0ff] focus:outline-none"
                        {...register("prioridad", { required: true })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#7fa68f] text-xs uppercase tracking-widest ml-2">Precio de Producto ($)</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00"
                        className="w-full p-3 rounded-xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] focus:border-[#42d0ff] focus:outline-none"
                        {...register("precio", { required: "El precio es obligatorio" })} 
                    />
                </div>

                <button className="w-full bg-[#11312a] border border-[#42d0ff] text-[#42d0ff] font-bold p-3 rounded-xl hover:bg-[#42d0ff] hover:text-[#08150f] transition-all duration-300">
                    GUARDAR CAMBIOS
                </button>
            </form>

            {params.id && (
                <button className="mt-6 w-full text-red-400 text-sm hover:underline"
                    onClick={async () => {
                        if (window.confirm('¿Eliminar este registro permanentemente?')) {
                            await borrartarea(params.id);
                            navigate("/t");
                        }
                    }}>
                    Eliminar definitivamente
                </button>
            )}
        </div>
    );
}