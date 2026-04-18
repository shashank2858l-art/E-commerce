"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const products = [
  {
    name: "Mountain Bike",
    price: "$899",
    image: "/images/products/neon_mountain_bike.png",
    href: "/cycle",
    delay: 0,
  },
  {
    name: "Gaming Chair",
    price: "$399",
    image: "/images/products/neon_gaming_chair.png",
    href: "/chair",
    delay: 1,
  },
  {
    name: "iPhone 17 Pro Max",
    price: "$1,199",
    image: "/images/products/neon_iphone_17.png",
    href: "/phone",
    delay: 2,
  },
];

export default function NewArrivalsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0B0F14, #0E1A12)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Floating background blobs */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.3,
          background: "rgba(0, 255, 156, 0.15)",
          top: -100,
          left: -100,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.3,
          background: "rgba(0, 201, 123, 0.1)",
          bottom: -50,
          right: -50,
          pointerEvents: "none",
        }}
      />

      {/* Section Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 48,
          zIndex: 1,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}
      >
        <span
          style={{
            color: "#00FF9C",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 12,
          }}
        >
          ✦ Just Dropped
        </span>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          New Arrivals
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 16,
            marginTop: 12,
            fontWeight: 300,
            maxWidth: 500,
          }}
        >
          Explore our premium collection with immersive 360° scrollytelling
          experiences
        </p>
      </div>

      {/* Product Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 32,
          maxWidth: 1200,
          width: "100%",
          zIndex: 1,
        }}
        className="arrivals-grid"
      >
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            mounted={mounted}
          />
        ))}
      </div>

      {/* CTA Banner */}
      <Link
        href="/phone"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 800,
          margin: "60px auto 0",
          padding: "24px 32px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(0,255,150,0.2)",
          borderRadius: 20,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          cursor: "pointer",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          textDecoration: "none",
          zIndex: 2,
          position: "relative",
          overflow: "hidden",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.25,0.8,0.25,1) 0.6s",
        }}
        className="cta-banner-link"
      >
        <div className="cta-shine" />
        <div style={{ fontSize: "2.5rem", marginRight: 24, filter: "drop-shadow(0 0 10px rgba(0,255,156,0.6))" }}>
          ✨
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <span
            style={{
              color: "#fff",
              fontSize: "1.4rem",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Experience the Future
          </span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", fontWeight: 300 }}>
            Click to explore the immersive iPhone 17 Pro Max scrollytelling experience.
          </span>
        </div>
        <div className="cta-arrow" style={{ color: "#00FF9C", fontSize: "2rem" }}>
          →
        </div>
      </Link>

      {/* Responsive + Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes shine {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }

        .cta-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,255,156,0.1), transparent);
          animation: shine 3s infinite;
          transform: skewX(-20deg);
        }

        .cta-banner-link:hover {
          transform: translateY(-5px) scale(1.02) !important;
          border-color: rgba(0,255,150,0.6) !important;
          box-shadow: 0 15px 50px rgba(0,255,156,0.2), inset 0 0 20px rgba(0,255,156,0.05) !important;
        }

        .cta-banner-link:hover .cta-arrow {
          transform: translateX(10px);
          transition: transform 0.3s ease;
        }

        .product-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,255,150,0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: visible;
          transform-style: preserve-3d;
          text-decoration: none;
        }

        .product-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 20px;
          box-shadow: 0 0 40px rgba(0,255,156,0);
          transition: all 0.4s ease;
          z-index: -1;
        }

        .product-card:hover {
          transform: perspective(1000px) rotateX(20deg) rotateY(-5deg) translateY(-5px);
          border-color: rgba(0,255,150,0.4);
        }

        .product-card:hover::before {
          box-shadow: 0 20px 50px rgba(0,255,156,0.2);
        }

        .product-card:hover .product-img {
          transform: translateZ(80px) scale(1.3) translateY(-40px);
          filter: drop-shadow(0 30px 40px rgba(0,255,156,0.6));
        }

        .product-card:hover .img-wrapper {
          animation-play-state: paused;
        }

        .product-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          mix-blend-mode: screen;
          transition: all 0.5s cubic-bezier(0.25,0.8,0.25,1);
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5));
        }

        .img-wrapper {
          width: 100%;
          height: 240px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          transform-style: preserve-3d;
          animation: float 5s ease-in-out infinite;
        }

        .img-wrapper-delay-1 { animation-delay: -1s; }
        .img-wrapper-delay-2 { animation-delay: -2s; }

        .buy-btn {
          background: linear-gradient(90deg, #00FF9C, #00C97B);
          color: #0B0F14;
          font-weight: 600;
          text-decoration: none;
          padding: 12px 32px;
          border-radius: 50px;
          transition: all 0.3s ease;
          display: inline-block;
          width: 100%;
          box-shadow: 0 0 0 rgba(0,255,156,0);
          text-align: center;
        }

        .buy-btn:hover {
          box-shadow: 0 0 20px rgba(0,255,156,0.6);
          transform: scale(1.02);
        }

        @media (max-width: 1024px) {
          .arrivals-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 600px) {
          .arrivals-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ProductCard({
  product,
  mounted,
}: {
  product: (typeof products)[number];
  mounted: boolean;
}) {
  return (
    <Link
      href={product.href}
      className="product-card"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.25,0.8,0.25,1) ${0.2 + product.delay * 0.15}s`,
      }}
    >
      <div className={`img-wrapper img-wrapper-delay-${product.delay}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          className="product-img"
          alt={product.name}
        />
      </div>
      <h2
        style={{
          color: "#fff",
          fontSize: 22,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {product.name}
      </h2>
      <div
        style={{
          color: "#00FF9C",
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        {product.price}
      </div>
      <span className="buy-btn">View Experience →</span>
    </Link>
  );
}
