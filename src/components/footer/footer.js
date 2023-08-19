import React, { useState } from 'react'
import './footer.css'
import axios from 'axios';
import "mdb-ui-kit/css/mdb.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Footer() {
    const [email, setEmail] = useState("");

    const validateEmail = (email) => {
        // Regular expression pattern for matching email addresses
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };

    const handleInputChange = (event) => {
      setEmail(event.target.value);
    };
    
    const handleSubmit = () => {
        if (email === "" || email === null || email === undefined) {
          toast.warn("Please enter an Email Address!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setEmail("")
          return;
        }
        if (!validateEmail(email)) {
            toast.warn("Please enter a Valid Email Address!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setEmail("")
          return
        }
        const token = `${process.env.REACT_APP_BACKENDIFYI}`;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `APIKey ${token}`,
          },
        };
        const data = {
          email: email,
        };
        console.log(data, config);
        axios
          .post(
            `https://api.backendifyi.vercel.app/api/emailbox/addEmail/`,
            data,
            config
          )
          .then((response) => {
            toast.success("Subscription Added Successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setEmail("")
          })
          .catch((error) => {
            if(error.response.status === 429){
                toast.error("Too many requests, please try after some time!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                setEmail("");
            }
            else{
               toast.error("We face some issue, please try after some time!", {
                 position: "top-right",
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
               });
               setEmail(""); 
            }
          })
    }
    return (
      <div>
        <center>
          <div className="title">Subscribe to my Tech Articles</div>
          <div>You will receive an email, whenever I post a new Article</div>
          <br />
          <div class="d-flex justify-content-center">
            <div class="input-group w-auto">
              <input
                type="email"
                class="form-control"
                placeholder="Enter your Email Address"
                value={email}
                onChange={handleInputChange}
                required
              />
              <button
                class="btn btn-primary"
                type="button"
                data-mdb-ripple-color="dark"
                onClick={handleSubmit}
              >
                Subscribe
              </button>
            </div>
          </div>
        </center>
        <br />
        <div className="footer">Made with ❤️ by Prem!</div>
        <ToastContainer />
      </div>
    );
}

export default Footer
