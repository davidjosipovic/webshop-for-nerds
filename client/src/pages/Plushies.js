const Plushies = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        
        <h1 className="text-3xl font-bold mb-4">Plushies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <img src="https://m.media-amazon.com/images/I/619L6+G1W+L._AC_UF1000,1000_QL80_.jpg" alt="Figure 1" className="w-full mb-4" />
            <h2 className="text-lg font-bold mb-2">Figure 1</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <img src="https://ae01.alicdn.com/kf/S742dd274bbac465eb0e62e1e2f40e6dax/Godzilla-Figure-King-Of-The-Monsters-Model-Oversized-Gojira-Figma-Soft-Glue-Movable-Joints-Action-Figures.jpg" alt="Figure 2" className="w-full mb-4" />
            <h2 className="text-lg font-bold mb-2">Figure 2</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <img src="https://img.fruugo.com/product/5/72/835524725_max.jpg" alt="Figure 3" className="w-full mb-4" />
            <h2 className="text-lg font-bold mb-2">Figure 3</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <img src="https://m.media-amazon.com/images/I/61o7QXXkXhL.jpg" alt="Figure 4" className="w-full mb-4" />
            <h2 className="text-lg font-bold mb-2">Figure 4</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          {/* Add more figure cards as needed */}
        </div>
      </div>
    );
  };
  
  export default Plushies;
  