"use strict";

export const authAndRoleMiddleware = (roles = []) => (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return res.status(403).json({ message: "No tienes permisos suficientes" });
  }

  next();
};