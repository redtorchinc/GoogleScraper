import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';

import App from "./app.js";

const render = (Component) => {
    return ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>, document.getElementById('root'))
};

render(App); 

if (module.hot) {
    module.hot.accept("./app.js", function () {
        render(App);
    })
}
