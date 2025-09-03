import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { post } from '../api/Endpoint';

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [prevData, setPrevData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const formHandler = async (data) => {
    try {
      setLoading(true);

      // Create FormData object
      const formData = new FormData();
      formData.append("image", data.image[0]); // File input returns an array
      formData.append("language", data.language);

      setPrevData(data);

      // Simulated API request
      const response = await post("/post/create", formData );
      
      setCaption(response?.data?.post?.caption);
    } catch (error) {
      console.error("Error uploading file", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className='text-2xl font-semibold'>Create Post</h1>
      <div className='flex items-center justify-between gap-5'>
        <div className="form-container w-[25%]">
          <form
            onSubmit={handleSubmit(formHandler)} // <-- submit handler here
            className='w-full flex flex-col gap-3 bg-transparent rounded-2xl border-1 px-3 py-2 border-gray-500 h-fit'
          >

            <div className="input-div w-full flex flex-col gap-2">
              <label htmlFor="Image">Image</label>
              <input
                className='px-3 py-2 cursor-pointer bg-yellow-600 w-full rounded-xl'
                type="file"
                {...register("image", { required: "Image is required!" })}
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            <div className="input-div w-full flex flex-col gap-2">
              <label htmlFor="Language">Language</label>
              <select
                className='px-4 py-2 rounded-xl text-black bg-white outline-none border-1 border-gray-600'
                {...register("language", { required: "Select Language" })}
              >
                <option value="" disabled>Select Language</option>
                <option value="Marathi">Marathi</option>
                <option value="Hindi">Hindi</option>
                <option value="Sanskrit">Sanskrit</option>
                <option value="English">English</option>
              </select>
              {errors.language && <p className="text-red-500 text-sm">{errors.language.message}</p>}
            </div>

            <button
              type="submit"
              className='px-2 py-2 rounded-xl bg-green-500 font-semibold cursor-pointer'
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Caption"}
            </button>
          </form>
        </div>

        <div className="caption-div w-[50%] border-1 border-gray-300 h-[50vh] rounded-xl text-gray-400 font-semibold py-3 px-2 flex flex-col justify-between gap-3">
          {
            caption ? caption : "AI Generated Caption Will Be Displayed Here..."
          }

          <button
            onClick={() => formHandler(prevData)}
            className='bg-green-500 font-semibold py-2 rounded-xl text-white px-2'
            disabled={!prevData || loading}
          >
            {loading ? "Regenerating..." : "Generate another caption"}
          </button>
        </div>
      </div>
    </div>
  )
}


export default CreatePost;
