import { useEffect, useState } from "react";
import pageNation from "../../styles/pageNation.module.css";

export default function PageNation({ data, setPageData }) {
  const [post, setPost] = useState(5); // 페이지 당 표시 될 게시글 수
  const [totalPost, setTotalPost] = useState(data.length); //전체게시글 수
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [pages, setPages] = useState([]);
  const pageIndex = Math.ceil(data.length / 5);

  //make a page
  useEffect(() => {
    setPages(
      Array(pageIndex)
        .fill()
        .map((item, idx) => idx + 1)
    );
  }, [pageIndex]);

  //
  useEffect(() => {
    const lastPost = currentPage * post; //페이지 내 마지막 글
    const firstPost = lastPost - post; //페이지 내 첫번째 글
    setPageData(data.slice(firstPost, lastPost));
  }, [currentPage]);

  const clickPage = (e: number) => {
    setCurrentPage(e);
  };
  console.log("현재페이지", currentPage);

  return (
    <div className={pageNation.section}>
      <ul className={pageNation.page_wrap}>
        <li>&lt;&lt;</li>
        <li>&lt;</li>
        {pages.map((page, idx) => (
          <li key={idx} onClick={() => clickPage(page)}>
            {page}
          </li>
        ))}
        <li>&gt;</li>
        <li>&gt;&gt;</li>
      </ul>
    </div>
  );
}
