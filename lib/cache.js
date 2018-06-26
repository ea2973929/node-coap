
function expire(cache, k) {
  delete cache[k]
}

function CacheManager(options) {
  var cache = {}

  var timeoutMs = 247*1000;
  if(options.timeoutMs && typeof options.timeoutMs === "number") {
    timeoutMs = options.timeoutMs;
  }

  this.store = function(key, payload) {
    if (cache.hasOwnProperty(key)) {
      clearTimeout(cache[key].timeoutId) // cancel old expiry timer
      cache[key].payload = payload
    } else {
      cache[key] = {payload: payload}
    }
    // setup new expiry timer
    cache[key].timeoutId = setTimeout(expire, timeoutMs, cache, key)
  }

  this.retrieve = function(key) {
    var obj = cache[key];
    if(obj !== null && obj !== undefined) {
      return obj.payload;
    }
    return null;
  }

  this.remove = function(key) {
    clearTimeout(this.cache[key].timeoutId)
    delete this.cache[key]
  }

  this.clear = function() {
    for (var k in cache) {
      if (cache.hasOwnProperty(k)) {
      clearTimeout(cache[k].timeoutId)
      delete cache[k]
      }
    }
  }
}

module.exports = CacheManager;