import { Link, useParams } from 'react-router-dom';
import { categories, products } from '../data.js';
import { useI18n } from '../i18n.jsx';
import { Header, ProductCard } from '../components.jsx';

export default function Categories() {
  const { t, tr } = useI18n();
  const { catId } = useParams();
  const list = catId ? products.filter((p) => p.cat === catId) : products;
  return (
    <>
      <Header title={t('categories')} />
      <div className="tabs-scroll">
        <Link to="/categories" className={!catId ? 'pill active' : 'pill'}>{t('allCats')}</Link>
        {categories.map((c) => (
          <Link key={c.id} to={`/categories/${c.id}`} className={catId === c.id ? 'pill active' : 'pill'}>
            {c.icon} {tr(c.name)}
          </Link>
        ))}
      </div>
      <div className="grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </>
  );
}
