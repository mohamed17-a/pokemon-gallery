import Layout, { Content } from "antd/es/layout/layout";
import CustomHeader from "./components/shared/CustomHeader/Header";
import Home from "./components/Home/Home";
import PokeDetails from "./components/shared/PokeDetails/PokeDetails";
import NotFound from "./components/shared/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Layout>
      <CustomHeader />
      <Content style={{ height: "95vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<PokeDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
