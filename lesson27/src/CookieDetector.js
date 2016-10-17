// version 1
// function detectCookie(items) {
//   for (var i = 0; i < items.length; i++) {
//     var item = items[i];
//     if (item.indexOf("cookie") !== -1) {
//       return true;
//     }
//
//     return false;
//   }
// }

// version 2
// function detectCookie(items) {
//   for (var i = 0; i < items.length; i++) {
//     var item = items[i];
//     if (item.indexOf("cookie") !== -1) {
//       return true;
//     }
//   }
//
//   return false;
// }

// version 3
function detectCookie(items) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.toLowerCase().indexOf("cookie") !== -1) {
      return true;
    }
  }

  return false;
}
