import { Link } from 'react-router-dom';
import FormEdit from '../../components/FormEdit';

const Edit = ({ useBodyClass }) => {
  useBodyClass('with-nav');

  return (
    <div className="form-wrapper">
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="col">
            <div className="admin-heading-1">Работа с заявкой</div>
          </div>
          <div className="col text-right">
            <Link to="/table" className="btn btn-link">
              Вернуться назад
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <FormEdit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
