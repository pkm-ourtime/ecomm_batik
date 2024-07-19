import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-center flex-grow text-white px-4 text-lg md:text-xl h-80">
        <h1 className="text-5xl font-bold mb-4">
          <p className="text-white">Batikmu, Hanya <br /><span className='text-primary'>UNTUKMU</span></p>
        </h1>
        <p className="mb-8">Eksklusivitas Batik Modern dari <span className="font-bold">Melajoe Batik: <br />
          </span> Gaya Elegan yang Tidak Tertandingi</p>
        <div className="space-x-4">
          <Link to="/login" className="bg-orange-500 px-6 py-3 rounded text-white">Beli</Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
