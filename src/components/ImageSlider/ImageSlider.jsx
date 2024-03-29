import React, { useState, useMemo } from 'react';
import styles from './index.module.less';
import { ReactComponent as RightArrowButton } from '../../assets/images/RightArrowButton.svg';
import { ReactComponent as LeftArrowButton } from '../../assets/images/LeftArrowButton.svg';
import { originAddress } from '../../api/api';
import { Image } from 'antd';
const ImageSlider = ({ slides, sliderData }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const domainName = originAddress;

  const previewImages = useMemo(() => {
    return sliderData?.map((slide) => `${domainName}${slide.url}`);
  }, [sliderData, domainName]);

  const [currentSlideUrl, setCurrentSlideUrl] = useState(previewImages[0]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setCurrentSlideUrl(previewImages[current === length - 1 ? 0 : current + 1]);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setCurrentSlideUrl(previewImages[current === 0 ? length - 1 : current - 1]);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className={styles.slider} style={{ position: 'relative' }}>
      {
        <div className={'forDesktop'}>
          <LeftArrowButton className={styles.leftArrow} onClick={prevSlide} />
          <RightArrowButton className={styles.rightArrow} onClick={nextSlide} />
        </div>
      }

      {sliderData?.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === current ? `${styles.slide} ${styles.active}` : `${styles.slide}`}
          >
            {index === current && (
              <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <p className={styles.description}>
                  {`${current + 1}` + '. ' + `${slide.description || 'Нет описания'}`}
                </p>
                <Image.PreviewGroup items={previewImages}>
                  <Image src={currentSlideUrl} alt={styles.description} className={styles.image} />
                </Image.PreviewGroup>
                <div className={'forMobile'}>
                  <div
                    style={{
                      margin: '16px 0',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
