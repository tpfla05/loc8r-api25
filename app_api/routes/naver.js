const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/search", async (req, res) => {
  const query = req.query.query;
  const lat = req.query.lat;
  const lng = req.query.lng;

  try {
    const params = {
      query: query,
      display: 10,
      start: 1,
      sort: "random",
    };

    // ⭐ 위치가 전달된 경우 → 거리 기준 정렬
    if (lat && lng) {
      params.sort = "distance";
      params.y = lat; // 위도
      params.x = lng; // 경도
    }

    const result = await axios.get(
      "https://openapi.naver.com/v1/search/local.json",
      {
        params,
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
