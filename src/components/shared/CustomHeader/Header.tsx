import { Header } from "antd/es/layout/layout";
import styles from "./Header.module.css";
import pokeLogo from "../../../assets/pokeapi_logo.png";
import { Flex, Typography } from "antd";
import SearchInput from "../SearchInput/Search";
const { Title } = Typography;

const CustomHeader: React.FC = () => {
  return (
    <Header className={styles.header} color="danger">
      <Flex className={styles.leftContainer}>
        <img src={pokeLogo} alt="Pokemon Gallery" />
        <Title level={2}>Pokémon Gallery</Title>
      </Flex>
      <Flex className={styles.rightContainer}>
        <SearchInput />
      </Flex>
    </Header>
  );
};

export default CustomHeader;
