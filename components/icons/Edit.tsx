import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Edit(props: any) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      x-bind:width='size'
      x-bind:height='size'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      x-bind:stroke-width='stroke'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      {...props}
    >
      <Path d='M14 3v4a1 1 0 0 0 1 1h4' />
      <Path d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z' />
      <Path d='M10 18l5 -5a1.414 1.414 0 0 0 -2 -2l-5 5v2h2z' />
    </Svg>
  );
}
export default Edit;
