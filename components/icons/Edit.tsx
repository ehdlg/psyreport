import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Edit(props: any) {
  return (
    <Svg
      className='w-6 h-6 text-gray-800 dark:text-white'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <Path
        stroke={props.stroke || 'currentColor'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M14.304 4.844l2.852 2.852M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h11a1 1 0 001-1v-4.5m2.409-9.91a2.017 2.017 0 010 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 012.852 0z'
      />
    </Svg>
  );
}

export default Edit;
