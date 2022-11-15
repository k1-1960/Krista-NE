module.exports.whatCase = function (l) {
  if (l === l.toUpperCase()) return true;
  if (l === l.toLowerCase()) return false;
}

module.exports.percentage = function (origin, resta) {
  let restado = origin - resta;
  return ((restado * 100)/origin);
};

module.exports.deleteMessage = async function (msg, time) {
  if (time) {
    setTimeout(async () => {
      await msg.delete();
    }, time * 1000);
  } else {
    await msg.delete();
  }
}