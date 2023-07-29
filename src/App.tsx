/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { setLoading, setUser } from './redux/features/user/userSlice';
import { useAppDispatch } from './redux/hooks';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
       dispatch(setUser(user.email!))
       dispatch(setLoading(false));
      } else{
        dispatch(setLoading(false));
      }
    });
  },[dispatch])


  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
