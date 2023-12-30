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
  function deleteItem(id: number): void {
    const url = `${api_endpoint}/item/${id}`

    try {
        const response = fetch(url, {
            method: "DELETE"
        }).then(response => {
          if (!response.ok) {
            console.log("Error Response:",response);
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
  
          console.log("Item deleted successfully.");
          setItems(items.filter(item => item.id !== id.toString()));
          dispatchEvent(new CustomEvent('delete_item'));
        });
        
    } catch (error) {
        console.error("Failed to delete the item:", error);
    }
}

  
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

    addEventListener('create_item', handleItemsUpdated);
    addEventListener('delete_item', handleItemsUpdated);

    fetchItems(api_endpoint);

    return () => {
      removeEventListener('create_item', handleItemsUpdated);
      removeEventListener('delete_item', handleItemsUpdated);
    };
  }, []);

  return (
    <div id="items" class="container mx-auto p-4">
  <ul class="space-y-6">
    {items.map((item) => (
      <li key={item.id} class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="flex justify-between items-center p-5 border-b">
          <span class="font-semibold text-lg text-gray-900" data-field="id">ID: {item.id}</span>
          <a href="#" class="text-indigo-500 hover:text-indigo-700 font-medium">{item.userId}</a>
        </div>
        <img src={item.image} alt={item.description} class="w-full h-64 object-cover"/>
        <div class="p-5">
          <div class="text-gray-700 mb-2">LatLon: <span class="font-semibold">{item.lat}</span>, <span class="font-semibold">{item.lon}</span></div>
          <p class="mt-2 text-gray-600 mb-4">{item.description}</p>
          <div class="font-semibold text-gray-800 mb-2">Keywords</div>
          <ul class="list-none space-y-1 pl-0">
            {item.keywords.map((keyword, index) => (
              <li key={index} class="text-gray-500">{keyword}</li>
            ))}
          </ul>
        </div>
        <button
              data-action="delete" 
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-5"
              onClick={() => deleteItem(parseInt(item.id))}
        >Delete</button>
      </li>
    ))}
  </ul>
</div>

  );
}
