import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import { DELIVERY_FEE, useStore } from '../store.jsx';
import { Header, Price, Thumb } from '../components.jsx';

export default function Cart() {
  const { t, tr } = useI18n();
  const { lines, subtotal, removeFromCart } = useStore();

  if (!lines.length) {
    return (
      <>
        <Header title={t('cart')} />
        <div className="empty">
          <div className="empty-icon">🛒</div>
          <p>{t('emptyCart')}</p>
          <Link className="btn" to="/categories">{t('goShopping')}</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title={t('cart')} />
      <div className="list">
        {lines.map((l) => (
          <div key={l.key} className="cart-line">
            <Thumb product={l.product} />
            <div className="cart-info">
              <div className="card-title">{tr(l.product.name)}</div>
              <small>📅 {l.date} · {l.days} {t('days')} · ×{l.qty}</small>
              <Price value={l.product.price * l.days * l.qty} />
            </div>
            <button className="link-btn" onClick={() => removeFromCart(l.key)}>{t('remove')}</button>
          </div>
        ))}
      </div>
      <section className="panel summary">
        <div><span>{t('subtotal')}</span><Price value={subtotal} /></div>
        <div><span>{t('delivery')}</span><Price value={DELIVERY_FEE} /></div>
        <div className="total"><span>{t('total')}</span><Price value={subtotal + DELIVERY_FEE} /></div>
      </section>
      <div className="action-bar">
        <Link className="btn block" to="/checkout">{t('checkout')}</Link>
      </div>
    </>
  );
}
