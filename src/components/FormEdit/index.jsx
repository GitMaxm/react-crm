import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';

const FormEdit = () => {
  const { id } = useParams();
  const { applications, applicationEdited, applicationDeleted } =
    useContext(AppContext);
  const navigate = useNavigate();

  const application = applications.find(
    (application) => String(application.id) === String(id),
  );

  const [formData, setFormData] = useState(
    application
      ? {
          id: application.id,
          date: application.date,
          course: application.course,
          name: application.name,
          phone: application.phone,
          email: application.email,
          status: application.status,
        }
      : null,
  );

  // Если заявка была удалена и исчезла из applications — уходим
  useEffect(() => {
    if (!application) {
      navigate('/table');
    }
  }, [application, navigate]);

  if (!formData) return null; // Избегаем рендера, если данных нет

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applicationEdited(formData);
    navigate('/table');
  };

  const handleDelete = () => {
    if (
      window.confirm('Вы уверены, что хотите удалить эту заявку?')
    ) {
      applicationDeleted(formData.id);
      navigate('/table');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card mb-4">
        <div className="card-header">Данные о заявке</div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-2">
              <strong>ID:</strong>
            </div>
            <div className="col">Заявка №{formData.id}</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-2">
              <strong>Дата создания:</strong>
            </div>
            <div className="col">{formData.date}</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-2">
              <strong>Продукт:</strong>
            </div>
            <div className="col">
              <select
                name="course"
                className="custom-select"
                value={formData.course}
                onChange={handleChange}
              >
                <option value="Курс по верстке">
                  Курс по верстке
                </option>
                <option value="Курс по JavaScript">
                  Курс по JavaScript
                </option>
                <option value="Курс по VUE JS">Курс по VUE JS</option>
                <option value="Курс по PHP">Курс по PHP</option>
                <option value="Курс по WordPress">
                  Курс по WordPress
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-2">
              <strong>Имя:</strong>
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-2">
              <strong>Email:</strong>
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-2">
              <strong>Телефон:</strong>
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-2">
              <strong>Статус заявки:</strong>
            </div>
            <div className="col">
              <select
                name="status"
                className="custom-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Новый">Новый</option>
                <option value="В работе">В работе</option>
                <option value="Завершенный">Завершенный</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Удалить заявку
          </button>
        </div>
        <div className="col text-right">
          <button type="submit" className="btn btn-primary">
            Сохранить изменения
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormEdit;
