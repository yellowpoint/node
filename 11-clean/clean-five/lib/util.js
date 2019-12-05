const util = {
  /**
   * 获取 config文件
   */
  getConfig: function (callback) {
    var configPath = path.join(process.cwd(), 'clean-five.config.js');
    var config = {};
    if (fs.existsSync(configPath)) {
      try {
        config = eval(fs.readFileSync(configPath, "utf-8"));
        callback && callback(config);
      } catch (e) {
        console.log("读取clean-five.config.js文件失败");
      }
    } else {
      console.log("clean-five.config.js文件不存在，请检查后再试");
    }
  },

}
module.exports = util;