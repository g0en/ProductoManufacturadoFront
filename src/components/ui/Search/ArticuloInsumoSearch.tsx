import React, { useState } from 'react';
import { ArticuloInsumoService } from '../../../services/ArticuloInsumoService'; // Ajusta la ruta según sea necesario
import { IArticuloInsumo } from '../../../types/IArticuloInsumo';

//interface IArticuloInsumo {
//    id: number;
//    denominacion: string;
//    precioVenta: number;
//    precioCompra: number;
//    stockActual: number;
//    stockMaximo: number;
//    esParaElaborar: boolean;
//    imagenes: { id: number; url: string }[];
//}

const API_URL = "http://localhost:8080";

const articuloInsumoService = new ArticuloInsumoService(API_URL + "/articulo-insumo");

interface IArticuloInsumoSearchProps {
    onSelect: (item: IArticuloInsumo, quantity: number) => void;
}

const ArticuloInsumoSearch: React.FC<IArticuloInsumoSearchProps> = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<IArticuloInsumo[]>([]);
    const [selectedItem, setSelectedItem] = useState<IArticuloInsumo | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const handleSearch = async () => {
        try {
            const data = await articuloInsumoService.searchByDenominacion(searchTerm);
            setResults(data.filter((item: IArticuloInsumo) => item.esParaElaborar));
        } catch (error) {
            console.error('Error searching articulo insumo:', error);
        }
    };

    const handleSelect = () => {
        if (selectedItem && quantity > 0 && quantity <= selectedItem.stockActual) {
            onSelect(selectedItem, quantity);
            setSelectedItem(null);
            setQuantity(1);
            setSearchTerm('');
            setResults([]);
        } else {
            alert('Please select a valid item and quantity');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar insumos"
            />
            <button onClick={handleSearch}>Buscar</button>

            <div>
                <h3>Resultados de búsqueda</h3>
                <ul>
                    {results.map((item) => (
                        <li key={item.id} onClick={() => setSelectedItem(item)}>
                            {item.denominacion} - Stock: {item.stockActual}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedItem && (
                <div>
                    <h4>Seleccionado: {selectedItem.denominacion}</h4>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        placeholder="Cantidad"
                    />
                    <button onClick={handleSelect}>Agregar</button>
                </div>
            )}
        </div>
    );
};

export default ArticuloInsumoSearch;