import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import logger from "redux-logger";

import rootReduder from "./root.reducer";

const middlewares = [logger];
export const store = createStore(rootReduder, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };
