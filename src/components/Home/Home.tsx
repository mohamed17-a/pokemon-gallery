import { Col, Row } from "antd";
import { useGetPokemons } from "../../query/queries";
import CustomCard from "../shared/CustomCard/CustomCard";
import { useState } from "react";
import CustomPagination from "../shared/CustomPagination/CustomPagination";

interface viewData {
  name: string;
  url: string;
  detail?: {
    sprites: {
      front_default: string | null;
    };
  };
}
const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 6;
  const { allData, detailedData } = useGetPokemons(currentPage, pageLimit);
  const combinedData =
    allData?.results?.map(
      (item: { name: string; url: string }, index: number) => ({
        name: item.name,
        url: item.url,
        detail: detailedData ? detailedData[index] : null,
      })
    ) || [];
  return (
    <Col style={{ height: "100%", width: "100%" }}>
      <Row justify={"center"} align={"middle"} style={{ height: "90%" }}>
        {combinedData.map((pokemon: viewData, index: number) => (
          <Col lg={{ span: 6, offset: 1 }} key={index}>
            <CustomCard
              cardName={pokemon.name}
              cardImg={pokemon?.detail?.sprites.front_default || ""}
              cardDescription="A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON."
            />
          </Col>
        ))}
      </Row>
      <Row justify={"center"} align={"middle"} style={{ height: "10%" }}>
        <CustomPagination
          currentPage={currentPage}
          totalPages={allData?.count}
          onPageChange={setCurrentPage}
        />
      </Row>
    </Col>
  );
};

export default Home;
