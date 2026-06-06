import { useForm } from 'react-hook-form'
import { crearnomina, borrarnomina, editarnomina, leernominaUnica } from '../API/TAREAS.API'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export function AÑADIR_NOMINA() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function cargarEmpleado() {
            if (params.id) {
                const res = await leernominaUnica(params.id);
                setValue('nombre_empleado', res.data.nombre_empleado);
                setValue('apellido_empleado', res.data.apellido_empleado);
                setValue('cargo', res.data.cargo);
                setValue('salario', res.data.salario);
            }
        }
        cargarEmpleado();
    }, [params.id, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await editarnomina(params.id, data);
        } else {
            await crearnomina(data);
        }
        navigate("/n");
    });

    return (
        <div >
            <h2 className="text-[#56d2ff] text-2xl font-bold mb-6 text-center">
                {params.id ? 'Actualizar Perfil de Empleado' : 'Nuevo Registro de Nómina'}
            </h2>
            
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-[#7fa68f] text-xs uppercase tracking-widest ml-2">Nombre</label>
                        <input type="text" placeholder="Ej. Juan"
                            className="w-full p-3 rounded-xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] focus:border-[#42d0ff] focus:outline-none transition-all"
                            {...register("nombre_empleado", { required: true })} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[#7fa68f] text-xs uppercase tracking-widest ml-2">Apellidos</label>
                        <input type="text" placeholder="Ej. Pérez"
                            className="w-full p-3 rounded-xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] focus:border-[#42d0ff] focus:outline-none transition-all"
                            {...register("apellido_empleado", { required: true })} />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#7fa68f] text-xs uppercase tracking-widest ml-2">Cargo</label>
                    <input type="text" placeholder="Ej. Gerente de Ventas"
                        className="w-full p-3 rounded-xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] focus:border-[#42d0ff] focus:outline-none transition-all"
                        {...register("cargo", { required: true })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#7fa68f] text-xs uppercase tracking-widest ml-2">Salario Mensual ($)</label>
                    <input type="number" placeholder="0.00"
                        className="w-full p-3 rounded-xl bg-[#11312a] border border-[#16392a] text-[#d4f4e3] focus:border-[#42d0ff] focus:outline-none transition-all"
                        {...register("salario", { required: true })} />
                </div>
                
                <button className="w-full mt-4 bg-[#11312a] border border-[#42d0ff] text-[#42d0ff] font-bold p-3 rounded-xl hover:bg-[#42d0ff] hover:text-[#08150f] transition-all duration-300">
                    {params.id ? 'GUARDAR CAMBIOS' : 'REGISTRAR EMPLEADO'}
                </button>
            </form>

            {params.id && (
                <button className="mt-6 w-full text-red-400 text-sm hover:underline transition-all"
                    onClick={async () => {
                        if (window.confirm('¿Eliminar este empleado permanentemente?')) {
                            await borrarnomina(params.id);
                            navigate("/n");
                        }
                    }}>
                    Eliminar registro definitivamente
                </button>
            )}
        </div>
    );
}