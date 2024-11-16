import { Card, Tag } from "antd";
import { toSnakeCase } from "../../../utilities/toSnakeCase";
const { Meta } = Card;

interface cardProps {
  cardImg: string;
  cardName: string;
  cardDescription: string;
  tags?: string[];
  handleClick: () => void;
}
const typeColors: { [key: string]: string } = {
  grass: "lime-inverse",
  poison: "green-inverse",
  fire: "volcano-inverse",
  water: "blue-inverse",
  electric: "gold-inverse",
  bug: "geekblue-inverse",
  normal: "default",
};

const CustomCard = ({
  cardImg,
  cardName,
  cardDescription,
  tags,
  handleClick,
}: cardProps) => (
  <Card
    onClick={handleClick}
    hoverable
    style={{ width: "22rem" }}
    cover={
      <img
        alt="poke image"
        src={cardImg}
        style={{ maxWidth: "22rem", maxHeight: "16rem" }}
      />
    }
  >
    <Meta title={toSnakeCase(cardName || "")} description={cardDescription} />
    {tags?.map((tag) => (
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
        {toSnakeCase(tag || "")}
      </Tag>
    ))}
  </Card>
);

export default CustomCard;
