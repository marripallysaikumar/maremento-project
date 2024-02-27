const productContainer = document.getElementById('productContainer');

async function fetchData() {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json();
    //console.log(data.categories)
    return data.categories;
}

function showCategory(category) {
    //console.log(category)
    fetchData().then(data => {
        const products = data.filter(each => each.category_name === category);
        const result = (products[0].category_products)
        if (result) {
            productContainer.innerHTML = '';

            result.map(res => {
                const card = createProductCard(res);
                productContainer.appendChild(card);
            });

        }


    });

}

function createProductCard(result) {
    console.log(result)
    const card = document.createElement('div');
    card.classList.add('product-card');

    const image = document.createElement('img');
    image.src = result.image;
    image.alt = result.title;
    image.classList.add('product-image');
    card.appendChild(image);

    const badge = document.createElement('div');
    badge.textContent = result.badge;
    card.appendChild(badge);

    const title = document.createElement('h3');
    title.textContent = result.title;
    card.appendChild(title);

    const vendor = document.createElement('p');
    vendor.textContent = `Vendor: ${result.vendor}`;
    card.appendChild(vendor);

    const price = document.createElement('p');
    price.textContent = `Price: $${result.price}`;
    card.appendChild(price);

    const comparePrice = document.createElement('p');
    comparePrice.textContent = `Compare at Price: $${result.compare_at_price}`;
    card.appendChild(comparePrice);

    const discount = document.createElement('p');
    const discountPercentage = ((result.compare_at_price - result.price) / result.compare_at_price) * 100;
    discount.textContent = `Discount: ${discountPercentage.toFixed(2)}% off`;
    card.appendChild(discount);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart-button');
    card.appendChild(addToCartButton);


    return card;
}


showCategory('Men');