import { Col, Row, Skeleton } from "antd";
import { useGetPokemons } from "../../query/queries";
import CustomCard from "../shared/CustomCard/CustomCard";
import { useState, useMemo } from "react";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  searchValue: string;
}

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

const Home: React.FC<HomeProps> = ({ searchValue }) => {
  const navigate = useNavigate();
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

  // Combine data and filter based on search value
  const combinedData = useMemo(() => {
    const rawData =
      allData?.results?.map(
        (item: { name: string; url: string }, index: number) => ({
          name: item.name,
          url: item.url,
          detail: detailedData ? detailedData[index] : null,
          description: flavorTexts ? flavorTexts[index] : null,
          tags: detailedData
            ? detailedData[index]?.types?.map(
                (element: { type: { name: string } }) => element.type.name
              )
            : [],
        })
      ) || [];

    if (searchValue.trim() !== "") {
      return rawData.filter((pokemon: { name: string }) =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return rawData;
  }, [allData, detailedData, flavorTexts, searchValue]);

  return (
    <>
      <Row
        gutter={[24, 24]}
        justify="center"
        align="middle"
        style={{ height: "80%", paddingTop: "2rem" }}
      >
        {isError || isLoadingError ? (
          <Col>
            <Title level={1}>No Data</Title>
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
                handleClick={() =>
                  navigate(
                    `/pokemon/${pageLimit * (currentPage - 1) + (index + 1)}`
                  )
                }
              />
            </Col>
          ))
        )}
      </Row>
      <Row style={{ width: "100%", height: "20%", paddingTop: "10rem" }}>
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
