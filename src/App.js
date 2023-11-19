import Contacts from "./components/Contacts/Contacts";
import {ToastContainer} from "react-toastify";

export default function App() {
  return(
    <div className="wrapper">
      <Contacts />
      <ToastContainer />
    </div>
  );
}