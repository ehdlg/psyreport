import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Trash(props: any) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      width={24}
      height={24}
      strokeWidth={2}
      {...props}
    >
      <Path d='M4 7l16 0' />
      <Path d='M10 11l0 6' />
      <Path d='M14 11l0 6' />
      <Path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
      <Path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
    </Svg>
  );
}
export default Trash;
