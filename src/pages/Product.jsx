import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../data.js';
import { useI18n } from '../i18n.jsx';
import { useStore } from '../store.jsx';
import { Header, Price, Thumb } from '../components.jsx';

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

function Stepper({ value, onChange, min = 1, max = 10 }) {
  return (
    <div className="stepper">
      <button onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <span>{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const { t, tr } = useI18n();
  const { addToCart } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [date, setDate] = useState(tomorrow());
  const [days, setDays] = useState(1);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);

  if (!product) return <Header title="404" back />;

  const add = () => {
    addToCart({ id: product.id, date, days, qty });
    setToast(true);
    setTimeout(() => setToast(false), 1500);
  };

  return (
    <>
      <Header title={tr(product.name)} back />
      <Thumb product={product} large />
      <section className="panel">
        <h2>{tr(product.name)}</h2>
        <Price value={product.price} suffix />
        <p className="desc">{tr(product.desc)}</p>
        <dl className="specs">
          <dt>{t('size')}</dt><dd>{product.size}</dd>
          <dt>{t('age')}</dt><dd>{product.age}</dd>
          <dt>{t('staff')}</dt><dd>{product.staff ? t('yes') : t('no')}</dd>
        </dl>
      </section>
      <section className="panel form">
        <label>{t('rentDate')}<input type="date" min={tomorrow()} value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <label>{t('days')}<Stepper value={days} onChange={setDays} max={7} /></label>
        <label>{t('qty')}<Stepper value={qty} onChange={setQty} /></label>
      </section>
      <div className="action-bar">
        <Price value={product.price * days * qty} />
        <button className="btn ghost" onClick={add}>{t('addToCart')}</button>
        <button className="btn" onClick={() => { add(); navigate('/cart'); }}>{t('bookNow')}</button>
      </div>
      {toast && <div className="toast">✓ {t('added')}</div>}
    </>
  );
}
