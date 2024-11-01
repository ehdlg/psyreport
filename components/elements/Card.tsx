import { TouchableOpacity } from 'react-native';
import { PropsWithChildren } from 'react';
import { router } from 'expo-router';

export default function Card({
  children,
  href,
  styles = '',
}: PropsWithChildren & { href: string; styles?: string }) {
  const DEFAULT_STYLES = 'p-6 text-center rounded-lg border border-neutral-200 drop-shadow-sm ';
  const navigateTo = () => {
    return router.navigate(href);
  };

  return (
    <TouchableOpacity onPress={navigateTo} className={[DEFAULT_STYLES, styles].join(' ')}>
      {children}
    </TouchableOpacity>
  );
}
