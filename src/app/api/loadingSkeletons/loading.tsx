import React from 'react';
import styles from './loading.module.css';
import Image from 'next/image';

export default function Loading() {
  return (
    <>
    <div className={styles.skeletonContainer}> 
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
    </div>
    <div className={styles.skeletonContainer}> 
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.cover} ${styles.skeleton}`}>
          <div id="cover" className={styles.animate} />
        </div>

        <div className={styles.content}>
          <h2 id="title" className={`${styles.skeleton} ${styles.animate}`}></h2>
          <small id="subtitle" className={`${styles.skeleton} ${styles.animate}`}></small>
        </div>
      </div>
    </div>
    </>
  );
}
