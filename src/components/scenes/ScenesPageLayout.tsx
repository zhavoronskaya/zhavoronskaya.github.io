import { LayoutWithSidebar } from "../layout/Layout";
import styles from "./ScenesPageLayout.module.css";
// import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function ScenesPageLayout(props: Props) {
  return (
    <LayoutWithSidebar contentHeader={<Header />}>
      <div className={styles.container}>{props.children}</div>
    </LayoutWithSidebar>
  );
}

const Header = () => {
  return <h2 className="text-ellipsis">Gallery of generative art works</h2>;
};
