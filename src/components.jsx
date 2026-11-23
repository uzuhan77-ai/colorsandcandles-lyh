import { Link, useNavigate } from 'react-router-dom';
import { categories } from './data.js';
import { useI18n } from './i18n.jsx';

export function Header({ title, back }) {
  const navigate = useNavigate();
  return (
    <header className="header">
      {back && <button className="back" onClick={() => navigate(-1)} aria-label="back">‹</button>}
      <h1>{title}</h1>
    </header>
  );
}

export function Thumb({ product, large }) {
  const color = categories.find((c) => c.id === product.cat)?.color;
  return (
    <div className={large ? 'thumb thumb-lg' : 'thumb'} style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}>
      {product.icon}
    </div>
  );
}

export function Price({ value, suffix }) {
  const { t } = useI18n();
  return (
    <span className="price">
      {t('currency')}{value.toLocaleString()}
      {suffix && <small>{t('perDay')}</small>}
    </span>
  );
}

export function ProductCard({ product }) {
  const { tr } = useI18n();
  return (
    <Link to={`/product/${product.id}`} className="card">
      <Thumb product={product} />
      <div className="card-body">
        <div className="card-title">{tr(product.name)}</div>
        <Price value={product.price} suffix />
      </div>
    </Link>
  );
}
