import { useNavigate } from "react-router-dom";
import ChangeTheme from "../../components/chnage-theme";
import { useAppContext } from "@context/app/app-context";

const NavTop = () => {

    const { chnageSidebar } = useAppContext();

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login')

    }

    return (
        <nav className="navbar">
            <a className="sidebar-toggle" onClick={chnageSidebar}>
                <i className="hamburger align-self-center"></i>
            </a>
            <div className="d-flex align-items-center gap-3 ms-auto me-3">
                <ChangeTheme />
            </div>
            <div className='me-auto'>
                <button className="btn ms-2 btn-outline-danger fw-bolder" onClick={logout}>خارج شوید</button>
            </div>
        </nav>
    )
}

export default NavTop;