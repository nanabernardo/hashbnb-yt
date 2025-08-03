import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    if (id) {
      const axiosGet = async () => {
        const { data } = await axios.get(`/places/${id}`);

        console.log(data);
        setPlace(data);
      };

      axiosGet();
    }
  }, [id]);

  useEffect(() => {
    overlay
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  });

  if (!place) return <></>;

  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
        {/* Títulos */}
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-bold">{place.title}</div>

          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <p>{place.city}</p>
          </div>
        </div>
        {/* grade de imagens */}
        <div className="relative grid aspect-[3/2] grid-cols-[2fr_1fr] grid-rows-2 gap-4 overflow-hidden rounded-2xl">
          {place.photos
            .filter((photo, index) => index < 3)
            .map((photo, index) => (
              <img
                key={photo}
                className={`${index === 0 ? "row-span-2" : ""} aspect-square h-full w-full cursor-pointer object-cover transition hover:opacity-75`}
                src={photo}
                alt="Imagem da Acomodação"
                onClick={() => setOverlay(true)}
              />
            ))}

          <div
            className="absolute right-2 bottom-2 flex cursor-pointer gap-2 rounded-xl border border-black bg-white px-2 py-1 transition hover:scale-105"
            onClick={() => setOverlay(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>

            <p>Mostrar mais imagens</p>
          </div>
        </div>

        {/* overlay */}
        <div
          className={`${overlay ? "flex" : "hidden"} fixed inset-0 items-start overflow-y-auto bg-black text-white`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
            <div className="grid aspect-[3/2] grid-cols-2 gap-4">
              {place.photos.map((photo, index) => (
                <img
                  key={photo}
                  className={`aspect-square h-full w-full object-cover`}
                  src={photo}
                  alt="Imagem da Acomodação"
                />
              ))}
            </div>
          </div>

          <button
            className="absolute top-2 right-2 aspect-square w-8 cursor-pointer rounded-full bg-white font-bold text-black transition hover:scale-105"
            onClick={() => setOverlay(false)}
          >
            X
          </button>
        </div>
      </div>
    </section>
  );
};

export default Place;
