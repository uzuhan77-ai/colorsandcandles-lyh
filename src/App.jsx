import { NavLink, Route, Routes } from 'react-router-dom';
import { useI18n } from './i18n.jsx';
import { useStore } from './store.jsx';
import Home from './pages/Home.jsx';
import Categories from './pages/Categories.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Me from './pages/Me.jsx';
import Post from './pages/Post.jsx';

export default function App() {
  const { t } = useI18n();
  const { cart } = useStore();
  const tabs = [
    { to: '/', icon: '🏠', label: t('home') },
    { to: '/categories', icon: '🧩', label: t('categories') },
    { to: '/cart', icon: '🛒', label: t('cart'), badge: cart.length },
    { to: '/me', icon: '👤', label: t('me') },
  ];
  return (
    <div className="app">
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:catId" element={<Categories />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/me" element={<Me />} />
          <Route path="/blog/:id" element={<Post />} />
        </Routes>
      </main>
      <nav className="tabbar">
        {tabs.map((tab) => (
          <NavLink key={tab.to} to={tab.to} end={tab.to === '/'} className="tab">
            <span className="tab-icon">{tab.icon}</span>
            {tab.badge > 0 && <span className="badge">{tab.badge}</span>}
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
