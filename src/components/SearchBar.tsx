// src/components/SearchBar.tsx
import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import styles from '../styles/SearchBar.module.css';

interface Post {
  title: string;
  description?: string;
  content?: string;
  tags?: string[];
  slug:string;
}

interface SearchBarProps {
  posts: Post[];
}

function SearchBar({ posts }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const fuseRef = useRef<Fuse<Post> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (posts && posts.length > 0) {
      fuseRef.current = new Fuse(posts, {
        keys: ['title', 'description', 'content', 'tags'],
        threshold: 0.3,
      });
    }
  }, [posts]);

  useEffect(() => {
    if (searchTerm && fuseRef.current) {

      const results = fuseRef.current.search(searchTerm).map((result) => ({
        ...result.item,
        url: `/blog/${result.item.slug}/`
      }));
      setSearchResults(results);
      setIsOpen(results.length > 0);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  }, [searchTerm, posts]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (url: string) => {
    window.location.href = url;
    setSearchTerm('');
    setSearchResults([]);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0 && searchTerm.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!event.relatedTarget || !event.relatedTarget.closest(`.${styles.resultsPanel}`)) {
        setIsOpen(false);
      }
    }, 100);
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {isOpen && (
        <div className={styles.resultsPanel} ref={(el) => (el ? el.className = `${styles.resultsPanel}` : null)}>
          {searchResults.length > 0 ? (
            <ul className={styles.resultsList}>
              {searchResults.map((post) => (
                <li key={post.title} className={styles.resultItem}>
                  <button
                    type="button"
                    onClick={() => handleResultClick(`/blog/${post.slug}`)}
                    className={styles.resultButton}
                  >
                    {post.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.noResults}>No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;