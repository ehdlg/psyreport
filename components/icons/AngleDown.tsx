import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function AngleDown(props: any) {
  return (
    <Svg viewBox='0 0 17 17' xmlns='http://www.w3.org/2000/svg' {...props}>
      <Path d='M16.354 5.075l-7.855 7.854L.646 5.075l.707-.707 7.145 7.146 7.148-7.147.708.708z' />
    </Svg>
  );
}

export default AngleDown;
