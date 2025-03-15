import React, { useState, useEffect } from "react";

const coupons = ["COUPON1", "COUPON2", "COUPON3", "COUPON4"];
const CLAIM_COOLDOWN = 3600 * 1000; // 1 hour in milliseconds

const CouponDistributor = () => {
  const [coupon, setCoupon] = useState(null);
  const [message, setMessage] = useState("");
  const [lastClaimTime, setLastClaimTime] = useState(() => {
    return localStorage.getItem("lastClaimTime") || 0;
  });
  
  useEffect(() => {
    const storedTime = parseInt(localStorage.getItem("lastClaimTime"), 10);
    if (storedTime && Date.now() - storedTime < CLAIM_COOLDOWN) {
      setMessage("You must wait before claiming another coupon.");
    }
  }, []);

  const claimCoupon = () => {
    const now = Date.now();
    if (now - lastClaimTime < CLAIM_COOLDOWN) {
      setMessage("You must wait before claiming another coupon.");
      return;
    }

    let currentIndex = parseInt(localStorage.getItem("couponIndex"), 10) || 0;
    const newCoupon = coupons[currentIndex];
    currentIndex = (currentIndex + 1) % coupons.length;
    
    localStorage.setItem("couponIndex", currentIndex);
    localStorage.setItem("lastClaimTime", now);
    setLastClaimTime(now);
    setCoupon(newCoupon);
    setMessage("Coupon claimed!");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Claim Your Coupon</h2>
      <button onClick={claimCoupon} disabled={Date.now() - lastClaimTime < CLAIM_COOLDOWN}>
        Claim Coupon
      </button>
      {coupon && <h3>Your Coupon: {coupon}</h3>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default CouponDistributor;