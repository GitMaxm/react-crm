import { useState, useContext } from 'react';
import { AppContext } from '@/components/App';
import { useNavigate } from 'react-router-dom';

const FormApplications = () => {
  const { addApplication, applications } = useContext(AppContext);
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    id: '',
    date: '',
    course: 'Курс по верстке',
    name: '',
    email: '',
    phone: '',
    status: 'Новый',
  });

  const options = [
    { value: 'Все продукты', title: 'Все продукты' },
    { value: 'Курс по верстке', title: 'Курс по верстке' },
    { value: 'Курс по JavaScript', title: 'Курс по JavaScript' },
    { value: 'Курс по VUE JS', title: 'Курс по VUE JS' },
    { value: 'Курс по PHP', title: 'Курс по PHP' },
    { value: 'Курс по WordPress', title: 'Курс по WordPress' },
  ];

  const renderOptions = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.title}
    </option>
  ));

  const getNextId = () => {
    if (applications.length === 0) return 1;
    const newId = Math.max(...applications.map((app) => app.id)) + 1;
    return String(newId);
  };

  const getFormattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const handleChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value,
    });
  };

  const getRandomApplication = () => {
    const names = [
      'Иван Иванов',
      'Петр Петров',
      'Сергей Сергеев',
      'Анна Смирнова',
      'Ольга Козлова',
    ];
    const emails = [
      'test@mail.ru',
      'user@gmail.com',
      'random@yandex.ru',
      'demo@inbox.ru',
    ];
    const phones = [
      '+7 (900) 123-45-67',
      '+7 (901) 234-56-78',
      '+7 (902) 345-67-89',
    ];
    const courses = [
      'Курс по верстке',
      'Курс по JavaScript',
      'Курс по VUE JS',
      'Курс по PHP',
      'Курс по WordPress',
    ];
    const statuses = ['Новый', 'В работе', 'Завершенный'];

    return {
      id: getNextId(),
      date: getFormattedDate(),
      course: courses[Math.floor(Math.random() * courses.length)],
      name: names[Math.floor(Math.random() * names.length)],
      email: emails[Math.floor(Math.random() * emails.length)],
      phone: phones[Math.floor(Math.random() * phones.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newApplication = {
      ...application,
      id: getNextId(),
      date: getFormattedDate(),
    };

    addApplication(newApplication);
    navigate('/table');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Ваши данные:</label>
      <div className="form-group">
        <input
          id="name"
          type="text"
          name="name"
          className="form-control"
          placeholder="Имя и Фамилия"
          required
          value={application.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          id="phone"
          type="text"
          name="phone"
          className="form-control"
          placeholder="Телефон"
          required
          value={application.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          id="email"
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          required
          value={application.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="select">Продукт:</label>
        <select
          id="select"
          className="form-control"
          name="course"
          value={application.course}
          onChange={handleChange}
        >
          {renderOptions}
        </select>
      </div>
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-lg btn-primary btn-block"
        >
          Оформить заявку
        </button>
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setApplication(getRandomApplication())}
      >
        Заполнить случайными данными
      </button>
    </form>
  );
};

export default FormApplications;
