import { Link } from 'expo-router';
import Card from './elements/Card';
import { Text, View } from 'react-native';
import Note from './icons/Note';
import NoteList from './icons/NoteList';
import { ROUTES } from '../constants';

const Title = () => {
  return <Text className='text-4xl font-bold text-slate-800 dark:text-slate-200'>¡Hola!</Text>;
};

const Help = () => {
  return (
    <View>
      <Text className='text-sm text-center text-normal text-slate-500 dark:text-slate-300'>
        ¿Necesitas ayuda sobre cómo funciona la app?
      </Text>
      <Link href='/ayuda' className='text-sm text-center text-indigo-200'>
        Infórmate en la sección de ayuda
      </Link>
    </View>
  );
};

const CardLinks = () => {
  return (
    <View className='flex-row gap-x-2 justify-center'>
      <Card href={ROUTES.NEW} styles='justify-center items-center gap-y-4 flex-1'>
        <Note width={80} height={80} fill='#a5b4fc' />
        <Text className='text-slate-500 dark:text-slate-300'>Nuevo registro</Text>
      </Card>
      <Card href={ROUTES.REPORTS} styles='justify-center items-center gap-y-4 flex-1'>
        <NoteList width={80} height={80} fill='#a5b4fc' />
        <Text className='text-slate-500 dark:text-slate-300'>Ver registros</Text>
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
