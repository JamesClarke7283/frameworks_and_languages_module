import { useEffect, useState } from "preact/hooks";

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

export default function ItemsListComponent({ api_endpoint }: { api_endpoint: string }) {

  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  
  function fetchItems(api: string) {
    console.log("Fetching items from:", `${api_endpoint}/items`);
    fetch(`${api}/items`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log("Items fetched:", json);
        setItems(json);
        console.log("Items state after fetch:", items.values);
      })
      .catch(err => console.error("Error fetching items:", err));
  }

  useEffect(() => {
    const handleItemsUpdated = () => {
      fetchItems(api_endpoint);
    };

    addEventListener('itemCreated', handleItemsUpdated);
    addEventListener('itemDeleted', handleItemsUpdated);

    fetchItems(api_endpoint); // Fetch items initially

    return () => {
      removeEventListener('itemCreated', handleItemsUpdated);
      removeEventListener('itemDeleted', handleItemsUpdated);
    };
  }, []);

  return (
    <div id="items">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span data-field="id">{item.id}</span>
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
