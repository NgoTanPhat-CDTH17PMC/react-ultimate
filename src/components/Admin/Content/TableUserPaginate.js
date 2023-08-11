import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import { useEffect, useState } from "react";

const TableUserPaginate = (props) => {
  const {
    listUsers,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete,
    fetchListUsersWithPaginate,
    pageCount,
    // fetchListUsersWithPaginateNoAPI
  } = props;

  //   const [currentListUser, setCurrentListUser] = useState([0, 1, 2, 3, 4]);
  //   const [itemOffset, setItemOffset] = useState(0);
  //   const [pageCount, setPageCount] = useState(2);
  //   const [itemsPerPage, setItemPerPage] = useState(5);
  //   const items = [...Array(listUsers.length).keys()];
  //   useEffect(() => {
  //     const endOffset = itemOffset + itemsPerPage;
  //     setCurrentListUser(items.slice(itemOffset, endOffset));
  //     setPageCount(Math.ceil(items.length / itemsPerPage));
  //     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   }, [itemOffset, itemsPerPage]);

  //   useEffect(() => {
  //     fetchListUsersWithPaginateNoAPI(currentListUser);
  //   }, [currentListUser]);

  const handlePageClick = (event) => {
    // const selected = +event.selected + 1;
    // const newOffset = (selected * itemsPerPage) % items.length;
    // setItemOffset(newOffset);

    console.log(`User requested page number ${event.selected + 1}`);
    props.fetchListUsersWithPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th>{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleClickBtnView(item);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

          {listUsers && listUsers.length == 0 && (
            <tr>
              <td colSpan="4">Emply Data</td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={props.setCurrentPage - 1}
      />
    </>
  );
};

export default TableUserPaginate;
