import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import TextFieldValue from "../../TextFildValue/TextFildValue";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { removeElementActive } from "../../../../redux/slices/TablaReducer";
import { IArticuloManufacturado } from "../../../../types/IArticuloManufacturado";
import { ArticuloManufacturadoService } from "../../../../services/ArticuloManufacturadoService";
import ArticuloInsumoSearch from "../../Search/ArticuloInsumoSearch";
import { IArticuloInsumo } from "../../../../types/IArticuloInsumo";
import { useState } from "react";

const API_URL = "http://localhost:8080";

// Interfaz para los props del componente ModalPersona
interface IModalArticuloManufacturado {
    getArticuloManufacturado: Function; // Función para obtener los artículos manufacturados
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}

// Definición del componente ModalArticuloManufacturado
export const ModalArticuloManufacturado = ({
    getArticuloManufacturado,
    openModal,
    setOpenModal,
}: IModalArticuloManufacturado) => {
    // Valores iniciales para el formulario
    const initialValues: IArticuloManufacturado = {
        id: 0,
        denominacion: "",
        precioVenta: 0,
        imagenes: [],
        descripcion: "",
        tiempoEstimadoMinutos: 0,
        preparacion: "",
        articuloManufacturadoDetalles: []
    };

    const [insumos, setInsumos] = useState<{ item: IArticuloInsumo, quantity: number }[]>([]);

    // URL de la API obtenida desde las variables de entorno
    const apiArticuloManufacturado = new ArticuloManufacturadoService(API_URL + "/articulo-manufacturado");

    const elementActive = useAppSelector(
        (state) => state.tablaReducer.elementActive
    );
    const dispatch = useAppDispatch();

    // Función para cerrar el modal
    const handleClose = () => {
        setOpenModal(false);
        dispatch(removeElementActive());
    };

    // Función para agregar insumo seleccionado y su cantidad
    const handleSelectInsumo = (item: IArticuloInsumo, quantity: number) => {
        setInsumos([...insumos, { item, quantity }]);
    };

    // Esquema de validación
    const validationSchema = Yup.object({
        denominacion: Yup.string().required("Campo requerido"),
        precioVenta: Yup.number().required("Campo requerido"),
        descripcion: Yup.string().required("Campo requerido"),
        tiempoEstimadoMinutos: Yup.number().required("Campo requerido"),
        preparacion: Yup.string().required("Campo requerido"),
        articuloManufacturadoDetalles: Yup.array()
            .of(
                Yup.object().shape({
                    cantidad: Yup.number().required("La cantidad es requerida").min(1, "La cantidad debe ser mayor a 0"),
                    articuloInsumo: Yup.object().shape({
                        id: Yup.number().required("El insumo es requerido"),
                        denominacion: Yup.string().required("La denominación es requerida")
                    }).required("El insumo es requerido")
                })
            )
            .min(1, "Debe agregar al menos un insumo")
            .required("Debe agregar al menos un insumo")
    });

    return (
        <>
            <div>
                {/* Componente Modal de React Bootstrap */}
                <Modal
                    id={"modal"}
                    show={openModal}
                    onHide={handleClose}
                    size={"lg"}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        {/* Título del modal dependiendo de si se está editando o añadiendo un artículo manufacturado */}
                        {elementActive ? (
                            <Modal.Title>Editar un Articulo Manufacturado:</Modal.Title>
                        ) : (
                            <Modal.Title>Añadir un Articulo Manufacturado:</Modal.Title>
                        )}
                    </Modal.Header>
                    <Modal.Body>
                        {/* Componente Formik para el formulario */}
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={elementActive ? elementActive : initialValues}
                            enableReinitialize={true}
                            onSubmit={async (values: IArticuloManufacturado) => {
                                // Convertir insumos seleccionados a articuloManufacturadoDetalles
                                const articuloManufacturadoDetalles = insumos.map(({ item, quantity }) => ({
                                    id: 0, // Id inicial, será generado por el backend
                                    cantidad: quantity,
                                    articuloInsumo: item,
                                    eliminado: false
                                }));

                                // Asignar los detalles al artículo manufacturado
                                values.articuloManufacturadoDetalles = articuloManufacturadoDetalles;

                                // Persistir el artículo manufacturado con sus detalles
                                if (elementActive) {
                                    await apiArticuloManufacturado.put(elementActive.id, values);
                                } else {
                                    await apiArticuloManufacturado.post(values);
                                }

                                // Obtener los artículos manufacturados actualizados y cerrar el modal
                                getArticuloManufacturado();
                                handleClose();
                            }}
                        >
                            {() => (
                                <>
                                    {/* Formulario */}
                                    <Form autoComplete="off" className="form-obraAlta">
                                        <div className="container_Form_Ingredientes">
                                            {/* Campos del formulario */}
                                            <TextFieldValue
                                                label="denominacion:"
                                                name="denominacion"
                                                type="text"
                                                placeholder="denominacion"
                                            />
                                            <TextFieldValue
                                                label="precioVenta:"
                                                name="precioVenta"
                                                type="number"
                                                placeholder="precioVenta"
                                            />

                                            <TextFieldValue
                                                label="descripcion:"
                                                name="descripcion"
                                                type="text"
                                                placeholder="descripcion"
                                            />

                                            <TextFieldValue
                                                label="tiempoEstimadoMinutos:"
                                                name="tiempoEstimadoMinutos"
                                                type="number"
                                                placeholder="tiempoEstimadoMinutos"
                                            />
                                            <TextFieldValue
                                                label="preparacion:"
                                                name="preparacion"
                                                type="string"
                                                placeholder="preparacion"
                                            />
                                            <div>
                                                <input type="file" name="" id="" onChange={e => console.log(e.target.files)}></input>
                                            </div>

                                        </div>
                                        <ArticuloInsumoSearch onSelect={handleSelectInsumo} />
                                        <div>
                                            <h3>Insumos Seleccionados</h3>
                                            <ul>
                                                {insumos.map((insumo, index) => (
                                                    <li key={index}>
                                                        {insumo.item.denominacion} - Cantidad: {insumo.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* Botón para enviar el formulario */}
                                        <div className="d-flex justify-content-end">
                                            <Button variant="success" type="submit">
                                                Enviar
                                            </Button>
                                        </div>
                                    </Form>
                                </>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}