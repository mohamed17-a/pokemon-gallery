import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Row, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useGetSinglePokemonDetails } from "../../../query/queries";
import Title from "antd/es/typography/Title";

const typeColors: { [key: string]: string } = {
  grass: "green-inverse",
  poison: "lime-inverse",
  fire: "volcano-inverse",
  water: "blue-inverse",
  electric: "gold-inverse",
  bug: "geekblue-inverse",
  normal: "default",
};

const PokeDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { singleData, statsBases, statsNames, moves, abilities, tags } =
    useGetSinglePokemonDetails(params.id || "");
  return (
    <Col style={{ width: "100%", padding: "6rem 16rem" }}>
      <Card bordered>
        <Row>
          <Button
            onClick={() => navigate("/")}
            aria-label="back to home page"
            color="danger"
            variant="solid"
            size="large"
            style={{ padding: "0rem 2rem" }}
          >
            <ArrowLeftOutlined />
            BACK
          </Button>
        </Row>
        <Col style={{ paddingTop: "4rem" }}>
          {/* image"singleData.sprites.front_default",singleData.name"",tags[] */}
          <Row>
            <Image src={singleData?.sprites?.front_default} width={220}></Image>
            <Col>
              <Title level={2}>{singleData?.name}</Title>
              {tags?.map((tag: string) => (
                <Tag
                  style={{
                    margin: "0.5rem 0.1rem",
                    fontSize: "1.5rem",
                    color: "#000",
                    padding: "0.3rem 0.9rem",
                    borderRadius: "1.5rem",
                  }}
                  color={typeColors[tag]}
                  key={tag}
                >
                  {tag}
                </Tag>
              ))}
            </Col>
          </Row>
          <Tabs
            style={{ paddingTop: "4rem" }}
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "STATS",
                children: (
                  <Row>
                    <Col>
                      {statsNames?.map((name: string) => (
                        <p key={name}>{name}</p>
                      ))}
                    </Col>
                    <Col style={{ paddingLeft: "1rem" }}>
                      {statsBases?.map((base: string) => (
                        <p key={base}>{base}</p>
                      ))}
                    </Col>
                  </Row>
                ),
              },
              {
                key: "2",
                label: "MOVES",
                children: (
                  <div>
                    {moves?.map((move: string) => (
                      <span key={move}>{move}</span>
                    ))}
                  </div>
                ),
              },
              {
                key: "3",
                label: "ABILITIES",
                children: (
                  <div>
                    {abilities?.map((name: string) => (
                      <p key={name}>{name}</p>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </Col>
      </Card>
    </Col>
  );
};

export default PokeDetails;
