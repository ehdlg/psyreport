import * as React from 'react';
import { useColorScheme } from 'nativewind';
import Svg, { G, Path } from 'react-native-svg';

function EmptyFolder(props: any) {
  const { colorScheme } = useColorScheme();
  const darkMode = colorScheme === 'dark';

  return (
    <Svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      strokeWidth={0.528}
      {...props}
    >
      <G stroke={darkMode ? '#e0e7ff' : '#1e293b'}>
        <Path
          d='M3.5 15V6.9c0-.84 0-1.26.163-1.581a1.5 1.5 0 01.656-.656c.32-.163.74-.163 1.581-.163h2.572c.376 0 .564 0 .734.052a1.2 1.2 0 01.414.221c.137.113.242.27.45.582l.86 1.29c.208.313.313.47.45.582.122.1.263.176.413.222.171.051.359.051.735.051H16.5c.465 0 .697 0 .888.051a1.5 1.5 0 011.061 1.061c.051.191.051.423.051.888v0m-8 4h6'
          strokeLinecap='round'
        />
        <Path d='M4.5 18.5h12.27c.622 0 .933 0 1.198-.104a1.5 1.5 0 00.602-.433c.182-.219.28-.514.477-1.104l1.4-4.2c.356-1.066.533-1.6.427-2.024a1.5 1.5 0 00-.648-.9c-.37-.235-.931-.235-2.056-.235h-7.94c-.622 0-.933 0-1.198.104a1.5 1.5 0 00-.602.434c-.182.218-.28.513-.477 1.103l-2.188 6.565a1.162 1.162 0 01-1.103.794v0c-.642 0-1.162-.52-1.162-1.162V14.5' />
      </G>
    </Svg>
  );
}

export default EmptyFolder;
