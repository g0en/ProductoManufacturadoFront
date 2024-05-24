import { useEffect, useState } from "react";
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";
import { IArticuloManufacturado } from "../../types/IArticuloManufacturado";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TablaReducer";
import Swal from "sweetalert2";
import { ModalArticuloManufacturado } from "../ui/modals/ModalArticuloManufacturado/ModalArticuloManufacturado";
 
const API_URL = "http://localhost:8080";

export const ScreenArticuloManufacturado = () => {
    // Estado para controlar la carga de datos
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const articuloManufacturadoService = new ArticuloManufacturadoService(API_URL + "/articulo-manufacturado");
    const dispatch = useAppDispatch();

    const ColumnsTableArticuloManufacturado = [
        {
            label: "id",
            key: "id",
            render: (articuloManufacturado: IArticuloManufacturado) => (articuloManufacturado?.id ? articuloManufacturado.id : 0),
        },
        {
            label: "Imagen",
            key: "imagenes",
            render: (articuloManufacturado: IArticuloManufacturado) => (
                <img
                    src={articuloManufacturado.imagenes[0]?.url}
                    alt={articuloManufacturado.denominacion}
                    style={{ width: '50px', height: '50px' }}
                />
            ),
        },
        {
            label: "denominacion",
            key: "denominacion"
        },
        {
            label: "precio Venta",
            key: "precioVenta"
        },
        {
            label: "descripcion",
            key: "descripcion"
        },
        {
            label: "tiempo EstimadoMinutos",
            key: "tiempoEstimadoMinutos"
        },
        {
            label: "preparacion",
            key: "preparacion"
        },
        { label: "Acciones", key: "acciones" }
    ];

    // Función para manejar el borrado de una persona
    const handleDelete = async (id: number) => {
        // Mostrar confirmación antes de eliminar
        Swal.fire({
            title: "¿Estas seguro?",
            text: `¿Seguro que quieres eliminar?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminar la persona si se confirma
                articuloManufacturadoService.delete(id).then(() => {
                    getArticuloManufacturado();
                });
            }
        });
    };

    // Función para obtener las personas
    const getArticuloManufacturado = async () => {
        await articuloManufacturadoService.getAll().then((articuloManufacturadoData) => {
            dispatch(setDataTable(articuloManufacturadoData));
            setLoading(false);
        });
    };

    // Efecto para cargar los datos al inicio
    useEffect(() => {
        setLoading(true);
        getArticuloManufacturado();
    }, []);

    return (
        <>
            <div>
                <div
                    style={{
                        padding: ".4rem",
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "90%",
                    }}
                >
                    {/* Botón para abrir el modal de agregar persona */}
                    <Button
                        onClick={() => {
                            setOpenModal(true);
                        }}
                        variant="contained"
                    >
                        Agregar
                    </Button>
                </div>
                {/* Mostrar indicador de carga mientras se cargan los datos */}
                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%",
                            gap: "2vh",
                            height: "100%",
                        }}
                    >
                        <CircularProgress color="secondary" />
                        <h2>Cargando...</h2>
                    </div>
                ) : (
                    // Mostrar la tabla de personas una vez que los datos se han cargado
                    <TableGeneric<IArticuloManufacturado>
                        handleDelete={handleDelete}
                        columns={ColumnsTableArticuloManufacturado}
                        setOpenModal={setOpenModal}
                    />
                )}
            </div>

            {/* Modal para agregar o editar una persona */}
            <ModalArticuloManufacturado
                getArticuloManufacturado={getArticuloManufacturado}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    )
};

