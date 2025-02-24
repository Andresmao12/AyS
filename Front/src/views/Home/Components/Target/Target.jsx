import Styles from "./Target.module.css"
import { IoLogoFlickr } from "react-icons/io";


 const Target = () => {
   return (
     <div className={Styles.container}>
        <IoLogoFlickr color="#fff"fontSize={"50px"} />
        <h2>CardName</h2>
     </div>
   )
 }
 
 export default Target