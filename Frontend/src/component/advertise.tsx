import React, { useRef, useState, useEffect } from 'react';
import { View, Image, Dimensions, FlatList, StyleSheet } from 'react-native';

const Banner = () => {
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const SLIDER_HEIGHT = SLIDER_WIDTH * 0.45;

  const dataBanner = [
    { id: 1, imgURL: require('../../assets/advertiseImg/fpt.jpg') },
    { id: 2, imgURL: require('../../assets/advertiseImg/lpbank.jpg') },
    { id: 3, imgURL: require('../../assets/advertiseImg/vinhome.png') },
    { id: 4, imgURL: require('../../assets/advertiseImg/vnpt.png') },
    { id: 5, imgURL: require('../../assets/advertiseImg/lotte.png') },
  ];

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Tự động cuộn mỗi 3 giây
      const nextIndex = (currentIndex + 1) % dataBanner.length;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderBannerItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.imgURL} style={styles.image} />
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={dataBanner}
      renderItem={renderBannerItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={(event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / SLIDER_WIDTH);
        setCurrentIndex(index);
      }}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.5,
    marginLeft:10, 
    marginRight:20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Banner;
