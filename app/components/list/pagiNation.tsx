import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

const PagiNation = ({ data, setPagePost }) => {
  //pageNation
  const [currentPage, setCurrentPage] = useState<number>(1); //현재페이지
  const postPerPage: number = 10; //페이지당 게시글 수
  const indexOfLastPost: number = currentPage * postPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postPerPage;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setPagePost(data.slice(indexOfFirstPost, indexOfLastPost));
  }, [data, currentPage]);

  console.log("type >> ", typeof setPagePost);

  return (
    <Pagination
      activePage={currentPage}
      itemsCountPerPage={postPerPage}
      totalItemsCount={data.length}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};
export default PagiNation;
