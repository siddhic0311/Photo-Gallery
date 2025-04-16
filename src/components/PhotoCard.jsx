import React, { useState } from 'react';
import styles from './PhotoCard.module.css'; 

const PhotoCard = ({ photo, onClick, isHovered, onMouseEnter, onMouseLeave }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardClasses = `${styles.photoCard} ${isHovered ? styles.hovered : ''}`;

  return (
    <div
      className={cardClasses} 
      onClick={() => onClick(photo)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.imageContainer}>
        {!imageLoaded && (
          <div className={styles.imageLoadingOverlay}>Loading...</div>
        )}
        <img
          src={photo.url}
          alt={photo.title}
          className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)} 
        />
      </div>
      <div className={styles.photoInfo}>
        <h3 className={styles.photoTitle}>{photo.title}</h3>
        <p className={styles.photoDescription}>{photo.description}</p>
        <div className={styles.tagContainer}>
          {photo.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;