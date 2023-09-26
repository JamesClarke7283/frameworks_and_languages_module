import { useSignal } from "@preact/signals";
import Nav from "../components/Nav.tsx";
import NewItemForm from "../components/NewItemForm.tsx";
import { PageProps } from "$fresh/server.ts";
import ItemsListComponent, { Item } from "../components/ItemsList.tsx";

export default function Home(props: PageProps) {
  const api = props.data.api;
  const itemsSignal = useSignal([] as Item[]);
  const items = itemsSignal.value;

  // Define your submit handler function
  const handleFormSubmit = (e: FormDataEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Fetch or construct the new item here
    const newItem: Item = {
      id: "newId",
      userId: "newUserId",
      lat: 0,
      lon: 0,
      image: "newImageURL",
      keywords: ["new"],
      description: "newDescription",
    };

    // Update the items list
    itemsSignal.set([...items, newItem]);
  };

  return (
    <>
      <Nav />
      <h3>New Item</h3>
      <NewItemForm api_endpoint={api} onSubmit={handleFormSubmit} />
      <h3>Items</h3>
      <ItemsListComponent items={items} />
    </>
  );
}
