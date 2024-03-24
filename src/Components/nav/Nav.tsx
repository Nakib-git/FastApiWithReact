import './Nav.css';

export const Nav = () => {
    return (
        <nav className="navbar">
            <div className="navbar__brand">CDAS V3 (Demo Project)</div>
            <ul className="navbar__list">
                <li className="navbar__item"><a href="/">Home</a></li>
                <li className="navbar__item"><a href="/Employee">Employee</a></li>
                <li className="navbar__item"><a href="/user">User</a></li>
            </ul>
        </nav>
    );
};

export default Nav;