import { useEffect, useState } from "preact/hooks";
import Nav from "../components/Nav.tsx";
import NewItemForm from "../components/NewItemForm.tsx";
import ItemsListComponent, { Item } from "../components/ItemsList.tsx";
import { PageProps } from "$fresh/server.ts";

interface Props {
  api: string;
}

export default function Home(props: PageProps<Props>) {
  const [items, setItems] = useState<Item[]>([]);
  const params = new URLSearchParams(props.url.search);
  const api = params.get("api") || "";

  if (!api) {
    return <div>Error: API endpoint is not available.</div>;
  }

  const fetchItems = async () => {
    await fetch(`${api}/items`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    // Your form submission logic here. For example, sending a POST request to `${api}/item`
    // After successfully submitting the form, fetch items again
    await fetchItems();
  };

  return (
    <>
      <Nav />
      <h3>New Item</h3>
      <NewItemForm api_endpoint={api} onSubmit={handleSubmit} />
      <h3>Items</h3>
      <ItemsListComponent items={items} />
    </>
  );
}
