import { Col, Row, Skeleton } from "antd";
import { useGetPokemons } from "../../query/queries";
import CustomCard from "../shared/CustomCard/CustomCard";
import { useState } from "react";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import Title from "antd/es/typography/Title";

interface viewData {
  name: string;
  url: string;
  detail?: {
    sprites: {
      front_default: string | null;
    };
  };
  tags: string[];
  description: string;
}
const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 6;
  const {
    allData,
    detailedData,
    flavorTexts,
    isLoading,
    isError,
    isLoadingError,
  } = useGetPokemons(currentPage, pageLimit);
  const combinedData =
    allData?.results?.map(
      (item: { name: string; url: string }, index: number) => ({
        name: item.name,
        url: item.url,
        detail: detailedData ? detailedData[index] : null,
        description: flavorTexts ? flavorTexts[index] : null,
        tags: detailedData
          ? detailedData[index]?.types?.map(
              (element: { type: { name: string } }) => element?.type?.name
            )
          : null,
      })
    ) || [];
  return (
    <>
      <Row
        gutter={[24, 24]}
        justify="center"
        align="middle"
        style={{ minHeight: "90%" }}
      >
        {isError || isLoadingError ? (
          <Col>
            <Title level={1}>
              Unfortunately, Error happened to fetch the data
            </Title>
          </Col>
        ) : isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={{ span: 6, offset: 1 }} key={index}>
              <Skeleton active title={false} paragraph={{ rows: 4 }} />
            </Col>
          ))
        ) : (
          combinedData.map((pokemon: viewData, index: number) => (
            <Col xs={24} sm={12} md={8} lg={{ span: 6, offset: 1 }} key={index}>
              <CustomCard
                cardName={pokemon.name}
                cardImg={pokemon.detail?.sprites.front_default || ""}
                cardDescription={pokemon.description || ""}
                tags={pokemon.tags}
              />
            </Col>
          ))
        )}
      </Row>
      <Row style={{ width: "100%" }}>
        <CustomPagination
          currentPage={currentPage}
          totalPages={allData?.count}
          onPageChange={setCurrentPage}
        />
      </Row>
    </>
  );
};

export default Home;
