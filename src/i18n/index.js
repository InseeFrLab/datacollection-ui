import { createDictionary, getLang } from "./build-dictionary";
import dictionary from "./mainDictionary";
import errorMessage from "./errorDictionary";
import buttonMessage from "./buttonDictionary";
import mainMenuMessage from "./mainMenuDictionary";
import notifMessage from "./notifDictionary";

const language = getLang();

export const errorDictionary = createDictionary(language)(errorMessage);
export const buttonDictionary = createDictionary(language)(buttonMessage);
export const defaultDictionary = createDictionary(language)(dictionary);
export const burgerDictionary = createDictionary(language)(mainMenuMessage);
export const notifDictionary = createDictionary(language)(notifMessage);
