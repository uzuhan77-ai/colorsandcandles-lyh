import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, featuredIds, posts, products } from '../data.js';
import { useI18n } from '../i18n.jsx';
import { ProductCard } from '../components.jsx';

export default function Home() {
  const { t, tr } = useI18n();
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const results = query
    ? products.filter((p) => (p.name.zh + p.name.en).toLowerCase().includes(query))
    : null;

  return (
    <>
      <section className="hero">
        <h1>{t('appName')}</h1>
        <p>{t('slogan')}</p>
        <input className="search" placeholder={'🔍 ' + t('search')} value={q} onChange={(e) => setQ(e.target.value)} />
      </section>

      {results ? (
        <div className="grid">{results.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      ) : (
        <>
          <section className="cat-row">
            {categories.map((c) => (
              <Link key={c.id} to={`/categories/${c.id}`} className="cat-chip">
                <span className="cat-icon" style={{ background: c.color }}>{c.icon}</span>
                <span>{tr(c.name)}</span>
              </Link>
            ))}
          </section>

          <div className="section-head">
            <h2>{t('featured')}</h2>
            <Link to="/categories">{t('viewAll')} ›</Link>
          </div>
          <div className="grid">
            {featuredIds.map((id) => <ProductCard key={id} product={products.find((p) => p.id === id)} />)}
          </div>

          <div className="section-head"><h2>{t('blog')}</h2></div>
          <div className="list">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="list-item">
                <span className="list-icon">{post.icon}</span>
                <span>{tr(post.title)}</span>
                <span className="chev">›</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
