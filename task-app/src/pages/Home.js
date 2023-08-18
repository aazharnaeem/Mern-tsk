import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import http from "../utils/Api";
import { AppAppBar } from "../view";
import jwt_decode from "jwt-decode";
import withRoot from "../module/withRoot";
import News from "./news";

const Home = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        if (token) {
          const { id } = jwt_decode(token);

          const response = await http.get(
            `/api/subscription/get-user-subs/${id}`,
            http.generateConfig(token)
          );

          console.log(response.subscriptions.data.length, "THE LENGTH");

          if (response.subscriptions.data.length === 0) {
            navigate("/subscription");
          }
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      <AppAppBar />
      <News />
    </div>
  );
};

export default withRoot(Home);
