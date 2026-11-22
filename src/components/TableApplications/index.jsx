import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '@/components/App';

const TableApplications = () => {
  const { filteredByStatusItems } = useContext(AppContext);

  const applicationsRender =
    filteredByStatusItems.length > 0 ? (
      filteredByStatusItems.map((application) => {
        let badgeClass;

        switch (application.status) {
          case 'Новый':
            badgeClass = 'badge-danger';
            break;
          case 'В работе':
            badgeClass = 'badge-warning';
            break;
          case 'Завершенный':
            badgeClass = 'badge-success';
            break;
          default:
            badgeClass = '';
        }

        return (
          <tr key={application.id}>
            <th scope="row">{application.id}</th>
            <td>{application.date}</td>
            <td>{application.course}</td>
            <td>{application.name}</td>
            <td>{application.email}</td>
            <td>{application.phone}</td>
            <td>
              <div className={`badge badge-pill ${badgeClass}`}>
                {application.status}
              </div>
            </td>
            <td>
              <Link to={`/edit/${application.id}`}>
                Редактировать
              </Link>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="8" className="text-center">
          Заявок нет
        </td>
      </tr>
    );

  return (
    <table className="table fs-14">
      <thead>
        <tr>
          <th>ID</th>
          <th>дата</th>
          <th>продукт</th>
          <th>имя</th>
          <th>email</th>
          <th>телефон</th>
          <th>статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tbody">{applicationsRender}</tbody>
    </table>
  );
};

export default TableApplications;
