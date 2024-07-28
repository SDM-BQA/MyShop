import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: '/logo_main.png',
    fullDecal: '/logo_main.png'
});

export default state;