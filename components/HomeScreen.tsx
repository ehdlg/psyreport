import { Link } from 'expo-router';
import Card from './elements/Card';
import { Text, TouchableOpacity, View } from 'react-native';
import Note from './icons/Note';
import NoteList from './icons/NoteList';

const Title = () => {
  return <Text className='text-4xl font-bold text-neutral-600'>¡Hola!</Text>;
};

const Help = () => {
  return (
    <View className=''>
      <Text className='text-sm text-center text-normal text-neutral-500'>
        ¿Necesitas ayuda sobre cómo funciona la app?
      </Text>
      <TouchableOpacity className=''>
        <Link href='/ayuda' className='text-sm text-center text-indigo-300'>
          Infórmate en la sección de ayuda
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const CardLinks = () => {
  return (
    <View className='flex-row gap-x-2 justify-around my-8'>
      <Card href='/new' styles='justify-center items-center gap-y-4'>
        <Note width={80} height={80} />
        <Text className='text-neutral-500'>Nuevo registro</Text>
      </Card>
      <Card href='/new' styles='justify-center items-center gap-y-4'>
        <NoteList width={80} height={80} />
        <Text className='text-neutral-500'>Ver registros</Text>
      </Card>
    </View>
  );
};

HomeScreen.Title = Title;
HomeScreen.CardLinks = CardLinks;
HomeScreen.Help = Help;

export default function HomeScreen() {
  return (
    <>
      <HomeScreen.Title />
      <HomeScreen.CardLinks />
      <HomeScreen.Help />
    </>
  );
}
