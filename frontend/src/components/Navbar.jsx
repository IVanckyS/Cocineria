import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink 
                            to="/home" 
                            className={({ isActive }) => (isActive ? "active" : "")}
                            onClick={() => setMenuOpen(false)}
                        >
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/menu" 
                            className={({ isActive }) => (isActive ? "active" : "")}
                            onClick={() => setMenuOpen(false)}
                        >
                            Menú
                        </NavLink>
                    </li>
                    {userRole === 'administrador' && (
                        <>
                            <li>
                                <NavLink 
                                    to="/users" 
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Usuarios
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/create-worker" 
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Crear Trabajador
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/workers" 
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Lista de Trabajadores
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li>
                        <NavLink 
                            to="/auth" 
                            className={({ isActive }) => (isActive ? "active" : "")}
                            onClick={() => {
                                logoutSubmit();
                                setMenuOpen(false);
                            }}
                        >
                            Cerrar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;