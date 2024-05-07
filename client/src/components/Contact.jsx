import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onchange = (e) => {
    setMessage(e.target.value);
  };

  console.log(landlord);
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleSendMessage = () => {
    const emailSubject = `Regarding ${listing.name}`;
    const mailtoUrl = `mailto:${landlord.email}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(message)}`;

    console.log(
      "hello.....",
      emailSubject,
      "mailtourl",
      mailtoUrl,
      "message",
      message
    );

    // Open the mailto link in the same tab/window
    window.location.href = mailtoUrl;
  };

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">
              {listing.name.toLowerCase()} Update.
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onchange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          {/* <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link> */}

          <button
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            onClick={handleSendMessage}
          >
            Send Message
          </button>
        </div>
      )}
    </>
  );
}
