import React, { useState } from 'react'

const App = () => {

  const [dogImage, setDogImage] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [favourite, setFavourite] = useState(()=>{
    const saved = localStorage.getItem("favouriteDogs");
    return saved ? JSON.parse(saved): [];
  });


  const handleSearch = async () => {

    setIsLoading(true); //start loading
    setDogImage(null); //Clear previous image
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();

      if(data.status === "success"){
        setDogImage(data.message); //this is the image url
      }
      else{
        console.error("the dog image is not found!")
      }

    } catch (error) {
        console.error("Error fetching the dog image", error);
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='text-center p-8'>
      <h1 className='font-bold text-4xl mb-6'>Random Dog Viewer</h1>

      <button
        className='px-4 py-2 text-white text-2xl rounded-lg bg-gray-600 border-none cursor-pointer mb-6'
        onClick={handleSearch}

      >Show me a Dog</button>

      {
        isLoading &&(
          <p>Loading your pup......</p>
        )
      }

      {
        dogImage && (
          <div className='flex flex-col justify-center items-center'>
            <img src={dogImage} alt="a cute dog" className='max-w-400px rounded-lg' />

            <br />
            <button 
            onClick={()=>{
              const updatedFavourite = [dogImage, ...favourite];
              setFavourite(updatedFavourite);
              localStorage.setItem("favouriteDogs", JSON.stringify(updatedFavourite));
            }}
            className='mt-2 px-4 py-2 bg-blue-500 text-black-500 border-none rounded-md cursor-pointer'
            >
              Save to Favourites
            </button>
          </div>

        )
      }

    </div>
  )
  {
    favourite.length > 0 && (
      <div className='mt-8'>
        <h2>My Favourite Dogs</h2>
        <div className='flex gap-4 flex-wrap justify-center'>
          {favourite.map((item, index) => (
            <img
            key={index}
            src={item} 
            alt={`Favourite dog &index + 1`}
            className='w-[150px] rounded-lg' />
          ))}
        </div>
      </div>
    )
  }

}

export default App
