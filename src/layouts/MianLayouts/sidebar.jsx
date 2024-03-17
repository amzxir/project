import { useAppContext } from "@context/app/app-context";
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user align-middle me-2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span className="align-middle me-2">همه آگهی ها</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} to="create-adv">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user align-middle me-2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span className="align-middle me-2">ایجاد آگهی</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} to="manage-adv">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user align-middle me-2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span className="align-middle me-2">مدیریت اگهی ها</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar;