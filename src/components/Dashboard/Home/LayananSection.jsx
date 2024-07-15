import React, { useState } from 'react';

const Layanan = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const encodedName = encodeURIComponent(name);
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/6289666505782?text=Nama:%20${encodedName}%0APesan:%20${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="container">
      <div className="bg-gray-900 flex flex-col items-center justify-center flex-grow text-center text-white py-40">
        <h3 className="text-orange-500 text-5xl font-bold mb-8">Hubungi Kami</h3>
        <p className="mb-8 text-center">
          "Pesan sekarang untuk mendapatkan produk eksklusif kami. <br />
          Nikmati kualitas terbaik dan desain unik yang hanya untukmu."
        </p>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-orange-500 mb-2 text-left font-semibold" htmlFor="name">Nama</label>
            <input className="w-full px-3 py-2 text-black rounded-md" type="text" id="name" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block text-orange-500 mb-2 text-left font-semibold" htmlFor="message">Pesan</label>
            <textarea className="w-full px-3 py-2 text-black rounded-md" id="message" rows="4" placeholder="Pesan" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <button className="w-full bg-orange-500 text-white py-3 rounded-md font-bold mt-2" type="submit">Pesan Batik Custom</button>
        </form>
      </div>
    </div>
  );
};

export default Layanan;