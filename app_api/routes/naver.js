const express = require("express");
const axios = require("axios");
const router = express.Router();

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

module.exports = router;
