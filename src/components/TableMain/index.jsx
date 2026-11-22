import StatusbarTable from '../StatusbarTable';
import TableApplications from '../TableApplications';

const TableMain = () => {
  return (
    <div className="main-wrapper">
      <div className="container-fluid">
        <div className="admin-heading-1">Все заявки</div>

        <StatusbarTable />

        <TableApplications />
      </div>
    </div>
  );
};

export default TableMain;
