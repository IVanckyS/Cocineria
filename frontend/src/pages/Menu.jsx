import { useState } from "react";
import { useGetPlatos } from "../hooks/menu/useGetPlatos";
import { useCreatePlato } from "../hooks/menu/useCreatePlato";
import { useUpdatePlato } from "../hooks/menu/useUpdatePlato";
import { useDeletePlato } from "../hooks/menu/useDeletePlato";

const Menu = () => {
    //estados
    const [editingId, setEditingId] = useState(null);

    const [deleteId, setDeleteId] = useState(null);

    // Hooks
    const { platos, loading: loadingPlatos, error: errorPlatos } = useGetPlatos();
    const { plato: newPlato, handleChange: handleNewChange, handleSubmit: handleNewSubmit } = useCreatePlato();
    const { plato: updatedPlato, handleChange: handleUpdateChange, handleSubmit: handleUpdateSubmit } = useUpdatePlato(editingId);
    const { loading: loadingDelete } = useDeletePlato(deleteId);

    // Handler para iniciar edición
    const handleEdit = (id) => {
        setEditingId(id);
    };

    // Handler para eliminar plato
    const HandleDelete = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este plato?")) {
            setDeleteId(id);
        }
    }

    // cancelar edición
    const cancelEdit = () => {
        setEditingId(null);
    };

    return (
        <div className="menu-page">
            <h1>Gestión de Menú</h1>

            {/* creación de platos */}
            <div className="create-plato">
                <h2>Crear nuevo plato</h2>
                <form onSubmit={handleNewSubmit}>
                    <input
                        type="text"
                        name="nombrePlato"
                        placeholder="Nombre del plato"
                        value={newPlato.nombre}
                        onChange={handleNewChange}
                    />
                    <input
                        type="text"
                        name="ingredientesRequeridos"
                        placeholder="Ingredientes requeridos"
                        value={newPlato.ingredientesRequeridos}
                        onChange={handleNewChange}
                    />
                    <input
                        type="number"
                        name="valorVenta"
                        placeholder="Valor de venta"
                        value={newPlato.valorVenta}
                        onChange={handleNewChange}
                    />
                    <button type="submit">Crear plato</button>
                </form>
            </div>

            {/* Listar */}
            <div className="platos-list">
                <h2>Gestionar Menú</h2>
                {loadingPlatos && <p>Cargando platos...</p>}
                {errorPlatos && <p>Error: {errorPlatos.message}</p>}
                <ul>
                    {platos.map((plato) => (
                        <li key={plato.id}>
                            {editingId === plato.id ? (
                                
                                <form onSubmit={handleUpdateSubmit}>
                                    <input
                                        type="text"
                                        name="nombrePlato"
                                        placeholder="Nombre del plato"
                                        value={updatedPlato.nombre}
                                        onChange={handleUpdateChange}
                                    />
                                    <input
                                        type="text"
                                        name="ingredientesRequeridos"
                                        placeholder="Ingredientes requeridos"
                                        value={updatedPlato.ingredientesRequeridos}
                                        onChange={handleUpdateChange}
                                    />
                                    <input
                                        type="number"
                                        name="valorVenta"
                                        placeholder="Valor de venta"
                                        value={updatedPlato.valorVenta}
                                        onChange={handleUpdateChange}
                                    />
                                    <button type="submit" onClick={setEditingId}>Guardar</button>
                                    <button type="button" onClick={cancelEdit}>
                                        Cancelar
                                    </button>
                                </form>
                            ) : (
                                // vista
                                <div>
                                    <span>
                                        {plato.nombrePlato} - {plato.ingredientesRequeridos} - ${plato.valorVenta}
                                    </span>
                                    <button onClick={() => handleEdit(plato.id)}>Editar</button>
                                    <button onClick={() => HandleDelete(plato.id)}>
                                        {loadingDelete ? "Eliminando..." : "Eliminar"}
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Menu;