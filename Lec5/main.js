function removeProperty(obj, prop) {
  const { [prop]: deleted, ...rest } = obj;
  return rest;
}

function createLeaderboard(users) {
  return users
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({ ...user, rank: index + 1 }));
}

function longestTitle(movies) {
  if (movies.length === 0) return null;
  return movies.reduce((longest, current) => 
    current.title.length > longest.title.length ? current : longest
  );
}

function averageAgeByDept(employees) {
  const counts = {};
  employees.forEach(({ dept, age }) => {
    if (!counts[dept]) {
      counts[dept] = { totalAge: 0, count: 0 };
    }
    counts[dept].totalAge += age;
    counts[dept].count += 1;
  });

  const result = {};
  for (const dept in counts) {
    result[dept] = counts[dept].totalAge / counts[dept].count;
  }
  return result;
}

function countTotalWords(comments) {
  return comments.reduce((total, item) => {
    const cleanedComment = item.comment.trim();
    const wordCount = cleanedComment === "" ? 0 : cleanedComment.split(/\s+/).length;
    return total + wordCount;
  }, 0);
}

function groupAndSortUsers(users) {
  const grouped = {};
  users.forEach(user => {
    if (!grouped[user.department]) {
      grouped[user.department] = [];
    }
    grouped[user.department].push(user);
  });

  for (const dept in grouped) {
    grouped[dept].sort((a, b) => b.salary - a.salary);
  }
  return grouped;
}

function calculateTotalCart(cart) {
  return cart.reduce((total, item) => {
    const finalPricePerUnit = item.price * (1 - item.discountPercent / 100);
    return total + (finalPricePerUnit * item.quantity);
  }, 0);
}

function arrayToObject(users) {
  return users.reduce((obj, user) => {
    obj[user.id] = user;
    return obj;
  }, {});
}