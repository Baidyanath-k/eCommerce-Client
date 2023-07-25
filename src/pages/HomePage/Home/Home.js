import React from 'react';
import { useAuth } from '../../../context/authContext';
import Main from '../../Layout/Main';

const Home = () => {
  const{auth}=useAuth();
    return (
      <Main title={"eCommerce-Shop Now"}>
        <div>
          <h2>THis is Home</h2>

          <pre>{JSON.stringify(auth, null,4)}</pre>
        </div>
      </Main>
    );
};

export default Home;