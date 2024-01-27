"use client";
import axios from "axios";
import { useState, useEffect } from "react";

import jsPDF from "jspdf";

const Upload = () => {
  const [file, setFile] = useState();
  console.log(file);
  const [ImageData, setImageData] = useState();
  const [prevFile, setPrevFile] = useState();
  console.log(prevFile);
  const [url, setUrl] = useState();
  console.log(url);

  const handleImage = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
    setPrevFile(URL.createObjectURL(e.target.files[0])); // convert object image to blob
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageData(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);
    const config = {
      headers: {
        access_token: token,
      },
    };
    console.log(config);

    const formData = new FormData();
    formData.append("slip", file);

    try {
      const res = await axios.put(
        `https://api-car-rental.binaracademy.org/customer/order/8123/slip`,
        formData,
        config
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSlip();
  }, []);

  const getSlip = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);
    const config = {
      headers: {
        access_token: token,
      },
    };
    console.log(config);

    try {
      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/customer/order/8123`,
        config
      );
      console.log(res.data.slip);
      setUrl(res.data.slip);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = () => {
    const pdf = new jsPDF("p", "cm", "a4"); //orientasi canvas, unit, size canvas
    const imgProps = pdf.getImageProperties(ImageData); // method utk dapat w * h sebuah data
    const pdfWidth = pdf.internal.pageSize.width; //lebar canvas
    console.log(pdfWidth);
    const pdfHeight = pdf.internal.pageSize.height; //tinggi canvas
    const widthRatio = pdfWidth / imgProps.width;
    const heightRatio = pdfHeight / imgProps.height;
    const ratio = Math.min(widthRatio, heightRatio);

    const w = imgProps.width * ratio;
    const h = imgProps.height * ratio;
    pdf.addImage(ImageData, 0, 0, w, h);
    pdf.save(`ticket.pdf`); //nama file download sesuai nama
  };

  return (
    <div className="flex flex-col gap-5">
      <h1>Ini halaman Upload</h1>
      <input onChange={handleImage} type="file"></input>
      <img src={prevFile} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleDownload}>download</button>
      <a href={url}>Picture</a>
    </div>
  );
};

export default Upload;
