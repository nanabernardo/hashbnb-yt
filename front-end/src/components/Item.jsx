import React from "react";

const Item = () => {
  return (
    <a href="/" className="flex flex-col gap-2">
      <img
        src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?"
        alt="Imagem da acomodação"
        className="aspect-square rounded-2xl object-cover"
      />

      <div>
        <h3 className="text-xl font-semibold">Serra Negra - SP</h3>
        <p className="truncate text-gray-600">
          Rodeada por paisagens montanhosas e ar puro, esta casa de campo
          oferece uma estadia tranquila e confortável. Possui 4 quartos, sala
          com lareira, cozinha rústica, varanda com redes e um pomar com frutas
          da estação. O quintal amplo é perfeito para churrascos e tardes ao ar
          livre. Ótima escolha para famílias, retiros ou escapadas românticas.
        </p>
      </div>

      <p>
        <span className="font-semibold">R$ 550</span> por noite
      </p>
    </a>
  );
};

export default Item;
