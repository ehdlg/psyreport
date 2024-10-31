import { Slot } from 'expo-router';
import Header from '../components/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <Slot />
    </>
  );
}
