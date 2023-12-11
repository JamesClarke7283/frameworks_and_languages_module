export type Item = {
  id: string;
  userId: string;
  lat: number;
  lon: number;
  image: string;
  keywords: string[];
  description: string;
};

export type ItemsList = {
  items: Item[];
};

export default function ItemsListComponent({ items }: ItemsList) {
  return (
    <div id="items">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.id}</span>
            <img src={item.image} alt={item.description} />
            <a href="#">{item.userId}</a>
            LatLon: <span>{item.lat}</span>,<span>{item.lon}</span>
            <p>{item.description}</p>
            <ul>
              {item.keywords.map((keyword, index) => (
                <li key={index}>{keyword}</li>
              ))}
            </ul>
            <button>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
