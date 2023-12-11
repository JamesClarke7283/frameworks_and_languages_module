import { JSX } from "preact";
import { useRef } from "preact/hooks";

function createItem(api_endpoint, data) {
  fetch(`${api_endpoint}/item`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(json => console.log('createItem()', json))
  .catch(err => console.error(err));
}

export default function NewItemForm({ api_endpoint }: { api_endpoint: string }) {
  const formRef = useRef<HTMLFormElement>();

  const handleSubmit = (event: Event) => {
      event.preventDefault();

      if (formRef.current) {
          const formData = new FormData(formRef.current);
          const data = {
              user_id: formData.get('user_id'),
              lat: formData.get('lat'),
              lon: formData.get('lon'),
              image: formData.get('image'),
              keywords: formData.get('keywords')?.toString().split(',').map((keyword: string) => keyword.trim()),
              description: formData.get('description')
          };

          createItem(api_endpoint, data);
          formRef.current.reset();
      }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} class="flex flex-col p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
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
