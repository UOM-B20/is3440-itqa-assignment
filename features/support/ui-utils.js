class UIUtils {
  constructor() {}

  capitalize(str) {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  encodeForUrl(brandName) {
    return brandName.replace(/\s/g, "%20");
  }
}

module.exports = new UIUtils();
