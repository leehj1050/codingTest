import list from "../../styles/list.module.css";
import { MdCancel, MdSearch } from "react-icons/md";

export default function List() {
  return (
    <main className={list.main}>
      <div className={list.text_sections}>
        <div className={list.text_box}>
          <h2>공지사항</h2>
        </div>

        <div className={list.search_box}>
          <div className={list.input_box}>
            <input placeholder="검색어" />
          </div>
          <div className={list.icons_wrap}>
            <div>
              <MdCancel />
            </div>
            <div>
              <MdSearch />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
