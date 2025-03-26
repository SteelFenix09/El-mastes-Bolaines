import Axios from "../Servicios/Axios";

const localH = "http://localhost:4000/api";

export const ENV = {
    BASE_API: localH,
    API_ROUTES: {
        CREATEPRODUCTO: "/crear",
        GETPRODUCTOS: "/lista",
        DELETEPRODUCTO: "/eliminar",
        UPDATEPRODUCTO: "/verlos"
    },
};