const apiBase =
  process.env.NODE_ENV === 'production'
    ? 'https://ethsf.herokuapp.com'
    : 'https://ethsf.herokuapp.com';
const buildRoute = path => `${apiBase}/${path}`;

const basketRoutes = {
  all: () => buildRoute('sets')
};

const pricesRoutes = {
  detail: (symbol) => buildRoute(`services?symbol=${symbol}`)
}

export const routes = {
  baskets: basketRoutes,
  prices: pricesRoutes
};
