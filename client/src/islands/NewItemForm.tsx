import { JSX } from "preact";

export default function NewItemForm(
  { api_endpoint, onSubmit }: {
    api_endpoint: string;
    onSubmit: (
      event: Event,
    ) => void;
  },
) {
  return (
    <form method="POST" action={api_endpoint + "/item"} onSubmit={onSubmit} class="flex flex-col p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
    <label for="create_user_id" class="font-bold mb-1">Username</label>
    <input id="create_user_id" type="text" name="user_id" class="mb-4 p-2 border rounded" />

    <label for="create_lat" class="font-bold mb-1">Latitude</label>
    <input id="create_lat" type="text" name="lat" class="mb-4 p-2 border rounded" />

    <label for="create_lon" class="font-bold mb-1">Longitude</label>
    <input id="create_lon" type="text" name="lon" class="mb-4 p-2 border rounded" />

    <label for="create_image" class="font-bold mb-1">Image URL</label>
    <input id="create_image" type="text" name="image" value="http://placekitten.com/100/100" class="mb-4 p-2 border rounded" />

    <label for="create_keywords" class="font-bold mb-1">Keywords</label>
    <input id="create_keywords" type="text" name="keywords" class="mb-4 p-2 border rounded" />

    <label for="create_description" class="font-bold mb-1">Description</label>
    <textarea id="create_description" name="description" class="mb-4 p-2 border rounded" rows="4"></textarea>

    <input data-action="create_item" type="submit" id="action_create" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
</form>

  );
}
