const fs = require('fs');
const path = require('path');

function loadJSONFile(filename) {
  const filePath = path.join(__dirname, '..', 'data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function loadProducts() {
  const productsDir = path.join(__dirname, '..', 'data', 'products');
  const productFiles = fs.readdirSync(productsDir).filter(file => file.endsWith('.json'));
  
  let allProducts = [];
  productFiles.forEach(file => {
    const products = JSON.parse(
      fs.readFileSync(path.join(productsDir, file), 'utf8')
    );
    allProducts = allProducts.concat(products);
  });
  
  return allProducts;
}

function loadData() {
  return {
    categories: loadJSONFile('categories.json'),
    whyBoycott: loadJSONFile('why_boycott.json'),
    countries: loadJSONFile('countries.json'),
    products: loadProducts(),
  };
}

module.exports = {
  loadData,
  loadJSONFile,
  loadProducts,
};

