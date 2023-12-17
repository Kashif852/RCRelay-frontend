import HomePage from '../pages/homePage/HomePage';
import ProductsPage from '../pages/productpage/ProductsPage';
import CheckoutPage from '../pages/checkoutPage/CheckoutPage';

const routesConfig = [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    path: '/products',
    component: ProductsPage
  },
  {
    path: '/checkout',
    component: CheckoutPage
  }
];

export default routesConfig;
