export interface CardData {
  image: string;
  name: string;
  handle: string;
  date: string;
}

export interface CreateCardProps {
  card: CardData;
}
