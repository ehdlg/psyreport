import { View } from 'react-native';
import { Link } from 'expo-router';

export default function Header() {
  return (
    <View className='px-2 py-6 mb-4 border-b drop-shadow-sm border-slate-200 dark:border-slate-700'>
      <Link
        href='/'
        className='inline-block font-serif text-4xl italic text-indigo-300 dark:text-indigo-200'
      >
        PsyReport
      </Link>
    </View>
  );
}
