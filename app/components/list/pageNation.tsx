import pageNation from "../../styles/pageNation.module.css";

export default function PageNation() {
  return (
    <div className={pageNation.section}>
      <ul className={pageNation.page_wrap}>
        <li>&lt;&lt;</li>
        <li>&lt;</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>&gt;</li>
        <li>&gt;&gt;</li>
      </ul>
    </div>
  );
}
