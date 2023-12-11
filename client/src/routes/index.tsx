import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Nav from "../islands/Nav.tsx";
import NewItemForm from "../islands/NewItemForm.tsx";
import ItemsListComponent, { Item } from "../islands/ItemsList.tsx";
import { PageProps } from "$fresh/server.ts";

interface Props {
  api: string;
}

export default function Home(props: PageProps<Props>) {
  const items = useSignal<Item[]>([]);
  const params = new URLSearchParams(props.url.search);
  const api = params.get("api") || "";
  console.log("API endpoint:", api);

  if (!api) {
    return <div>Error: API endpoint is not available.</div>;
  }

  function fetchItems() {
    console.log("Fetching items from:", `${api}/items`);
    fetch(`${api}/items`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log("Items fetched:", json);
        items.value = json;
        console.log("Items state after fetch:", items.value);
      })
      .catch(err => console.error("Error fetching items:", err));
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    await fetchItems();
  };

  const handleRefresh = () => {
    fetchItems();
  };

  console.log("Items state:", items.value);

  return (
    <>
      <Nav />
      <h3>New Item</h3>
      <NewItemForm api_endpoint={api} onSubmit={handleSubmit} />
      <h3>Items</h3>
      <button onClick={handleRefresh} class="refresh-button">Refresh Items</button>
      <ItemsListComponent items={items.value} />
    </>
  );
}
