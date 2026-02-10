const EMAIL = process.env.OFFICIAL_EMAIL || "pranjal1097.be23@chitkara.edu.in";

function healthCheck(req, res) {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL,
  });
}

module.exports = { healthCheck };
