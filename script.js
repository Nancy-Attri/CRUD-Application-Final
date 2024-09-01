document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const price = parseFloat(document.getElementById('price').value);
    const image = document.getElementById('image').value;

    const product = { name, quantity, price, image };

    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error(Failed to add product: ${await response.text()});
        }

        await fetchProducts();
        document.getElementById('productForm').reset();
    } catch (error) {
        console.error('Error adding product:', error);
        alert('There was an error adding the product. Please try again.');
    }
});

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error(Failed to fetch products: ${await response.text()});
        }

        const products = await response.json();
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Quantity: ${product.quantity}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                ${product.image ? <img src="${product.image}" alt="${product.name}"> : ''}
                <button onclick="deleteProduct('${product._id}')">Delete</button>
            `;
            productList.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('There was an error fetching the product list. Please try again later.');
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(http://localhost:3000/products/${id}, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(Failed to delete product: ${await response.text()});
        }

        await fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('There was an error deleting the product. Please try again.');
    }
}


fetchProducts();