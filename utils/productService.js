const { translate } = require('./i18n');

function filterProducts(products, categoryId, countryCode) {
  let filtered = [...products];

  if (categoryId) {
    filtered = filtered.filter(product => product.category_id === categoryId);
  }

  if (countryCode) {
    filtered = filtered.filter(
      product => product.country_code === countryCode.toUpperCase()
    );
  }

  return filtered;
}

function paginate(array, page, limit) {
  const total = array.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginated = array.slice(startIndex, endIndex);

  return {
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

function translateProduct(product, lang, categoriesData, countriesData) {
  const translated = {
    name: product.name,
  };

  const category = categoriesData.find(cat => cat.id === product.category_id);
  if (category) {
    translated.category = translate(category.name, lang);
  }

  const country = countriesData.find(c => c.code === product.country_code);
  if (country) {
    translated.country = translate(country.name, lang);
    translated.countryCode = country.code;
  }

  if (product.alternatives) {
    translated.alternatives = product.alternatives.map(alt => ({
      name: alt.name,
      link: alt.link,
      countryCode: alt.country_code,
      country: translate(
        countriesData.find(c => c.code === alt.country_code)?.name || {},
        lang
      ),
    }));
  }

  return translated;
}

function getProducts(products, categoriesData, countriesData, lang, filters, pagination) {
  const { categoryId, countryCode } = filters;
  const { page = 1, limit = 10 } = pagination;

  const filtered = filterProducts(products, categoryId, countryCode);
  const { data: paginated, pagination: paginationInfo } = paginate(filtered, page, limit);

  const translated = paginated.map(product =>
    translateProduct(product, lang, categoriesData, countriesData)
  );

  return {
    data: translated,
    pagination: paginationInfo,
  };
}

module.exports = {
  getProducts,
  filterProducts,
  paginate,
  translateProduct,
};

