import { Card, Tag } from "antd";
const { Meta } = Card;

interface cardProps {
  cardImg: string;
  cardName: string;
  cardDescription: string;
  tags?: string[];
}
const typeColors: { [key: string]: string } = {
  grass: "green-inverse",
  poison: "lime-inverse",
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
}: cardProps) => (
  <Card
    hoverable
    style={{ width: "22rem" }}
    cover={
      <img
        alt="poke image"
        src={cardImg}
        style={{ maxWidth: "22rem", maxHeight: "18rem" }}
      />
    }
  >
    <Meta title={cardName} description={cardDescription} />
    {tags?.map((tag) => (
      <Tag
        style={{
          margin: "0.5rem 0.1rem",
          fontSize: "1.5rem",
          color: "#000",
          padding: "0.5rem",
          borderRadius: "2rem",
        }}
        color={typeColors[tag]}
      >
        {tag}
      </Tag>
    ))}
  </Card>
);

export default CustomCard;
