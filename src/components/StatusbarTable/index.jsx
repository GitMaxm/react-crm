import { useContext } from 'react';
import { AppContext } from '../App';

const StatusbarTable = () => {
  const { changeStatus, changeCourse, filters } =
    useContext(AppContext);
  const { statusbar, courses } = filters;

  const buttons = [
    { status: 'Все', title: 'Все' },
    { status: 'Новый', title: 'Новые' },
    { status: 'В работе', title: 'В работе' },
    { status: 'Завершенный', title: 'Завершенные' },
  ];

  const options = [
    { value: 'Все продукты', title: 'Все продукты' },
    { value: 'Курс по верстке', title: 'Курс по верстке' },
    { value: 'Курс по JavaScript', title: 'Курс по JavaScript' },
    { value: 'Курс по VUE JS', title: 'Курс по VUE JS' },
    { value: 'Курс по PHP', title: 'Курс по PHP' },
    { value: 'Курс по WordPress', title: 'Курс по WordPress' },
  ];

  const renderButtons = buttons.map((button) => (
    <button
      className={`btn btn-light ${button.status === statusbar ? 'active' : ''}`}
      key={button.status}
      type="button"
      onClick={() => changeStatus(button.status)}
    >
      {button.title}
    </button>
  ));

  const renderOptions = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.title}
    </option>
  ));

  return (
    <form>
      <div className="row mb-3 justify-content-start">
        <div className="col">
          <div
            id="topStatusBar"
            className="btn-group"
            role="group"
            aria-label="..."
          >
            {renderButtons}
          </div>
        </div>
        <div className="col">
          <select
            className="custom-select"
            id="productSelect"
            value={courses}
            onChange={(e) => changeCourse(e.target.value)}
          >
            {renderOptions}
          </select>
        </div>
      </div>
    </form>
  );
};

export default StatusbarTable;
