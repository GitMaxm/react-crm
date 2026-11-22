import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="project-nav">
      <div className="project-nav__links-wrapper">
        <Link to="/">Таблица с заявками</Link>
        <Link to="/form">Форма добавления заявок</Link>
        {/* <Link to="/edit/:id">Редактирование заявки</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
