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
    return <div>Error: Please enter `api` url parameter</div>;
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    console.log("New item submitted",event.target)
    await fetchItems();
  };

  console.log("Items state:", items.value);

  return (
    <>
      <Nav />
      <h3>New Item</h3>
      <NewItemForm api_endpoint={api} get_items_func={handleSubmit} />
      <h3>Items</h3>
      <ItemsListComponent api_endpoint={api} />
    </>
  );
}
