import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AccBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/bookings/owner");
      setBookings(data);
    };

    axiosGet();
  }, []);

  return (
    <div className="flex w-full max-w-7xl flex-col items-center">
      {bookings.map((booking) => (
        <Link
          key={booking.place._id}
          to={`/place/${booking.place._id}`}
          className="flex items-center gap-6 rounded-2xl bg-gray-100 p-6"
        >
          <img
            className="aspect-square max-w-56 rounded-2xl object-center"
            src={booking.place.photos[0]}
            alt="Foto da acomodação"
          />

          <div className="flex flex-col gap-2">
            <p className="text-2xl font-medium">{booking.place.title}</p>

            <div>
              <p>
                <span className="font-semibold">Checkin:</span>{" "}
                {new Date(booking.checkin + "GMT-03:00").toLocaleDateString(
                  "pt-BR",
                )}
              </p>
              <p>
                <span className="font-semibold">Checkout:</span>{" "}
                {new Date(booking.checkout + "GMT-03:00").toLocaleDateString(
                  "pt-BR",
                )}
              </p>
              <p>
                <span className="font-semibold">Noites:</span> {booking.nights}
              </p>
              <p>
                <span className="font-semibold">Convidados:</span>{" "}
                {booking.guests}
              </p>
              <p>
                <span className="font-semibold">Preço total: </span> R$
                {booking.total.toLocaleString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AccBookings;
