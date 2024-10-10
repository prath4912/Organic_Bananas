// import { GoogleMap ,Marker  ,useJsApiLoader } from '@react-google-maps/api'
import React from "react";

export default function Map() {
  return (
    <div className="  bg-zinc-800 py-2 lg:p-3 ">
      <div className="flex flex-row flex-wrap items-center justify-around gap-2">
        <div className="px-2  text-white mb-5 mt-5">
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
          <address className="my-3 mb-10 " itemProp="address">
            <div>
              आण्णा पवार वस्ती Near siddhnath mandir सखाराम वस्ती Umbarde
            </div>
            <div>Vaduj, Maharashtra 415506</div>
            <div>India</div>
          </address>
          <a
            className="bg-yellow-500 border-2 font-bold rounded text-black border-black p-2 my-  active:scale-75 transition-all"
            href="https://www.google.com/maps/dir//%E0%A4%A6%E0%A5%87%E0%A4%B6%E0%A5%80+%E0%A4%95%E0%A5%87%E0%A4%B3%E0%A5%80+%28Organic+Bananas%29/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc3db553f6c68d5:0x52a95cbe196c7709!2m2!1d74.43272!2d17.5516002"
            target="_blank"
            data-tracking-element-type="6"
            jslog="56039; track:impression,click"
          >
            Get directions
          </a>{" "}
          {/* <button className="bg-yellow-500 border-2 text-sm font-bold border-black p-2 my-3 ms-2 active:scale-75 transition-all rounded text-black">
            Send Message
          </button> */}
        </div>

        <div className=" w-full p-1.5 lg:w-1/2">
          <iframe
            className="w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6848.456060517908!2d74.43767169189655!3d17.55333874475448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3db553f6c68d5%3A0x52a95cbe196c7709!2z4KSm4KWH4KS24KWAIOCkleClh-Cks-ClgCAoT3JnYW5pYyBCYW5hbmFzKQ!5e0!3m2!1sen!2sin!4v1691314953354!5m2!1sen!2sin"
            // width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

// const center = {
//     lat: -3.745,
//     lng: -38.523
//   };
// const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyCPatm3SB4IjzWHWVScEzjIRJx8m5IqsHE"
//   })
// if(!isLoaded)
// {
// return <div> Not Available</div>
// }else
// {
// return (
// <GoogleMap
//     // mapContainerStyle={containerStyle}
//     center={center}
//     zoom={10}
//     // onLoad={onLoad}
//     // onUnmount={onUnmount}
//     mapContainerclassName='map-container'
//   >
//     { /* Child components, such as markers, info windows, etc. */ }
//     {/* <></> */}
//   </GoogleMap>)
// }
