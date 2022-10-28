async function getUserControllerController(req, res) {
  res.json({
    user: req.user,
    posts: {
      title: "my FIrst Post",
    },
  });
}

module.exports = {
  getBookingController,
};
