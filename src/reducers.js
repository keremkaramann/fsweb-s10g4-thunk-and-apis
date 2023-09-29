import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};
function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const oldFav = state.favs.find((f) => f.id == action.payload.id);
      if (oldFav) {
        toast.warn("Daha önce eklendi!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return state;
      } else {
        toast.success("🦄 Favorilere eklendi", {
          position: "top-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const addState = { ...state, favs: [...state.favs, action.payload] };
        writeFavsToLocalStorage(addState);
        return addState;
      }

    case FAV_REMOVE:
      const removeState = {
        ...state,
        favs: state.favs.filter((item) => item.id !== action.payload),
      };
      writeFavsToLocalStorage(removeState);
      toast.error("Favori ürün çıkarıldı!!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return removeState;

    case FETCH_SUCCESS:
      return { ...state, current: action.payload, error: null, loading: false };

    case FETCH_LOADING:
      return { ...state, current: null, error: null, loading: true };

    case FETCH_ERROR:
      return { ...state, current: null, error: action.payload, loading: false };

    case GET_FAVS_FROM_LS:
      const favLs = readFavsFromLocalStorage();
      //return { ...state, favs: favLs ? favLs : [] };
      return { ...state, favs: favLs ?? [] };
    default:
      return state;
  }
}
