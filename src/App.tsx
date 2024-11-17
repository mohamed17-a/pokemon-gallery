import Layout, { Content } from "antd/es/layout/layout";
import CustomHeader from "./components/shared/CustomHeader/Header";
import Home from "./components/Home/Home";
import PokeDetails from "./components/shared/PokeDetails/PokeDetails";
import NotFound from "./components/shared/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <Layout>
      <CustomHeader onChangeHandler={onChangeHandler} />
      <Content
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/pokemon/:id" element={<PokeDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
