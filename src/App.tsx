import './App.css';
// import { TonConnectButton } from '@tonconnect/ui-react';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useCounterContract } from './hooks/useExampleContract';
import { useState , useEffect} from 'react';
import WebApp from '@twa-dev/sdk';

function getId() {
  return WebApp.initDataUnsafe.user?.id;
}

function App() {
  // const { connected } = useTonConnect();
  // const { value, address, sendIncrement } = useCounterContract();
  const [ userData, setUserData] = useState(0);

  useEffect(()=> {
    setUserData(getId() as any);  
   console.log("hello");
  })
  
  return (
    <div className='App'>
      <div className='Container'>
        {/* <TonConnectButton />

        <div className='Card'>
          <b>Counter Address</b>
          <div className='Hint'>{address?.slice(0, 30) + '...'}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{value ?? 'Loading...'}</div>
        </div>

        <a
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
          onClick={() => {
            sendIncrement();
          }}
        > */}
          {/* Increment
        </a> */}
        <h1>Hello</h1>
        <div>{userData ? userData : 0}</div>

      </div>
    </div>
  );
}

export default App
