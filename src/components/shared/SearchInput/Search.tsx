import React from "react";
import { Input } from "antd";
import styles from "./Search.module.css";

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log(e.target.value);
};
const SearchInput: React.FC = () => {
  return (
    <Input
      placeholder={`Search by name`}
      allowClear
      onChange={onChange}
      className={styles.searchInput}
    />
  );
};

export default SearchInput;
