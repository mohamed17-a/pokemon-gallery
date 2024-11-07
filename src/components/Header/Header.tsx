import { Header } from "antd/es/layout/layout";
import styles from "./Header.module.css";
import pokeLogo from "../../assets/pokeapi_logo.png";

const CustomHeader: React.FC = () => {
  return (
    <Header className={styles.header}>
      <img src={pokeLogo} alt="Pokemon Gallery" />
    </Header>
  );
};

export default CustomHeader;
