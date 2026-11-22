import TableLeftPanel from '../../components/TableLeftPanel';
import TableMain from '../../components/TableMain';

const Table = ({ useBodyClass }) => {
  useBodyClass('with-nav body--dashboard');

  return (
    <>
      <TableLeftPanel />
      <TableMain />
    </>
  );
};

export default Table;
