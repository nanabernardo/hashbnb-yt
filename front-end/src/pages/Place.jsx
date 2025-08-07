import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import Perk from "../components/Perk";

const Place = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [place, setPlace] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");

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
  }, [overlay]);

  const handleBooking = (e) => {
    e.preventDefault();

    if (checkin && checkout && guests) {
      console.log("Fez uma reserva");
    } else {
      alert("Preencha todas as informações antes de fazer a reserva");
    }
  };

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

        {/* colunas */}
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Descrição</p>
              <p>{place.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Horários e restrições</p>
              <div>
                <p>Checkin: {place.checkin}</p>
                <p>Checkout: {place.checkout}</p>
                <p>Número máximo de convidados: {place.guests}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Diferenciais</p>
              <div className="flex flex-col gap-1">
                {place.perks.map((perk) => (
                  <div className="flex items-center gap-2">
                    <Perk perk={perk}></Perk>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form className="flex flex-col gap-4 self-center justify-self-center rounded-2xl border border-gray-200 px-8 py-4">
            <p className="text-center text-2xl font-bold">
              Preço: R$ {place.price} por noite
            </p>

            {/* Checkin e checkout */}
            <div className="flex">
              <div className="rounded-tl-2xl rounded-bl-2xl border border-gray-200 px-4 py-2">
                <p className="font-bold">Checkin</p>
                <input
                  type="date"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                />
              </div>
              <div className="rounded-tr-2xl rounded-br-2xl border border-l-0 border-gray-200 px-4 py-2">
                <p className="font-bold">Checkout</p>
                <input
                  type="date"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </div>
            </div>

            {/* convidados */}
            <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 px-4 py-2">
              <p className="font-bold">N° de convidados</p>
              <input
                className="rounded-2xl border border-gray-200 px-4 py-2"
                type="number"
                placeholder="2"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>

            {user ? (
              <button
                className="w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-center font-bold text-black"
                onClick={handleBooking}
              >
                Reservar
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-center font-bold text-white"
              >
                Faça seu login
              </Link>
            )}
          </form>
        </div>

        {/* Extras */}
        <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-6">
          <p className="text-2xl font-bold">Informações Extras</p>
          <p>{place.extras}</p>
        </div>

        {/* overlay */}
        <div
          className={`${overlay ? "flex" : "hidden"} fixed inset-0 items-start overflow-y-auto bg-black text-white`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
            <div className="grid aspect-[3/2] grid-cols-2 gap-4">
              {place.photos.map((photo) => (
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
