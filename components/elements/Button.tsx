import { TouchableOpacity, Text } from 'react-native';
import { type PropsWithChildren } from 'react';
import { type ButtonType } from '../../types';

export default function Button({
  type = 'tertiary',
  onPress,
  title,
}: PropsWithChildren & {
  type?: ButtonType;
  onPress: () => any;
  title: string;
}) {
  const wrapperStyles: Record<ButtonType, string> = {
    primary: 'rounded px-4 py-2 border border border-white text-white bg-indigo-400 min-w-20',
    secondary: 'justify-center px-4 py-2  rounded border border-neutral-300 min-w-20',
    tertiary: 'px-6 py-4 min-w-20',
  };

  const textStyles: Record<ButtonType, string> = {
    primary: 'text-white text-neutral-700 text-center',
    secondary: 'font-bold text-indigo-300 text-center',
    tertiary: 'font-bold text-neutral-500 text-center',
  };

  return (
    <TouchableOpacity onPress={onPress} className={wrapperStyles[type]}>
      <Text className={textStyles[type]}>{title}</Text>
    </TouchableOpacity>
  );
}
