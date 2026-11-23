import { useI18n } from '../i18n.jsx';
import { useStore } from '../store.jsx';
import { Header, Price } from '../components.jsx';

export default function Me() {
  const { t, lang, setLang } = useI18n();
  const { orders } = useStore();
  return (
    <>
      <Header title={t('me')} />
      <section className="panel">
        <h3>{t('language')}</h3>
        <div className="seg">
          <button className={lang === 'zh' ? 'active' : ''} onClick={() => setLang('zh')}>中文</button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>English</button>
        </div>
      </section>
      <section className="panel">
        <h3>{t('myOrders')}</h3>
        {orders.length === 0 && <p className="muted">{t('noOrders')}</p>}
        {orders.map((o) => (
          <div key={o.no} className="order-row">
            <div>
              <div>{t('orderNo')} {o.no}</div>
              <small className="muted">{new Date(o.date).toLocaleString()} · {o.lines.length} items</small>
            </div>
            <div className="order-right">
              <Price value={o.total} />
              <span className="tag">{t('pending')}</span>
            </div>
          </div>
        ))}
      </section>
      <section className="panel">
        <h3>{t('about')}</h3>
        <p className="muted">{t('aboutText')}</p>
        <h3>{t('contact')}</h3>
        <a className="btn ghost block" href="tel:+8600000000000">📞 {t('phone')}</a>
      </section>
    </>
  );
}
