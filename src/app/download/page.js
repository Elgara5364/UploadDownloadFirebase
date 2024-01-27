"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const Download = () => {
  const [url, setUrl] = useState();
  console.log(url);

  useEffect(() => {
    getSlip();
  });

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
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const pdf = new jsPDF("p", "cm", "a4"); //orientasi canvas, unit, size canvas
    const imgProps = pdf.getImageProperties(url); // method utk dapat w * h sebuah data
    const pdfWidth = pdf.internal.pageSize.width; //lebar canvas
    console.log(pdfWidth);
    const pdfHeight = pdf.internal.pageSize.height; //tinggi canvas
    const widthRatio = pdfWidth / imgProps.width;
    const heightRatio = pdfHeight / imgProps.height;
    const ratio = Math.min(widthRatio, heightRatio);

    const w = imgProps.width * ratio;
    const h = imgProps.height * ratio;
    pdf.addImage(url, 0, 0, w, h);
    pdf.save(`ticket.pdf`); //nama file download sesuai nama
  };

  return (
    <div>
      <h1>Download</h1>
      <button onClick={handleDownload}> Download pdf</button>
      <a href={url}>download</a>
    </div>
  );
};

export default Download;
