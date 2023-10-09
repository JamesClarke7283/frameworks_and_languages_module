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
    <form method="POST" action={api_endpoint + "/item"} onSubmit={onSubmit}>
      <label for="create_user_id">Username</label>
      <input id="create_user_id" type="text" name="user_id" />
      <label for="create_lat">lat</label>
      <input id="create_lat" type="text" name="lat" />
      <label for="create_lon">lon</label>
      <input id="create_lon" type="text" name="lon" />
      <label for="create_image">image</label>
      <input
        id="create_image"
        type="text"
        name="image"
        value="http://placekitten.com/100/100"
      />
      <label for="create_keywords">keywords</label>
      <input id="create_keywords" type="text" name="keywords" />
      <label for="create_description">description</label>
      <textarea id="create_description" type="text" name="description" />
      <input type="submit" id="action_create" />
    </form>
  );
}
