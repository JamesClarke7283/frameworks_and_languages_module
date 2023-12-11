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

  if (!api) {
    return <div>Error: API endpoint is not available.</div>;
  }

  const fetchItems = async () => {
    await fetch(`${api}/items`)
      .then((response) => response.json())
      .then((data) => items.value = data)
      .catch((error) => console.error("Error fetching items:", error));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    // Your form submission logic here
    await fetchItems();
  };

  return (
    <>
      <Nav />
      <h3>New Item</h3>
      <NewItemForm api_endpoint={api} onSubmit={handleSubmit} />
      <h3>Items</h3>
      <ItemsListComponent items={items.value} />
    </>
  );
}
