import React from 'react'
import macbook_pro from "../assets/macbook_pro.jpeg"
const Detail_product = () => {
  return (
    <section>
      <div id='product_description' className=" h-[500px] flex justify-center mt-[10px] mb-[40px] ">
        <div class="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="flex flex-col md:flex-row items-center">
            <div class=" p-4">
              <img src={macbook_pro} alt="MacBook Pro" class="w-full h-[300px] object-cover rounded-md"/>
            </div>
            <div class="md:w-1/2 p-4">
              <h2 class="text-2xl font-bold text-gray-800">MacBook Pro</h2>
              <p class="text-gray-600 mt-2 leading-relaxed">
                XDR (Gamme dynamique extrême) 1 000 000:1 de rapport de contraste. Luminosité XDR : 1 000 nits de luminosité constante en plein écran, 1 600 nits de luminosité de ...
              </p>
              <p class="text-gray-600 mt-2 leading-relaxed" ><b>Price :    </b>50000 $</p>
            </div>
          </div>
          <div className='flex justify-center gap-4'>
            <button className="btn btn-xs  p-2 rounded-md text-white hover:bg-orange-700" style={{backgroundColor: "rgb(234, 114, 39)"}}>Add To Card</button>
            <button onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })} class="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600">Show More products</button>
          </div>
        </div>
      </div>
      <div id="products" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h3 className="text-center text-blue-600 font-semibold text-sm">
        Most Popular Products
      </h3>
      <h2 className="text-center text-3xl font-bold text-gray-900 mt-2">
        Best Selling Items
      </h2>
      <p className="text-center text-gray-500 mt-2">
        There are many variations of passages of Electroniques products available but the majority have suffered alteration in some form.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        <div className="relative bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <img
            className="w-full h-56 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-gray-900 font-semibold">Iphone 15 pro max</h3>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-gray-900 font-bold mr-2">$75.00</span>
              <span className="line-through">$150.00</span>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>&#9733;</span> 
                ))}
              </div>
              <span className="text-gray-500 ml-2 text-sm">5.00 Rating</span>
            </div>
          </div>
        </div>

        <div className="relative bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition">
          <img
            src="path-to-backpack-image"
            className="w-full h-56 object-cover rounded-t-lg"
          />
          <div className="p-4 cursor-pointer">
            <h3 className="text-gray-900 font-semibold">Smart Watch </h3>
            <div className="text-gray-900 font-bold">$189.00</div>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <span key={i}>&#9733;</span> 
                ))}
              </div>
              <span className="text-gray-500 ml-2 text-sm">4.00 Rating</span>
            </div>
          </div>
        </div>

        <div className="relative bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <img
            src="path-to-wallet-image"
           
            className="w-full h-56 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-gray-900 font-semibold">Iphone 15 pro max </h3>
            <div className="text-gray-900 font-bold">$950.00</div>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>&#9733;</span> 
                ))}
              </div>
              <span className="text-gray-500 ml-2 text-sm">5.00 Rating</span>
            </div>
          </div>
        </div>

        <div className="relative bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <img
            src="path-to-tshirt-image"
            className="w-full h-56 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-gray-900 font-semibold">Iphone 15 pro max</h3>
            <div className="text-gray-900 font-bold">$25.00</div>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>&#9733;</span> 
                ))}
              </div>
              <span className="text-gray-500 ml-2 text-sm">5.00 Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200">
          &larr;
        </button>
        <button className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200">
          &rarr;
        </button>
      </div>
    </div>
    </section>
    
  )
}

export default Detail_product