import React, { useState } from "react";
import { FaBox, FaTruck, FaCheckCircle, FaStar } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";

const TrackOrder = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const stages = [
    { icon: FaBox, label: "Pedido realizado" },
    { icon: FaTruck, label: "Em trânsito" },
    { icon: FaCheckCircle, label: "Entregue" },
  ];

  const currentStage = 1; // This would be dynamic based on actual order status

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (rating === 0) newErrors.rating = "Please select a rating";
    if (comment.trim() === "") newErrors.comment = "Please provide a comment";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit the form
      console.log("Form submitted", { rating, comment, image });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">
        Rastreie seu pedido
      </h2>

      {/* Status Indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-center">
          {stages.map((stage, index) => (
            <div key={index} className="flex flex-col items-center w-1/3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index <= currentStage
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <stage.icon className="text-2xl" />
              </div>
              <p
                className={`mt-2 text-sm ${
                  index <= currentStage
                    ? "text-green-500 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {stage.label}
              </p>
              {index < stages.length - 1 && (
                <div
                  className={`h-1 w-full ${
                    index < currentStage ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Timeline */}
      <div className="mb-12 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Entrega estimada</h3>
        <p className="text-lg">
          A previsão é que seu pedido chegue até{" "}
          <span className="font-bold">15 de junho de 2023</span>
        </p>
        <a
          href="#"
          className="text-green-500 hover:underline mt-2 inline-block"
        >
          Rastreie o pedido em tempo real
        </a>
      </div>

      {/* Customer Feedback Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-xl font-semibold">Feedback do pedido</h3>

        {/* Rating */}
        <div>
          <label className="block mb-2 font-medium">
            Avalie sua experiência:
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                aria-label={`Rate ${star} stars`}
              >
                <FaStar />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block mb-2 font-medium">
            Comentários:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded-md outline-green-400"
            rows="4"
          ></textarea>
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block mb-2 font-medium">
            Carregar imagem (optional):
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          Enviar Feedback
        </button>
      </form>
    </div>
  );
};

export default TrackOrder;
