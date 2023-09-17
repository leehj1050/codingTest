"use client";
import { useState } from "react";
import list from "../../styles/list.module.css";
import { MdCancel, MdSearch } from "react-icons/md";
import ListItem from "./listItem";
import PageNation from "./pageNation";
import Link from "next/link";

export default function List() {
  const [search, setSearch] = useState("");

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

      <ListItem />
      <div className={list.buttonBox}>
        <Link href="/components/write">글쓰기</Link>
      </div>
      <PageNation />
    </main>
  );
}
