import React, { useState, useMemo } from 'react';
import styles from './index.module.less';
import { ReactComponent as RightArrowButton } from '../../assets/images/RightArrowButton.svg';
import { ReactComponent as LeftArrowButton } from '../../assets/images/LeftArrowButton.svg';
import { originAddress } from '../../api/api';
import { Image } from 'antd';
import LazyLoad from 'react-lazyload';
import NoPhoto from '../../assets/images/noFoto.png'
const ImageSlider = ({ slides, sliderData }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const domainName = originAddress;

  const previewImages = useMemo(() => {
    return sliderData?.map((slide) => `${domainName}${slide.url}`);
  }, [sliderData, domainName]);

  const [currentSlideUrl, setCurrentSlideUrl] = useState(previewImages[0]); // Store the current slide's URL

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setCurrentSlideUrl(previewImages[current === length - 1 ? 0 : current + 1]); // Update the current slide's URL
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setCurrentSlideUrl(previewImages[current === 0 ? length - 1 : current - 1]); // Update the current slide's URL
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
            className={
              index === current
                ? `${styles.slide} ${styles.active}`
                : `${styles.slide}`
            }>
            {index === current && (
              <div>
                <p className={styles.description}>
                  {`${current + 1}` +
                    '. ' +
                    `${slide.description || 'Нет описания'}`}
                </p>
                <Image.PreviewGroup
                  preview={{
                    height: 2000 // Set the desired height
                  }}
                  items={previewImages}>
                  <LazyLoad height={200} offset={100}>
                    <Image
                      placeholder={
                        <>
                          ...Loading
                          <Image
                            alt={'loading'}
                            preview={false}
                            src={NoPhoto}
                            height={300}
                          />
                        </>

                      }
                      src={currentSlideUrl} // Use the current slide's URL
                      alt={styles.description}
                      className={styles.image}
                    />
                  </LazyLoad>
                </Image.PreviewGroup>
                <div className={'forMobile'}>
                  <div
                    style={{
                      margin: '16px 0',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                  </div>
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
