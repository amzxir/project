import { useAppContext } from "../../context/app/app-context";
import { NavLink } from "react-router-dom";


const Sidebar = () => {

    const { sidebar } = useAppContext();

    return (
        <nav className={`sidebar ${sidebar ? 'collapsed' : ''}`}>
            <div className="sidebar-content">
                <a className="sidebar-brand d-flex flex-column align-items-center pt-0 mb-0">
                    <p className="mt-4" style={{ fontSize: '90%' }}>فروش مسکن</p>
                </a>
                <ul className="sidebar-nav pe-0">
                    <li className="sidebar-header fw-bolder fs-lg">مدیریت آگهی ها</li>
                    <li className="sidebar-item">
                        <NavLink aria-current="page" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-video align-middle me-2">
                                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>
                            <span className="align-middle me-2">همه آگهی ها</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'} to="create-adv">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-video align-middle me-2">
                                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>
                            <span className="align-middle me-2">ایجاد آگهی</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar;