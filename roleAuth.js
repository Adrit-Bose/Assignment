// Middleware to check user role
function checkUserRole(req, res, next) {
  const user = req.user; // Assuming user data is stored in the request
  if (user && user.role === "manager") {
    next(); // Allow access for managers
  } else {
    res.status(403).json({ message: "Access denied" }); // Deny access for others
  }
}

// Apply middleware to a route
app.get("/manager-only", checkUserRole, (req, res) => {
  // This route is accessible only to managers
});
