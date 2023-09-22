import headers from "../styles/headers.module.css";
import logo from "../../public/logo.svc.svg";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className={headers.inner_box}>
        <Link href="/list">
          <Image src={logo} alt="logo" />
        </Link>
        <Link href="/list">홈</Link>
      </div>
      <div className={headers.inner_box}>
        <Link href="/list">공지</Link>
        <Link href="#">알림</Link>
        <Link href="#">내정보</Link>
      </div>
    </header>
  );
}
