import '../styles/globals.scss'
import 'antd/dist/antd.css';
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from 'next/app'

import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import store from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) 
}

export default MyApp
