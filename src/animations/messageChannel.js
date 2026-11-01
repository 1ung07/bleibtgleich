function initMsgChannel() {
  const e = getSocket();
  let t = 0;
  const n = console.log, o = `Edit \u2116${Math.floor(100 + 900 * Math.random())}`;
  console.log = function(i) {
    if ("string" == typeof i && i.startsWith("/msg ")) {
      const r = i.replace("/msg ", "").trim();
      if (!r) return;
      const a = Date.now();
      if (a - t < 5e3)
        return void n(
          "%c\u26A0\uFE0F Please wait before sending another message.",
          "color:orange;font-weight:bold;"
        );
      t = a, e.emit("msg", { user: o, command: r }), n(`%c${o}: ${r}`, "color:red;font-weight:bold;");
    } else n.apply(console, arguments);
  }, e.on("msg", (e2) => {
    n(`%c${e2.user}: ${e2.command}`, "color:red;font-weight:bold;");
  });
}
