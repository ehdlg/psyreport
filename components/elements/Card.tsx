import { View } from 'react-native';
import { PropsWithChildren } from 'react';

export default function Card({
  children,
  href,
  styles = '',
}: PropsWithChildren & { href: string; styles?: string }) {
  const DEFAULT_STYLES = 'p-6 text-center rounded-lg border border-neutral-200 drop-shadow-sm ';

  return <View className={[DEFAULT_STYLES, styles].join(' ')}>{children}</View>;
}
