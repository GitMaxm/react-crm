import { useContext } from 'react';
import { AppContext } from '../App';

const StatusbarLeftPanel = () => {
  const { changeStatus, filters, counterStatus } =
    useContext(AppContext);
  const { statusbar } = filters;

  const buttons = [
    { status: 'Все', title: 'Все вместе' },
    { status: 'Новый', title: 'Новые' },
    { status: 'В работе', title: 'В работе' },
    { status: 'Завершенный', title: 'Завершенные' },
  ];

  const renderButtons = buttons.map((button) => (
    <li key={button.status}>
      <button
        onClick={() => changeStatus(button.status)}
        className={`${button.status === statusbar ? 'active' : ''}`}
      >
        {button.title}
        <div className="badge">{counterStatus[button.status]}</div>
      </button>
    </li>
  ));

  return <ul>{renderButtons}</ul>;
};

export default StatusbarLeftPanel;
