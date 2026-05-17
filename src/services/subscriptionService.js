// Creacion del servicio de subscripciones
//Funcionalidad
//- Suscribir usuarios
//- Desuscribir usuarios
//- Consultar las categorías de un usuario
//- Buscar usuarios suscritos a una categoría
//- Ver todas las suscripciones
//creado con IA


const { subscriptions } = require("../data/subscriptions");

function subscribeUser(userId, category) {
  if (!userId || !category) {
    throw new Error("userId and category are required");
  }

  if (!subscriptions.has(userId)) {
    subscriptions.set(userId, new Set());
  }

  subscriptions.get(userId).add(category);

  return {
    userId,
    subscriptions: Array.from(subscriptions.get(userId))
  };
}

function unsubscribeUser(userId, category) {
  if (!userId || !category) {
    throw new Error("userId and category are required");
  }

  if (!subscriptions.has(userId)) {
    return {
      userId,
      subscriptions: []
    };
  }

  subscriptions.get(userId).delete(category);

  if (subscriptions.get(userId).size === 0) {
    subscriptions.delete(userId);
  }

  return {
    userId,
    subscriptions: subscriptions.has(userId)
      ? Array.from(subscriptions.get(userId))
      : []
  };
}

function getUserSubscriptions(userId) {
  if (!subscriptions.has(userId)) {
    return [];
  }

  return Array.from(subscriptions.get(userId));
}

function getUsersSubscribedToCategory(category) {
  const subscribedUsers = [];

  for (const [userId, categories] of subscriptions.entries()) {
    if (categories.has(category)) {
      subscribedUsers.push(userId);
    }
  }

  return subscribedUsers;
}

function getAllSubscriptions() {
  const result = {};

  for (const [userId, categories] of subscriptions.entries()) {
    result[userId] = Array.from(categories);
  }

  return result;
}

module.exports = {
  subscribeUser,
  unsubscribeUser,
  getUserSubscriptions,
  getUsersSubscribedToCategory,
  getAllSubscriptions
};