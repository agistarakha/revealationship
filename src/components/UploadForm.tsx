import ImageInput from "@/components/ImageInput";
import { imageFormAction } from "@/actions/imageFormAction";
import FormButton from "./FormButton";
type UploadFormProps = {
  sub?: string | undefined | null;
  target?: number | undefined;
  targetUrl?: string | undefined;
  method?: string;
  id?: string;
  title?: string;
  description?: string;
  expiredDate?: Date;
  revealDirection?: string;
};
const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
export default async function UploadForm({
  sub,
  target,
  targetUrl,
  method,
  id,
  title,
  description,
  expiredDate,
  revealDirection,
}: UploadFormProps) {
  const youtubeBaseUrl = `https://youtu.be/`;
  let expiredDateString = "";
  if (expiredDate) {
    expiredDateString = convertToDateTimeLocalString(expiredDate);
  }
  console.log(expiredDateString);

  return (
    <form
      action={imageFormAction}
      className="bg-stone-800 border border-stone-700 shadow rounded flex flex-col gap-2 p-4 w-10/12 md:w-6/12 mx-auto"
    >
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          className="bg-stone-700"
          type="text"
          name="title"
          id="title"
          defaultValue={title}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <input
          className="bg-stone-700"
          type="text"
          name="description"
          id="description"
          defaultValue={description}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="target">Target Likes</label>
        <input
          className="bg-stone-700"
          type="number"
          name="target"
          id="target"
          min={0}
          defaultValue={target}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="expiredDate">Expired Date</label>
        <input
          className="bg-stone-700"
          type="datetime-local"
          name="expiredDate"
          id="expiredDate"
          defaultValue={expiredDateString}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="targetUrl">Target Post</label>
        <input
          className="bg-stone-700"
          type="text"
          name="targetUrl"
          id="targetUrl"
          defaultValue={targetUrl && `${youtubeBaseUrl}${targetUrl}`}
        />
      </div>
      {method == "PUT" && (
        <div className="flex flex-col">
          <label htmlFor="revealDirection">Reveal Direction</label>
          <select
            name="revealDirection"
            id="revealDirection"
            className="bg-stone-700"
            defaultValue={revealDirection}
          >
            {["bottom", "top", "left", "right"].map((e) => {
              return <option value={e}>{e}</option>;
            })}
          </select>
        </div>
      )}
      {method !== "PUT" && <ImageInput />}
      {sub && <input type="text" value={sub} name="owner" readOnly />}

      {id && <input type="text" name="id" value={id} readOnly />}
      <input type="text" name="method" hidden readOnly value={method} />
      {/* <div>
        <input
          type="submit"
          value="Upload"
          className="border border-slate-800 p-2"
        />
      </div> */}
      <FormButton />
    </form>
  );
}
