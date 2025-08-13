import axios from "axios";
import React, { useEffect, useState } from "react";
import Booking from "./Booking";

const AccBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const axiosGet = async () => {
      try {
        const { data } = await axios.get("/bookings/owner");
        setBookings(data);
      } catch (error) {
        console.error("Erro ao buscar reservas", error);
      } finally {
        setLoading(false);
      }
    };

    axiosGet();
  }, []);

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Carregando...</p>;
  }

  if (bookings.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">
        Você não tem reservas feitas!
      </p>
    );
  }

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8">
      {bookings.map((booking) => (
        <Booking booking={booking} key={booking._id} />
      ))}
    </div>
  );
};

export default AccBookings;
