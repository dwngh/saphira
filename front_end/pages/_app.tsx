import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import {store, persistor} from "../redux/store";


export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={<h1>Đợi chờ là hạnh phúc</h1>} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}
