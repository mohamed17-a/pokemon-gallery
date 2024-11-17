import { Header } from "antd/es/layout/layout";
import styles from "./Header.module.css";
import pokeLogo from "../../../assets/pokeapi_logo.png";
import { Flex, Input, Typography } from "antd";
const { Title } = Typography;

interface CustomHeaderProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ onChangeHandler }) => {
  return (
    <Header className={styles.header} color="danger">
      <Flex className={styles.leftContainer}>
        <img src={pokeLogo} alt="Pokemon Gallery" />
        <Title level={2}>Pokémon Gallery</Title>
      </Flex>
      <Flex className={styles.rightContainer}>
        <Input
          placeholder={`Search by name`}
          allowClear
          onChange={onChangeHandler}
          className={styles.searchInput}
        />
      </Flex>
    </Header>
  );
};

export default CustomHeader;
