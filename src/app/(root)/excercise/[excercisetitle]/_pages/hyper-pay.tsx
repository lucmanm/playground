"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const fetchData = async () => {
  const url = "https://eu-test.oppwa.com/v1/checkouts";
  const entityId = "8a8294174b7ecb28014b9699220015ca";
  const amount = "92.00";
  const currency = "EUR";
  const paymentType = "DB";
  const authorization = "Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg=";

  const body = new URLSearchParams({
    entityId,
    amount,
    currency,
    paymentType,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

const HyperPAy = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [checkoutId, setCheckoutId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const handleClick = async () => {
    try {
      const fetchedData = await fetchData();
      setData(fetchedData);
      setCheckoutId(fetchedData.id);
      localStorage.setItem("checkoutId", fetchedData.id);
    } catch (error) {
      console.log(error);

    }
  };

  const checkPaymentStatus = async () => {
    if (checkoutId && !paymentStatus) {
      const url = `https://eu-test.oppwa.com/${window.location.search.slice(1)}`; // Extract resourcePath from URL
      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer YOUR_AUTHORIZATION_TOKEN",
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching payment status: ${response.statusText}`);
      }
      const statusData = await response.json();
      setPaymentStatus(statusData.status);
      localStorage.removeItem("checkoutId"); // Remove checkoutId after successful status check
    }
  };

  useEffect(() => {
    if (checkoutId) {
      const script = document.createElement("script");
      script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
      script.async = true;
      document.body.appendChild(script);
    }
    checkPaymentStatus();
  }, [checkoutId]);

  return (
    <div>
      <Button onClick={handleClick}>Fetch Data</Button>
      {error && <p>Error: {error}</p>}
      {data && (
        <>
          <p>Checkout ID: {checkoutId}</p>
          <form
            // action={data.shopperResultUrl} Disabled
            className="paymentWidgets"
            data-brands="VISA MASTER AMEX"
          ></form>
        </>
      )}
    </div>
  );
};

export default HyperPAy;
