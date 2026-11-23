import { useParams } from 'react-router-dom';
import { posts } from '../data.js';
import { useI18n } from '../i18n.jsx';
import { Header } from '../components.jsx';

export default function Post() {
  const { id } = useParams();
  const { t, tr } = useI18n();
  const post = posts.find((p) => p.id === id);
  if (!post) return <Header title="404" back />;
  return (
    <>
      <Header title={t('blog')} back />
      <article className="panel">
        <div className="post-icon">{post.icon}</div>
        <h2>{tr(post.title)}</h2>
        <p className="desc">{tr(post.body)}</p>
      </article>
    </>
  );
}
