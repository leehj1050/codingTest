"use client";
import { useEffect, useState } from "react";
import list from "../styles/list.module.css";
import { MdCancel, MdSearch } from "react-icons/md";
import ListItem from "./listItem";
import Link from "next/link";
import Pagination from "react-js-pagination";

export type IDetailInfo = {
  title: string;
  text: string;
  id: string;
  time: number;
};

export default function List() {
  const [data, setData] = useState<IDetailInfo[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<Boolean>(true);

  //pagiNation
  const [pagePost, setPagePost] = useState<IDetailInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); //현재페이지
  const postPerPage: number = 10; //페이지당 게시글 수
  const indexOfLastPost: number = currentPage * postPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postPerPage;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    //search filter
    if (search !== "") {
      const filtered = data.filter((item) => {
        return item.title.includes(search) || item.text.includes(search);
      });
      setPagePost(filtered);
    } else {
      setPagePost(data.slice(indexOfFirstPost, indexOfLastPost));
    }
  }, [data, currentPage, search]);

  //Load Data
  useEffect(() => {
    const getData = async () => {
      await fetch("/api/list")
        .then((res) => res.json())
        .then((data) => {
          setData(data), setLoading(false);
        });
    };
    getData();
  }, []);

  //search
  const searchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearch(value);
  };

  const cancelClick = () => {
    setSearch("");
  };

  return (
    <main>
      <div className={list.section}>
        <div className={list.text_box}>
          <h2>공지사항</h2>
        </div>

        <div className={list.search_box}>
          <div className={list.input_box}>
            <input placeholder="검색어" onChange={searchText} value={search} />
          </div>
          <div className={list.icons_wrap}>
            {search.length > 0 ? (
              <div className={list.cancel} onClick={cancelClick}>
                <MdCancel />
              </div>
            ) : (
              <div className={list.search}>
                <MdSearch />
              </div>
            )}
          </div>
        </div>
      </div>

      <ListItem data={data} pagePost={pagePost} loading={loading} />
      <div className={list.buttonBox}>
        <Link href="write">글쓰기</Link>
      </div>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={postPerPage}
        totalItemsCount={search.length > 0 ? pagePost.length : data.length}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </main>
  );
}
