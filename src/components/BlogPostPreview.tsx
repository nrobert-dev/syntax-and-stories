// src/components/BlogPostPreview.tsx
import React from 'react';
import styles from './BlogPostPreview.module.css';

interface PostData {
  title: string;
  pubDate: Date;
  draft?: boolean;
}

interface Props {
  post: {
    slug: string;
    data: PostData;
    body: string;
  };
}

const BlogPostPreview: React.FC<Props> = ({ post }) => {
  const postUrl = `/blog/${post.slug}/`;

  const formattedDateEU = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(post.data.pubDate);

  const MAX_EXCERPT_LENGTH = 180;
  const plainTextBody = post.body
    .replace(/---[\s\S]*?---/, '') // Remove frontmatter if accidentally included
    .replace(/<[^>]*>?/gm, '')      // Remove HTML tags
    .replace(/[`*#~\[\]()]/g, '')   // Remove common markdown characters
    .replace(/\n+/g, ' ')            // Replace newlines with spaces
    .trim();

  const excerpt =
    plainTextBody.length > MAX_EXCERPT_LENGTH
      ? plainTextBody.substring(0, MAX_EXCERPT_LENGTH) + '...'
      : plainTextBody;

  return (
    <li className={styles.card}>
      <h3 className={styles.title}>
        <a href={postUrl}>{post.data.title}</a>
        {post.data.draft && <span className={styles.draftNotice}>(Draft)</span>}
      </h3>
      <time dateTime={post.data.pubDate.toISOString()} className={styles.date}>
        {formattedDateEU}
      </time>

      <p className={styles.description}>{excerpt}</p>
      <a href={postUrl} className={styles.readMore}>
        Read more &rarr;
      </a>
    </li>
  );
};

export default BlogPostPreview;