import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { getToken, processTransaction } from "../core/helper/paymentHelper";
import DropIn from "braintree-web-drop-in-react";
import { createOrder } from "../core/helper/orderHelper";
import { Scrollbars } from "react-custom-scrollbars";

const Payment = () => {
  const { user } = isAuthenticated();
  const [cart, setCart] = useState([]);

  const [token, setToken] = useState({
    clientToken: null,
    instance: {},
  });

  const getClientToken = () => {
    getToken(user._id, JSON.parse(localStorage.getItem("jwt")).token)
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
        } else {
          const clientToken = data.clientToken;
          setToken({ clientToken });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const processPayment = () => {
    //   token.instance
    //   {
    //     "clientToken": "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTkRVNU16VTVOVFVzSW1wMGFTSTZJakJtT0RSbE1ERmtMVEF3TVdZdE5ERTFNaTA0T0RGaExXRmpaR0l5WTJWbVlXUTROaUlzSW5OMVlpSTZJblJuZG5aNWNYaHVNMjFrWkhOaU9Hb2lMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pZEdkMmRubHhlRzR6YldSa2MySTRhaUlzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5Lk5ZODlId0VCTmpnOU1xN2otcFpFQ0ZFTGtHQXVEQUdIS0Jiay0zQXVfM3EzU2FidmNPbmNSOUlvb2JmSk9KcVp3SzdERjNfZWU3c0dRczRQMTY1YWRBIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3RndnZ5cXhuM21kZHNiOGovY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvdGd2dnlxeG4zbWRkc2I4ai9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6InRndnZ5cXhuM21kZHNiOGoiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3RndnZ5cXhuM21kZHNiOGoifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJhbGxvd0h0dHAiOnRydWUsImRpc3BsYXlOYW1lIjoiTWFuZ2VzaCIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJtZXJjaGFudEFjY291bnRJZCI6Im1hbmdlc2giLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifX0=",
    //     "success": true
    //   }
    let nonce;
    token.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentInfo = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processTransaction(
          user._id,
          JSON.parse(localStorage.getItem("jwt")).token,
          paymentInfo
        )
          .then((response) => {
            console.log("PAYMENT SUCCESS", response);
            // const orderData={
            //   products:cart,
            //   transaction_id:response.transaction.id,
            //   amount:response.transaction.amount
            // }
            // createOrder(user._id,orderData,JSON.parse(localStorage.getItem("jwt")).token)

            localStorage.removeItem("myCart");
            window.location.reload(false);
          })
          .catch((err) => {
            console.log("PAYMENT FAILED", err);
          });
      })
      .catch((err) => console.log(err));
  };

  const getAmount = () => {
    let amount = 0;
    for (let i = 0; i < cart.length; i++) {
      amount = amount + cart[i].price;
    }
    return amount;
  };

  useEffect(() => {
    getClientToken();
    const myCart = JSON.parse(localStorage.getItem("myCart") || "[]");
    setCart(myCart);
  }, []);
  return (
    <>
      {/* Your bill is ${getAmount()} */}
      {(!token.clientToken || !isAuthenticated) && (
        <h3>User not authenticated, please login again!</h3>
      )}
        {/* <Scrollbars style={{ width: 600, height: 300 }}> */}
      {token.clientToken && isAuthenticated && (
        <DropIn
          options={{ authorization: token.clientToken }}
          onInstance={(instance) => (token.instance = instance)}
        />
      )}
      {token.clientToken && isAuthenticated && (
        <div className="text-center">
          <button onClick={processPayment} className="btn btn-success btn-lg">
            Buy
          </button>
        </div>
      )}
      {/* </Scrollbars> */}
    </>
  );
};

export default Payment;
