import StatusbarLeftPanel from '@/components/StatusbarLeftPanel';

const TableLeftPanel = () => {
  return (
    <div className="left-panel blue-skin">
      <div className="left-panel__logo">
        <div className="left-panel__logo-title">CRM заявки</div>
        <div className="left-panel__logo-subtitle">учёт заявок</div>
      </div>

      <div className="left-panel__user clearfix">
        <div className="left-panel__user-photo">
          <img src="./img/avatars/avatar-128.jpg" alt="Avatar" />
        </div>
        <div className="left-panel__user-name">
          Петр <br />
          Васильевич
        </div>
      </div>

      <div className="left-panel__demo-note">
        Демо-данные: имена, телефоны и почты ненастоящие
      </div>

      <div className="left-panel__navigation">
        <div className="left-panel__navigation-title">Заявки</div>

        <StatusbarLeftPanel />
      </div>
    </div>
  );
};

export default TableLeftPanel;
