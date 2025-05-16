import Styles from "./Target.module.css"
import { IoLogoFlickr } from "react-icons/io";


const Target = () => {
  return (
    <div className={Styles.container}>
      <IoLogoFlickr color="#fff" fontSize={"40px"} className={Styles.container_icon} />
      <h2 className={Styles.container_title}>CardName</h2>
      <span className={Styles.container_span}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      <div className={Styles.container_slide}>
        <button>Ver mas</button>
      </div>
    </div>
  )
}

export default Target