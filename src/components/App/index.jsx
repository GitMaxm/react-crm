import './bootstrap.min.css';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useEffect, createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Navbar from '../Navbar';
import Form from '../../pages/Form';
import Edit from '../../pages/Edit';
import Table from '../../pages/Table';
import useBodyClass from '../../custom/useBodyClass';
import {
  fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from '../../custom/mockServer';

export const AppContext = createContext(null);

function App() {
  const [applications, setApplications] = useState(null); // Данные из localStorage
  const [isLoading, setIsLoading] = useState(true); // Флаг загрузки
  const [error, setError] = useState(null); // Ошибка запроса

  useEffect(() => {
    fetchApplications()
      .then((data) => {
        setApplications(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const [counterStatus, setCounterStatus] = useState({
    Все: 0,
    Новый: 0,
    'В работе': 0,
    Завершенный: 0,
  });

  // Загружаем фильтры из localStorage при инициализации
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem('filters');
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          statusbar: 'Все',
          courses: 'Все продукты',
        };
  });

  // Сохраняем фильтры в localStorage каждый раз, когда они изменяются
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  // Вызываем `statusCounter` при изменении `applications`
  useEffect(() => {
    if (!applications) return; // Если данных нет

    const statusCount = {
      Все: applications.length,
      Новый: 0,
      'В работе': 0,
      Завершенный: 0,
    };

    applications.forEach((item) => {
      if (item.status === 'Новый') statusCount['Новый']++;
      if (item.status === 'В работе') statusCount['В работе']++;
      if (item.status === 'Завершенный') statusCount['Завершенный']++;
    });

    setCounterStatus(statusCount); // Обновляем счетчик статусов
  }, [applications]); // Только при изменении данных

  const addApplication = (application) => {
    createApplication(application).then((created) => {
      setApplications((prev) => [...prev, created]);
      toast.success('Заявка успешно добавлена!');
    });
  };

  const applicationEdited = (applUpdated) => {
    updateApplication(applUpdated).then((updated) => {
      setApplications((prev) =>
        prev.map((app) => (app.id === updated.id ? updated : app)),
      );
      toast.success('Заявка успешно обновлена!');
    });
  };

  const applicationDeleted = (id) => {
    deleteApplication(id).then(() => {
      setApplications((prev) => prev.filter((app) => app.id !== id));
      toast.success('Заявка удалена!');
    });
  };

  const filterApplications = (applications) => {
    return applications.filter((item) => {
      const statusMatch =
        filters.statusbar === 'Все' ||
        item.status === filters.statusbar;
      const courseMatch =
        filters.courses === 'Все продукты' ||
        item.course === filters.courses;
      return statusMatch && courseMatch;
    });
  };

  const changeStatus = (status) =>
    setFilters((prev) => ({ ...prev, statusbar: status }));
  const changeCourse = (course) =>
    setFilters((prev) => ({ ...prev, courses: course }));

  const filteredByStatusItems = applications
    ? filterApplications(applications)
    : [];

  return (
    <AppContext.Provider
      value={{
        applications,
        applicationEdited,
        applicationDeleted,
        changeStatus,
        filteredByStatusItems,
        counterStatus,
        changeCourse,
        filters,
        addApplication,
      }}
    >
      <Router>
        <Navbar />
        {error && <div className="alert alert-danger">{error}</div>}
        {isLoading && (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {applications && (
          <Routes>
            <Route
              path="/"
              element={<Table useBodyClass={useBodyClass} />}
            />
            <Route
              path="/table"
              element={<Table useBodyClass={useBodyClass} />}
            />
            <Route
              path="/form"
              element={<Form useBodyClass={useBodyClass} />}
            />
            <Route
              path="/edit/:id"
              element={<Edit useBodyClass={useBodyClass} />}
            />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        )}
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
    </AppContext.Provider>
  );
}

export default App;
