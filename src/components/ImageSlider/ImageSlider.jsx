import React, { useState } from 'react';
import styles from './index.module.less';
import { ReactComponent as RightArrowButton } from '../../assets/images/RightArrowButton.svg';
import { ReactComponent as LeftArrowButton } from '../../assets/images/LeftArrowButton.svg';

const ImageSlider = ({ slides, sliderData }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className={styles.slider}>
      <LeftArrowButton className={styles.leftArrow} onClick={prevSlide} />
      <RightArrowButton className={styles.rightArrow} onClick={nextSlide} />
      {sliderData?.map((slide, index) => {
        return (
          <div
            key={index}
            className={
              index === current
                ? `${styles.slide} ${styles.active}`
                : `${styles.slide}`
            }>
            {index === current && (
              <>
                <p className={styles.description}>{slide.description}</p>
                <img
                  src={slide.url}
                  alt="travel image"
                  className={styles.image}
                />
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
