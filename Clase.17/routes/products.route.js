import express from 'express'
import filesystem from 'fs'

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
  try {
      const product_list = await filesystem.promises.readFile('./data/products.json', 'utf-8')
      res.json({
          ok: true,
          status: 200,
          payload: {
              message: JSON.parse(product_list)
          }
      })
  }
  catch (error) {
      res.json({
          ok: false,
          status: 500,
          payload: {
              message: 'Falló el servidor',
              detail: error.message
          }
      })
  }
})

productRouter.post("/", async (req, res) => {
	const { title, price, categoria, stock } = req.body;

	// Definir las categorías válidas
	const categorias_existentes = ['ROPA', 'ELECTRODOMESTICO', 'JUGUETERIA', 'TECNOLOGIA'];

	// Validaciones:

	// 1. Verificar si el title es un string y no está vacío
	if (typeof title !== 'string' || title.trim() === '') {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: "El campo 'title' es requerido y debe ser un string no vacío."
		});
	}

	// 2. Verificar si el precio es un número y no negativo
	if (typeof price !== 'number' || price < 0) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: "El campo 'price' debe ser un número y no puede ser negativo."
		});
	}

	// 3. Verificar si el stock es un número y no negativo
	if (typeof stock !== 'number' || stock < 0) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: "El campo 'stock' debe ser un número y no puede ser negativo."
		});
	}

	// 4. Verificar si la categoría es válida
	if (!categorias_existentes.includes(categoria)) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: `La categoría '${categoria}' no es válida. Categorías válidas: ${categorias_existentes.join(', ')}.`
		});
	}

	try {
		// Leer y parsear el archivo JSON
		const products = await filesystem.promises.readFile("./data/products.json", { encoding: 'utf-8' });
		const productsJson = JSON.parse(products);

		// 5. Verificar si el producto ya existe (por el título)
		const existingProduct = productsJson.find(product => product.title === title);
		if (existingProduct) {
			return res.status(400).json({
				ok: false,
				status: 400,
				message: "Ya existe un producto con el mismo título."
			});
		}

		// Crear el nuevo producto
		const newProduct = { title, price, categoria, stock };

		// Agregar el nuevo producto
		productsJson.push(newProduct);

		// Escribir el archivo actualizado
		const updatedProducts = JSON.stringify(productsJson, null, 2);
		await filesystem.promises.writeFile("./data/products.json", updatedProducts, 'utf-8');

		// Responder con la lista actualizada de productos
		res.json({
			ok: true,
			status: 201,
			payload: {
				products: productsJson
			}
		});

	} catch (error) {
		// Manejo de errores de lectura/escritura de archivos
		res.status(500).json({
			ok: false,
			status: 500,
			message: "Error del servidor: " + error.message
		});
	}
});

export default productRouter