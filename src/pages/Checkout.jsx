import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import { DELIVERY_FEE, useStore } from '../store.jsx';
import { Header, Price } from '../components.jsx';

export default function Checkout() {
  const { t } = useI18n();
  const { lines, subtotal, placeOrder } = useStore();
  const [form, setForm] = useState({ name: '', phone: '', city: '', address: '', notes: '' });
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  if (order) {
    return (
      <div className="empty">
        <div className="empty-icon">🎉</div>
        <h2>{t('orderDone')}</h2>
        <p>{t('orderNo')} {order.no}</p>
        <p className="muted">{t('orderDoneTip')}</p>
        <Link className="btn" to="/">{t('backHome')}</Link>
      </div>
    );
  }
  if (!lines.length) return <Navigate to="/cart" replace />;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const { name, phone, city, address } = form;
    if (!name.trim() || !city.trim() || !address.trim() || !/^\+?\d{7,15}$/.test(phone.trim())) {
      setError(t('required'));
      return;
    }
    setOrder(placeOrder(form));
  };

  return (
    <>
      <Header title={t('checkout')} back />
      <form className="panel form" onSubmit={submit}>
        <label>{t('name')}<input value={form.name} onChange={set('name')} /></label>
        <label>{t('phone')}<input type="tel" inputMode="tel" value={form.phone} onChange={set('phone')} /></label>
        <label>{t('city')}<input value={form.city} onChange={set('city')} /></label>
        <label>{t('address')}<textarea rows="2" value={form.address} onChange={set('address')} /></label>
        <label>{t('notes')}<textarea rows="2" value={form.notes} onChange={set('notes')} /></label>
        {error && <p className="error">{error}</p>}
        <div className="summary">
          <div className="total"><span>{t('total')}</span><Price value={subtotal + DELIVERY_FEE} /></div>
        </div>
        <button className="btn block" type="submit">{t('submitOrder')}</button>
      </form>
    </>
  );
}
