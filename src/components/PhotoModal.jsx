import React, { useEffect } from 'react';
import styles from './PhotoModal.module.css'; 

const PhotoModal = ({ photo, onClose, onNext, onPrevious }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]); 


  if (!photo) return null;

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

   const handleNavClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      {}
      <div className={styles.modalContent} onClick={handleContentClick}>
        <img
          src={photo.url}
          alt={photo.title}
          className={styles.modalImage}
        />
        <button
          className={styles.closeButton}
          onClick={onClose} 
          aria-label="Close modal" 
        >×</button>

        {}
        <div className={styles.modalInfo}>
          <h2 className={styles.modalTitle}>{photo.title}</h2>
          <p className={styles.modalDescription}>{photo.description}</p>
        </div>

        <div className={styles.navButtons}>
          <button
            className={styles.navButton}
            onClick={(e) => handleNavClick(e, onPrevious)}
          >Previous</button>
          <button
            className={styles.navButton}
            onClick={(e) => handleNavClick(e, onNext)}
          >Next</button>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;