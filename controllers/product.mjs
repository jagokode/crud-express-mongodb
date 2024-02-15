import Product from '../models/product.mjs';

const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		if (products.length === 0)
			return res.status(200).json({ message: 'No products available' });
		return res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getProduct = async (req, res) => {
	try {
		const { productId } = req.params;
		const product = await Product.findById(productId);
		if (!product)
			return res.status(200).json({ message: 'Product not found' });
		return res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		return res
			.status(201)
			.json({ product, message: 'Product has been saved' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateProduct = async (req, res) => {
	try {
		const { productId } = req.params;
		const product = await Product.findByIdAndUpdate(productId, req.body);
		if (!product)
			return res.status(200).json({ message: 'Product not found' });

		const updatedProduct = await Product.findById(productId);
		return res
			.status(200)
			.json({ product: updatedProduct, message: 'Product updated' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const { productId } = req.params;
		const product = await Product.findByIdAndDelete(productId);

		if (!product)
			return res.status(404).json({ message: 'Product not found' });

		return res.status(200).json({ message: 'Product deleted' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
