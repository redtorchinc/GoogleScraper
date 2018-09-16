import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';

import 'typeface-roboto';

import Shell from "./shell.js";

const render = (Component) => {
    return ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>, document.getElementById('root'))
};

render(Shell);

if (module.hot) {
    module.hot.accept("./shell.js", function () {
        render(Shell);
    })
}
