//import LogoImg from "../../assets/nomad.jpg"
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className="center gap-[0.5rem]">
            {/* <div className="w-[40px] rounded-full">
                <img src={LogoImg} alt="nomad" className="w-[40px] rounded-full" />
            </div> */}
            <p className="text-3xl leading-[30px] font-medium text-blue">nomad</p>
        </Link>
    );
}

export default Logo;