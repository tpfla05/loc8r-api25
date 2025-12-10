const express = require("express");
const axios = require("axios");
const router = express.Router();

// ----------------------------------------
// 🔥  네이버 현재 위치 기반 장소 검색 (Place API)
// ----------------------------------------
router.get("/nearby", async (req, res) => {
  const { lat, lng, query } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "lat,lng required" });
  }

  try {
    const result = await axios.get(
      "https://naveropenapi.apigw.ntruss.com/map-place/v1/search",
      {
        params: {
          query: query || "카페",
          coordinate: `${lng},${lat}`, // ⭐ 네이버는 lng,lat 순서 필수
          radius: 2000,
          lang: "ko",
        },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET,
        },
      }
    );

    return res.json(result.data.places); // 성공 응답
  } catch (err) {
    console.error("NAVER PLACE ERROR:", err.response?.data || err);
    return res.status(500).send("naver place api error");
  }
});

module.exports = router;
