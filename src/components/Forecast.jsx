import React from 'react'

const Forecast = ({title, data}) => {
  const dev = [1,2,3,4,5]
  if(data){
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase text-white">{title}</p>
      </div>
      <hr className='my-1'></hr>
      <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4">
      
        {data.map((d, index)=> (
            <div 
            key = {index}
            className="flex flex-col items-center justify-center">
                <p className="text-white font-light text-sm">{d.title}</p>
                <img 
                src={d.icon}
                alt="weather-icon"
                className='w-12 my-1'>
                </img>
                <p className="font-medium text-white">{`${d.temp}°`}</p>
            </div>
        ))}
      </div>
    </div>
  
  )
} else{
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase text-white">{title}</p>
      </div>
      <hr className='my-1'></hr>
      <div className="flex justify-between items-center">
      
        {dev.map((dev, index)=> (
            <div 
            key = {index}
            className="flex flex-col items-center justify-center">
                <p className="text-white font-light text-sm">Wed</p>
                <img 
                src="https://openweathermap.org/img/wn/01d@2x.png"
                alt="weather-icon"
                className='w-12 my-1'>
                </img>
                <p className="font-medium text-white">12</p>
            </div>
        ))}
      </div>
    </div>
  )
}
}

export default Forecast;
