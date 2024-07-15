import symbol from '../../../assets/image/symbol.png'

const TentangKami = () => {
  return (
    <div className="container">
      <div className="border-t-4 border-primary container bg-gray-900 flex flex-row text-center content-center items-center justify-between flex-grow text-white py-56">
        <img className='w-56 h-72 invert' src={symbol} alt="" />
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-lg">
            Selamat datang di Melajoe Batik!
          </p>
          <div>
            <p className="pb-2">
              Kami adalah perusahaan yang berdedikasi untuk memberikan batik modern dengan sentuhan elegan dan kualitas terbaik. Dengan komitmen kuat terhadap keindahan dan tradisi, kami menggabungkan elemen klasik dan kontemporer untuk menciptakan karya batik yang memukau dan menawan.
            </p>
            <p className="pb-2">
              Kami percaya bahwa setiap helai batik memiliki cerita dan makna tersendiri. Setiap motif yang terukir di atas kain batik kami tidak hanya sekadar hiasan, tetapi juga simbol dari budaya dan sejarah yang kaya.
            </p>
            <p className="pb-2">
              Terima kasih telah mempercayai kami untuk menjadi bagian dari gaya Anda. Kami merasa terhormat dapat menjadi mitra dalam perjalanan fashion Anda dan berkomitmen untuk terus menghadirkan produk-produk terbaik yang akan menambah keindahan dan keunikan penampilan Anda.
            </p>
          </div>
        </div>
        <img className='w-56 h-72 invert' src={symbol} alt="" />
      </div>
    </div>
  );
};

export default TentangKami;
