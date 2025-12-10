const express = require("express");
const axios = require("axios");
const router = express.Router();

/* -----------------------------------
   🔥 현재 위치 기반 장소 검색 (Place API)
------------------------------------ */
router.get("/nearby", async (req, res) => {
  const { lat, lng, query } = req.query;

  try {
    const result = await axios.get(
      "https://naveropenapi.apigw.ntruss.com/map-place/v1/search",
      {
        params: {
          query: query || "카페",
          coordinate: `${lng},${lat}`,
          radius: 2000, // 2km 반경
          lang: "ko",
        },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET,
        },
      }
    );

    res.json(result.data.places); //⭐ places 배열만 반환
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).send("nearby search error");
  }
});

module.exports = router;
