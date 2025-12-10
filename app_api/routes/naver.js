const express = require("express");
const axios = require("axios");
const router = express.Router();

/* ---------------------------
   1) 네이버 장소 검색
---------------------------- */
router.get("/search", async (req, res) => {
  const query = req.query.query;

  try {
    const result = await axios.get(
      "https://openapi.naver.com/v1/search/local.json",
      {
        params: {
          query: query,
          display: 10,
          start: 1,
          sort: "random",
        },
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
        },
      }
    );

    res.json(result.data.items);
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).send("Naver API error");
  }
});

/* ---------------------------
   2) Reverse Geocode
---------------------------- */
router.get("/reverse", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const result = await axios.get(
      "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc",
      {
        params: {
          coords: `${lng},${lat}`,
          output: "json",
        },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET,
        },
      }
    );

    res.json(result.data);
  } catch (e) {
    console.error(e.response?.data || e);
    res.status(500).send("reverse geocode error");
  }
});

module.exports = router;
