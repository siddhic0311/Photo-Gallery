import React, { useState, useEffect } from 'react';
import photosData from '../data/photos'; 
import PhotoCard from './PhotoCard'; 
import PhotoModal from './PhotoModal'; 
import styles from './App.module.css'; 

export default function App() {
  const [allPhotos] = useState(photosData); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState(allPhotos); 
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPhotos(allPhotos); 
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = allPhotos.filter(photo =>
      photo.title.toLowerCase().includes(term) ||
      photo.description.toLowerCase().includes(term) ||
      photo.tags.some(tag => tag.toLowerCase().includes(term))
    );
    setFilteredPhotos(results);
  }, [searchTerm, allPhotos]); 

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const term = searchTerm.toLowerCase();
     const results = allPhotos.filter(photo =>
      photo.title.toLowerCase().includes(term) ||
      photo.description.toLowerCase().includes(term) ||
      photo.tags.some(tag => tag.toLowerCase().includes(term))
    );
    setFilteredPhotos(results);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick(); 
    }
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = allPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % allPhotos.length;
    setSelectedPhoto(allPhotos[nextIndex]);
  };

  const handlePreviousPhoto = () => {
     if (!selectedPhoto) return;
    const currentIndex = allPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    const previousIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    setSelectedPhoto(allPhotos[previousIndex]);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Photo Gallery</h1>
        <h2 className={styles.subtitle}>Explore beautiful photographs</h2>
      </header>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by title, description, or tag..."
          value={searchTerm}
          onChange={handleSearchInput}
          onKeyPress={handleKeyPress} 
          className={styles.searchInput} 
        />
        {}
        <button
          onClick={handleSearchClick}
          className={styles.searchButton} 
        >
          Search
        </button>
      </div>

      <div className={styles.gallery}>
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map(photo => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClick={handlePhotoClick}
              isHovered={hoveredId === photo.id}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          ))
        ) : (
           <div className={styles.noResults}>
              No photos match your search "{searchTerm}". Try different keywords.
           </div>
        )}
      </div>

      {}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={handleCloseModal}
          onNext={handleNextPhoto}
          onPrevious={handlePreviousPhoto}
        />
      )}
    </div>
  );
}