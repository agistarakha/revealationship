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
  const currentDateString = convertToDateTimeLocalString(new Date());
  if (expiredDate) {
    expiredDateString = convertToDateTimeLocalString(expiredDate);
  }

  return (
    <form
      action={imageFormAction}
      className="bg-stone-800 border border-stone-700 shadow rounded flex flex-col gap-2 p-4 w-10/12 md:w-8/12  mx-auto"
    >
      {method !== "PUT" && <ImageInput />}
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          className="bg-stone-700"
          type="text"
          name="title"
          id="title"
          defaultValue={title}
          required
          maxLength={60}
          minLength={1}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          className="bg-stone-700"
          name="description"
          id="description"
          defaultValue={description}
          minLength={1}
          maxLength={1000}
          required
          rows={8}
        ></textarea>
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
          required
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
          min={currentDateString}
          required
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
          min={1}
          required
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
            required
          >
            {["bottom", "top", "left", "right"].map((e) => {
              return <option value={e}>{e}</option>;
            })}
          </select>
        </div>
      )}
      {sub && (
        <input type="text" value={sub} name="owner" readOnly required hidden />
      )}

      {id && (
        <input type="text" name="id" value={id} readOnly required hidden />
      )}
      <input
        type="text"
        name="method"
        hidden
        readOnly
        value={method}
        required
      />
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
