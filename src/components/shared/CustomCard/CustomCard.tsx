import { Badge, Card } from "antd";
const { Meta } = Card;

interface cardProps {
  cardImg: string;
  cardName: string;
  cardDescription: string;
  badges?: string[];
}

const CustomCard = ({
  cardImg,
  cardName,
  cardDescription,
  badges,
}: cardProps) => (
  <Card
    hoverable
    style={{ width: "24rem" }}
    cover={<img alt="poke image" src={cardImg} />}
  >
    <Meta title={cardName} description={cardDescription} />
    {badges?.map((badge) => (
      <Badge>{badge}</Badge>
    ))}
  </Card>
);

export default CustomCard;
