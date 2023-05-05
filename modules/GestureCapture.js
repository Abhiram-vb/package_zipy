import React from 'react';
import {ScrollView, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {useState} from 'react';

const GeastureCapture = ({renderElement}) => {
  const [scrollDirection, setScrollDirection] = useState('');

  const handleTap = e => {
    console.log(e.nativeEvent, 'Single tap detected.');
    // store the single tap action
  };

  const handleScroll = ({nativeEvent}) => {
    const {translationY} = nativeEvent;
    if (translationY > 0 && scrollDirection !== 'down') {
      console.log('Scrolling down detected.');
      setScrollDirection('down');
      // store the scroll down action
    } else if (translationY < 0 && scrollDirection !== 'up') {
      console.log('Scrolling up detected.');
      setScrollDirection('up');
      // store the scroll up action
    }
  };

  const handlePan = ({nativeEvent}) => {
    console.log(nativeEvent, 'tis is native element');
    const {translationX, translationY, numberOfPointers} = nativeEvent;
    console.log(`Pan detected with ${numberOfPointers} fingers.`);
    console.log(`translationX: ${translationX}, translationY: ${translationY}`);
    // Store the pan action
  };
  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        minPointers={2}
        maxPointers={2}
        onGestureEvent={handlePan}>
        <ScrollView>
          <TapGestureHandler
            numberOfTaps={1}
            maxDurationMs={300}
            onActivated={handleTap}>
            <View>
              <View
                style={{width: 100, height: 100, backgroundColor: 'blue'}}
              />
              <PanGestureHandler onGestureEvent={handleScroll}>
                <View>{renderElement}</View>
              </PanGestureHandler>
            </View>
          </TapGestureHandler>
        </ScrollView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default GeastureCapture;
