// Lucas Miguel Pereyra -Pre-Entrega-

import { argv } from 'node:process';

const URL = 'https://fakestoreapi.com/products';
//Get o busqueda  de todos los productos mas funcion aplicada de filtrado por ID
const allP = async (url, id) => {

    if (id != undefined) {
        url = url + '/' + id;
    }
    const result = await fetch(url)
        .then((response) => {

            if (!response.ok) {
                if (id == undefined) { throw new Error('No se encuentran Productos.') }
                else { throw new Error('No se encuentra ese Productos.') }
            }
            return response.json();
        });
    return result;


};
//Delet o Borrado de productos por ID
const delP = async (url, id) => {
    url = url + '/' + id;
    const result = await fetch(url, { method: 'DELETE' })
        .then((response) => {


            if (!response.ok) {
                { throw new Error('No se pudo Eliminar el Producto.') }

            }
            return ("Producto Eliminado");
        });
    return result;
}
// Post o Creación de productos
const newP = async (url, titulo, precio) => {
    const product = { title: titulo, price: precio };

    const result = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) })
        .then((response) => {

            if (!response.ok) {
                { throw new Error('No se pudo Crear el Producto.') }

            }
            return response.json();
        });


    return result;

}
//Put o Edición de producto
const editP = async (url, id, titulo, precio) => {
    const product = { title: titulo, price: precio };
    url = url + '/' + id;
    const result = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) })
        .then((response) => {

            if (!response.ok) {
                { throw new Error('No se pudo Editar el Producto.') }

            }
            return response.json();
        });


    return result;

}


//Invocación de Metodos Ingrese GET o get para buscar , DELETE o delete para eliminar , PUT o put para editar y POST o post para crear .
switch (argv[2]) {
    case "GET":
    case "get":
        try {
            const search = await allP(URL, argv[3]);
            console.log(search);

        } catch (error) {
            console.log(error);
        }
        break;
    case "DELETE":
    case "delete":
        try {
            //
            const del = await delP(URL, argv[3]);
            console.log(del);


        } catch (error) {
            console.log(error);
        }

        break;
    default:
        break;
    case "POST":
    case "post":
        try {
            //argv 3 representa el nombre o titulo y 4 el precio
            const post = await newP(URL, argv[3], argv[4]);
            console.log(post);


        } catch (error) {
            console.log(error);
        }

        break;
    case "PUT":
    case "put":
        try {
            //argv 3 representa el ID , 4 el nombre o titulo y 5 el precio
            const put = await editP(URL, argv[3], argv[4], argv[5]);
            console.log(put);


        } catch (error) {
            console.log(error);
        }

        break;
}
